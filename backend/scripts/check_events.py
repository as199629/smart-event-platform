import os
import sys
import asyncio
from sqlalchemy import select

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import AsyncSessionLocal
from app.models.event import Event

async def check_events():
    async with AsyncSessionLocal() as db:
        # 使用 select 語句取得所有事件
        query = select(Event)
        result = await db.execute(query)
        events = result.scalars().all()
        
        print(f"資料庫中共有 {len(events)} 筆事件")
        
        # 印出第一筆事件的詳細資訊（如果有的話）
        if events:
            first_event = events[0]
            print("\n第一筆事件資訊：")
            for key, value in first_event.__dict__.items():
                if not key.startswith('_'):
                    print(f"{key}: {value}")

if __name__ == "__main__":
    asyncio.run(check_events()) 