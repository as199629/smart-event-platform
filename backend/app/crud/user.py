from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload # Optional: if you need to eager load relationships
from typing import Optional, List

from app.models.user import User
from app.schemas.user import UserGoogleLogin, UserCreate # Import necessary schemas
from app.utils.security import get_password_hash # Import password hashing

# Function to get a user by ID
async def get_user(db: AsyncSession, user_id: int) -> Optional[User]:
    """
    Get a user by their ID.
    """
    result = await db.execute(select(User).filter(User.id == user_id))
    return result.scalar_one_or_none()

# Function to get a user by Email
async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    """
    Get a user by their email address.
    """
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalar_one_or_none()

# Function to get a user by Google ID
async def get_user_by_google_id(db: AsyncSession, google_id: str) -> Optional[User]:
    """
    Get a user by their Google ID.
    """
    result = await db.execute(select(User).filter(User.google_id == google_id))
    return result.scalar_one_or_none()

# Function to create a user specifically from Google Sign-In data
async def create_user_from_google(db: AsyncSession, user_in: UserGoogleLogin) -> User:
    """
    Creates a new user in the database from Google Sign-In data.
    Password is set to None initially. Should be committed outside this function.
    """
    # Convert HttpUrl to string for DB storage, handle None case
    avatar_str = str(user_in.avatar) if user_in.avatar else None

    db_user = User(
        google_id=user_in.google_id,
        email=user_in.email,
        username=user_in.username, # Use username from Google
        avatar=avatar_str,
        password=None # No password set during Google sign-up
    )
    db.add(db_user)
    # Let the calling function handle commit and refresh
    return db_user

# Function to create a standard user (e.g., email/password registration)
async def create_user_standard(db: AsyncSession, user_in: UserCreate) -> User:
    """
    Creates a standard user with email/password.
    Assumes email uniqueness check happened before calling this.
    Handles password hashing. Commits and refreshes the user.
    """
    # Ensure password is provided for standard creation if required by your logic
    if not user_in.password:
        # Consider raising an error or handling logic based on your requirements
        # For now, we allow None password based on UserCreate schema
        hashed_password = None
    else:
        hashed_password = get_password_hash(user_in.password)

    db_user = User(
        username=user_in.username,
        email=user_in.email,
        password=hashed_password,
        # google_id and avatar would be null initially
    )
    db.add(db_user)
    try:
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except Exception as e:
        await db.rollback()
        print(f"Error during standard user creation commit: {e}")
        raise e # Re-raise the exception

# Function to get or create a user based on Google Sign-In info
async def get_or_create_user_by_google(db: AsyncSession, user_in: UserGoogleLogin) -> User:
    """
    Retrieves a user by Google ID or Email. If the user exists by email
    but lacks a Google ID, it links the Google ID. If the user doesn't exist,
    it creates a new user based on the Google Sign-In information.
    Also updates username and avatar if they have changed. Handles commit/refresh.
    """
    try:
        # 1. Try finding user by Google ID
        user = await get_user_by_google_id(db, google_id=user_in.google_id)
        if user:
            # User found by Google ID, check if update is needed
            needs_update = False
            avatar_str = str(user_in.avatar) if user_in.avatar else None
            if user.username != user_in.username:
                user.username = user_in.username
                needs_update = True
            if user.avatar != avatar_str:
                user.avatar = avatar_str
                needs_update = True

            if needs_update:
                await db.commit()
                await db.refresh(user)
            return user

        # 2. Try finding user by Email if not found by Google ID
        user = await get_user_by_email(db, email=user_in.email)
        if user:
            # User found by email, link Google ID if it's missing
            needs_update = False
            if user.google_id is None:
                user.google_id = user_in.google_id
                needs_update = True

            # Also update username/avatar if different
            avatar_str = str(user_in.avatar) if user_in.avatar else None
            if user.username != user_in.username:
                user.username = user_in.username
                needs_update = True
            if user.avatar != avatar_str:
                user.avatar = avatar_str
                needs_update = True

            if needs_update:
                await db.commit()
                await db.refresh(user)
            return user

        # 3. If user not found by Google ID or Email, create a new user
        new_user = await create_user_from_google(db=db, user_in=user_in)
        # Commit and refresh after adding the new user
        await db.commit()
        await db.refresh(new_user)
        return new_user

    except Exception as e:
        await db.rollback() # Rollback on any error during the process
        print(f"Error in get_or_create_user_by_google for email {user_in.email}: {e}")
        raise e # Re-raise the exception to be handled by the endpoint


# Function to get multiple users (optional, for listing)
async def get_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[User]:
    """
    Retrieve a list of users with pagination.
    """
    result = await db.execute(
        select(User)
        .offset(skip)
        .limit(limit)
        # .options(selectinload(User.items)) # Example: Eager load relationships if needed
    )
    return result.scalars().all()

# (Optional) Function to delete a user
# async def delete_user(db: AsyncSession, user: User) -> None:
#     """ Deletes a user from the database. """
#     await db.delete(user)
#     await db.commit()
#     # No refresh needed after delete 