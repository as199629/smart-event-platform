import os
import sys
import asyncio
import json
from datetime import datetime

# 添加專案根目錄到 Python 路徑
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import AsyncSessionLocal, Base, engine
from app.models.event import Event

# 重新建立資料庫表格
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

async def import_events():
    # 先建立資料表
    await create_tables()
    
    # 從前端專案讀取 JSON 資料
    with open('../frontend/server/data/events.json', 'r', encoding='utf-8') as f:
        events_data = json.load(f)

    async with AsyncSessionLocal() as db:
        for event_data in events_data:
            # 解析日期和時間
            date = event_data['date']
            time_range = event_data['time'].split('-')
            start_time = datetime.strptime(f"{date} {time_range[0]}", "%Y-%m-%d %H:%M")
            end_time = datetime.strptime(f"{date} {time_range[1]}", "%Y-%m-%d %H:%M")

            # 建立事件物件
            event = Event(
                id=event_data['id'],
                title=event_data['name'],
                image=event_data['image'],
                status=event_data['status'],
                available_seats=event_data['availableSeats'],
                total_seats=event_data['totalSeats'],
                price=event_data['price'],
                start_time=start_time,
                end_time=end_time,
                location=event_data['location'],
                description=event_data['description'],
                schedule=event_data['schedule'],
                region=event_data['region'],
                city=event_data['city'],
                category=event_data['category'],
                participants=event_data['participants']
            )
            
            # 檢查是否已存在相同 ID 的事件
            existing_event = await db.get(Event, event.id)
            if existing_event:
                print(f"更新事件: {event.id}")
                for key, value in event.__dict__.items():
                    if not key.startswith('_'):
                        setattr(existing_event, key, value)
            else:
                print(f"新增事件: {event.id}")
                db.add(event)
        
        await db.commit()
        print("資料匯入完成！")

if __name__ == "__main__":
    asyncio.run(import_events()) 