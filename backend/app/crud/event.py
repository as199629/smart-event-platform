from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional, List

from app.models.event import Event
from app.schemas.event import EventCreate # Import necessary schemas

# Function to create an event
async def create_event(db: AsyncSession, event_in: EventCreate) -> Event:
    """
    Creates a new event in the database.
    Handles commit and refresh.
    """
    db_event = Event(**event_in.model_dump())
    db.add(db_event)
    try:
        await db.commit()
        await db.refresh(db_event)
        return db_event
    except Exception as e:
        await db.rollback()
        print(f"Error creating event: {e}")
        raise e # Re-raise the exception

# Function to get an event by ID
async def get_event(db: AsyncSession, event_id: int) -> Optional[Event]:
    """
    Get an event by its ID.
    """
    result = await db.execute(select(Event).filter(Event.id == event_id))
    return result.scalar_one_or_none()

# Function to get all events (ordered by start time)
async def get_events(db: AsyncSession) -> List[Event]:
    """
    Retrieve a list of all events, ordered by start time.
    """
    result = await db.execute(
        select(Event).order_by(Event.start_time)
    )
    return result.scalars().all()

# Function to update an existing event
async def update_event(db: AsyncSession, event: Event, event_update: EventCreate) -> Event:
    """
    Updates an existing event instance with data from event_update schema.
    Handles commit and refresh.
    'event' is the existing model instance fetched from the DB.
    """
    update_data = event_update.model_dump(exclude_unset=True) # Exclude unset fields if needed
    for key, value in update_data.items():
        setattr(event, key, value)
    db.add(event) # Add the updated instance to the session
    try:
        await db.commit()
        await db.refresh(event)
        return event
    except Exception as e:
        await db.rollback()
        print(f"Error updating event {event.id}: {e}")
        raise e # Re-raise the exception

# Function to delete an event
async def delete_event(db: AsyncSession, event: Event) -> None:
    """
    Deletes an event instance from the database.
    Handles commit.
    'event' is the existing model instance fetched from the DB.
    """
    try:
        await db.delete(event)
        await db.commit()
    except Exception as e:
        await db.rollback()
        print(f"Error deleting event {event.id}: {e}")
        raise e # Re-raise the exception 