from fastapi import APIRouter, HTTPException, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError # Import IntegrityError for handling unique constraint violations

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserGoogleLogin # Assuming UserGoogleLogin schema exists
from app.schemas.response import SuccessResponse, ErrorResponse # Import standard response models
from app.utils.security import get_password_hash
# Assuming you have CRUD functions defined elsewhere, e.g., in app.crud.user
from app import crud # Import your crud module

router = APIRouter()

# Create user (Standard Registration)
@router.post(
    "/",
    status_code=201,
    response_model=SuccessResponse[UserResponse], # Use standard success response
    responses={
        400: {"model": ErrorResponse}, # Bad request (e.g., email exists)
        500: {"model": ErrorResponse}  # Internal server error
    }
)
async def create_user_endpoint(user: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to create a standard user.
    Checks for existing email and calls CRUD function for creation.
    Returns a standard success response.
    """
    # 1. Check if user already exists (using CRUD function)
    existing_user = await crud.user.get_user_by_email(db, email=user.email)
    if existing_user:
        # Return ErrorResponse instance for specific logical errors
        # Alternatively, raise HTTPException like before if preferred
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )
    # 2. Create user (using CRUD function)
    try:
        # create_user_standard handles password hashing and DB commit/refresh
        created_user = await crud.user.create_user_standard(db=db, user_in=user)
        # Return standard success response
        return SuccessResponse(data=created_user, message="User created successfully")
    except IntegrityError: # Catch potential race conditions if not handled in CRUD
        # Rollback should ideally be handled within the CRUD function on error
        raise HTTPException(
            status_code=400,
            detail="Username already registered (potential race condition).",
        )
    except Exception as e:
        # Log the error 'e'
        print(f"Error creating standard user: {e}")
        # Rollback should ideally be handled within the CRUD function on error
        raise HTTPException(status_code=500, detail=f"An error occurred while creating the user: {str(e)}")

# Google Sign-In (Register or Login)
@router.post(
    "/register_or_login",
    response_model=SuccessResponse[UserResponse], # Use standard success response
    responses={500: {"model": ErrorResponse}} # Document error response
)
async def register_or_login_user_google_endpoint(
    *,
    db: AsyncSession = Depends(get_db),
    user_in: UserGoogleLogin # Use the specific schema for Google Login data
) -> SuccessResponse[UserResponse]: # Update return type hint
    """
    Handles user registration or login via Google Sign-In by calling the CRUD layer.
    Returns a standard success response.
    """
    try:
        # Call the CRUD function to handle get/create/update logic
        user = await crud.user.get_or_create_user_by_google(db=db, user_in=user_in)
        # The CRUD function should handle the case where user is None internally
        # and raise an error if necessary, or return the created/found user.
        # For simplicity, using a generic success message here.
        return SuccessResponse(data=user, message="Google sign-in successful")
    except Exception as e:
        # Log the error 'e' from the CRUD operation
        print(f"Error during Google register/login for {user_in.email}: {e}")
        # Rollback should be handled within the CRUD function
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing Google Sign-In: {str(e)}",
        )

# Delete user
@router.delete(
    "/{user_id}",
    status_code=204, # Keep 204 status code
    responses={
        404: {"model": ErrorResponse}, # Not found
        500: {"model": ErrorResponse}  # Deletion error
    }
)
async def delete_user_endpoint(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to delete a user by ID.
    Gets the user via CRUD, then performs deletion.
    Returns HTTP 204 No Content on success.
    """
    # 1. Get the user (using CRUD function)
    user_to_delete = await crud.user.get_user(db=db, user_id=user_id)
    if user_to_delete is None:
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Perform the deletion
    try:
        # Option A: Call a CRUD delete function (if defined in crud/user.py)
        # await crud.user.delete_user(db=db, user=user_to_delete)

        # Option B: Perform simple delete here (requires commit/rollback handling)
        await db.delete(user_to_delete)
        await db.commit()

        # Return empty response for 204
        return Response(status_code=204)
    except Exception as e:
        # Log the error 'e'
        print(f"Error deleting user {user_id}: {e}")
        await db.rollback() # Rollback if the commit fails
        raise HTTPException(status_code=500, detail=f"An error occurred while deleting the user: {str(e)}")

# Get user
@router.get(
    "/{user_id}",
    response_model=SuccessResponse[UserResponse], # Use standard success response
    responses={404: {"model": ErrorResponse}} # Document error response
)
async def get_user_endpoint(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to retrieve a user by ID using the CRUD layer.
    """
    # Get the user using the CRUD function
    user = await crud.user.get_user(db=db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# You might want a GET endpoint to list users (with pagination, filtering, etc.)
# @router.get("/", response_model=list[UserResponse])
# async def list_users_endpoint(db: AsyncSession = Depends(get_db), skip: int = 0, limit: int = 100):
#     users = await crud.user.get_users(db=db, skip=skip, limit=limit) # Assuming crud.user.get_users exists
#     return users 
    