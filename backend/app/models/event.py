from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, JSON
from sqlalchemy.sql import func
from app.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True)
    title = Column(String, index=True)
    image = Column(String)
    status = Column(String)
    available_seats = Column(Integer)
    total_seats = Column(Integer)
    price = Column(Float)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    location = Column(String)
    description = Column(String)
    schedule = Column(JSON)
    region = Column(String)
    city = Column(String)
    category = Column(String)
    participants = Column(Integer)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now()) 