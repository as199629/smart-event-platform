from pydantic import BaseModel
from typing import Optional

class EventBase(BaseModel):
    title: str
    description: str
    is_active: bool = True

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int

    class Config:
        from_attributes = True  # 改成 from_attributes