from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)