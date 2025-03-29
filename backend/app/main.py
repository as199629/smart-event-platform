from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, events
from app.database import engine, Base
from app.utils.redis_config import RedisCache

app = FastAPI(
    title="Smart Event Platform API",
    description="智慧事件平台的後端 API，支援事件管理的 CRUD 操作。",
    version="1.0.0"
)

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 前端的網址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(events.router, prefix="/api/events", tags=["events"])

@app.on_event("startup")
async def startup():
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await RedisCache.init()

@app.get("/")
async def root():
    return {"message": "API is running"}