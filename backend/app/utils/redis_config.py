from redis import asyncio as aioredis
from typing import Optional

class RedisCache:
    _redis: Optional[aioredis.Redis] = None

    @classmethod
    async def init(cls):
        cls._redis = await aioredis.from_url(
            "redis://localhost:6379",
            encoding="utf8",
            decode_responses=True
        )

    @classmethod
    async def get(cls, key: str) -> Optional[str]:
        if cls._redis is None:
            await cls.init()
        return await cls._redis.get(key)

    @classmethod
    async def set(cls, key: str, value: str, expire: int = 300):
        if cls._redis is None:
            await cls.init()
        await cls._redis.set(key, value, ex=expire)

    @classmethod
    async def delete(cls, key: str):
        if cls._redis is None:
            await cls.init()
        await cls._redis.delete(key) 