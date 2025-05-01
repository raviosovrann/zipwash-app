from typing import Optional
from pydantic import BaseModel, EmailStr

# Schema for JWT token response
class Token(BaseModel):
    access_token: str  # The JWT token string
    token_type: str  # Token type (typically "bearer")

# Schema for data stored in JWT token
class TokenData(BaseModel):
    email: Optional[str] = None  # Email stored in the token

# Schema for login request validation
class LoginRequest(BaseModel):
    email: EmailStr  # Email must be valid format
    password: str  # Password for authentication