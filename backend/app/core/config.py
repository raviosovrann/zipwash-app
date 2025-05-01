import os
from pydantic_settings import BaseSettings

# Settings class using Pydantic for configuration management and validation
class Settings(BaseSettings):
    # API information
    PROJECT_NAME: str = "ZipWash API"
    PROJECT_VERSION: str = "0.1.0"
    API_PREFIX: str = "/api"
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://zipwash_admin:zipwashadmin2025!@localhost/zipwash_db")
    
    # CORS settings - controls which origins can access the API
    BACKEND_CORS_ORIGINS: list[str] = ["*"]  # For development only, restrict in production
    
    # Security settings for JWT token generation
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

# Create a settings instance
settings = Settings()