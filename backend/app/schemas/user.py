from pydantic import BaseModel, EmailStr, field_validator, Field, HttpUrl
from typing import Optional

class UserCreate(BaseModel):
    google_id: str
    email: EmailStr
    username: str
    avatar: Optional[HttpUrl] = None
    password: Optional[str] = None

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('用戶名只能包含字母和數字')
        return v

    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if not any(char.isupper() for char in v):
            raise ValueError('密碼必須包含至少一個大寫字母')
        if not any(char.islower() for char in v):
            raise ValueError('密碼必須包含至少一個小寫字母')
        if not any(char.isdigit() for char in v):
            raise ValueError('密碼必須包含至少一個數字')
        return v

class UserGoogleLogin(BaseModel):
    google_id: str
    email: EmailStr
    username: str
    avatar: Optional[HttpUrl] = None

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('用戶名只能包含字母和數字')
        return v

class UserResponse(BaseModel):
    id: int
    google_id: Optional[str] = None
    email: EmailStr
    username: str
    avatar: Optional[HttpUrl] = None

    class Config:
        orm_mode = True 