from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import Optional

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr  # 使用 EmailStr 來驗證 email 格式
    password: str = Field(..., min_length=8, max_length=100)

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

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True 