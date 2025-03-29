from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventResponse
import json
from app.utils.redis_config import RedisCache

router = APIRouter()

@router.post("/", status_code=201, response_model=EventResponse)
async def create_event(event: EventCreate, db: AsyncSession = Depends(get_db)):
    try:
        db_event = Event(
            title=event.title,
            description=event.description,
            start_time=event.start_time,
            end_time=event.end_time,
            location=event.location
        )
        db.add(db_event)
        await db.commit()
        await db.refresh(db_event)
        return db_event
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[EventResponse])
async def get_events(db: AsyncSession = Depends(get_db)):
    try:
        # 加入錯誤處理和日誌
        print("Fetching events from database...")  # 除錯用
        result = await db.execute(
            select(Event).order_by(Event.start_time)
        )
        events = result.scalars().all()
        print(f"Found {len(list(events))} events")  # 除錯用
        return events
    except Exception as e:
        print(f"Error: {str(e)}")  # 除錯用
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

@router.get("/{event_id}", response_model=EventResponse)
async def get_event(event_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Event).filter(Event.id == event_id))
        event = result.scalar_one_or_none()
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{event_id}", response_model=EventResponse)
async def update_event(event_id: int, event_update: EventCreate, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Event).filter(Event.id == event_id))
        event = result.scalar_one_or_none()
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        
        for key, value in event_update.dict().items():
            setattr(event, key, value)
        
        await db.commit()
        await db.refresh(event)
        return event
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{event_id}")
async def delete_event(event_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Event).filter(Event.id == event_id))
        event = result.scalar_one_or_none()
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        await db.delete(event)
        await db.commit()
        return {"message": f"Event {event_id} deleted successfully"}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=404, detail=str(e)) 