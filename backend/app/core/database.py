from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Connection string for PostgreSQL - includes username, password, host, and database name
SQLALCHEMY_DATABASE_URL = "postgresql://zipwash_admin:zipwashadmin2025!@localhost/zipwash_db"

# Create SQLAlchemy engine to interact with the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a session factory for creating database sessions
# autocommit=False: Transactions won't be automatically committed
# autoflush=False: Changes won't be automatically flushed to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for SQLAlchemy models
Base = declarative_base()

# Function to get a database session
def get_db():
    # Create a new database session
    db = SessionLocal()
    try:
        # Yield the session to the caller (works with FastAPI dependency injection)
        yield db
    finally:
        # Ensure the session is closed after the request is processed
        db.close()