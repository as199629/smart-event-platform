from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
import crud
import schemas
from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Event Platform API",
    description="智慧事件平台的後端 API，支援事件管理的 CRUD 操作。",
    version="1.0.0"
)

@app.get("/events", response_model=List[schemas.Event], summary="取得所有事件")
async def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

@app.post("/events", response_model=schemas.Event, summary="創建新事件")
async def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db, event)

@app.get("/events/{event_id}", response_model=schemas.Event, summary="取得單一事件")
async def read_event(event_id: int, db: Session = Depends(get_db)):
    event = crud.get_event(db, event_id)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.put("/events/{event_id}", response_model=schemas.Event, summary="更新事件")
async def update_event(event_id: int, event: schemas.EventCreate, db: Session = Depends(get_db)):
    updated_event = crud.update_event(db, event_id, event)
    if updated_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return updated_event

@app.delete("/events/{event_id}", summary="刪除事件")
async def delete_event(event_id: int, db: Session = Depends(get_db)):
    deleted_event = crud.delete_event(db, event_id)
    if deleted_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}