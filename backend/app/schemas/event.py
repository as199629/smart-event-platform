from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional, List

class ScheduleItem(BaseModel):
    time: str
    activity: str

class EventBase(BaseModel):
    id: str
    title: str
    image: Optional[str] = None
    status: str = "open"
    available_seats: int
    total_seats: int
    price: float
    start_time: datetime
    end_time: datetime
    location: str
    description: str
    schedule: List[ScheduleItem]
    region: str
    city: str
    category: str
    participants: int = 0

    @field_validator('end_time')
    @classmethod
    def end_time_must_be_after_start_time(cls, v, values):
        if 'start_time' in values.data and v < values.data['start_time']:
            raise ValueError('結束時間必須晚於開始時間')
        return v

class EventCreate(EventBase):
    id: str

class EventResponse(EventBase):
    class Config:
        from_attributes = True 