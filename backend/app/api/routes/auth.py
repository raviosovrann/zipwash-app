from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models.user import User
from app.schemas.auth import Token, LoginRequest
from app.schemas.user import UserCreate, UserResponse
from sqlalchemy import func

# Create an API router for authentication endpoints
router = APIRouter()

# The tokenUrl should match your actual endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user and return JWT token
    """
    # Find the user by email
    user = db.query(User).filter(User.email == login_data.email).first()
    
    # Check if user exists and password is correct
    # The auth route tries to access 'user.password'
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token with expiration time
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},  # Subject claim is the user's email
        expires_delta=access_token_expires
    )
    
    # Return token response
    return {"access_token": access_token, "token_type": "bearer"}

# @router.post("/signup", response_model=UserResponse)
# def signup(user_data: UserCreate, db: Session = Depends(get_db)):
#     """
#     Create new user account
#     """
#     # Check if user with this email already exists
#     existing_user = db.query(User).filter(func.lower(User.email) == func.lower(user_data.email)).first()
#     if existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered"
#         )
    
#     # Create new user with hashed password
#     hashed_password = get_password_hash(user_data.password)
#     db_user = User(
#         first_name=user_data.first_name,
#         last_name=user_data.last_name,
#         email=user_data.email,
#         password=hashed_password,
#         phone_number=user_data.phone_number,
#         user_type="customer" if user_data.is_customer else "vendor"
#     )
    
#     # Add user to database and commit the transaction
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
    
#     response_user = dict(
#         user_id=db_user.user_id,
#         email=db_user.email,
#         first_name=db_user.first_name,
#         last_name=db_user.last_name,
#         phone_number=db_user.phone_number,
#         user_type=db_user.user_type,
#         is_customer=db_user.user_type == "customer",
#         created_at=db_user.created_at.isoformat()
#     )
    
#     # Return the created user
#     return response_user

@router.post("/signup", response_model=UserResponse)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Create new user account
    """
    print(f"Signup attempt for email: {user_data.email}")
    
    # Check if user with this email already exists
    existing_user = db.query(User).filter(
        func.lower(User.email) == func.lower(user_data.email)
    ).first()
    if existing_user:
        print(f"Email already exists: {user_data.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user with hashed password
    try:
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            password=hashed_password,
            phone_number=user_data.phone_number,
            user_type="customer" if user_data.is_customer else "vendor"
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        print(f"User created successfully: {db_user.email}")
        
        # Format the response
        response_user = dict(
            user_id=db_user.user_id,
            email=db_user.email,
            first_name=db_user.first_name,
            last_name=db_user.last_name,
            phone_number=db_user.phone_number,
            user_type=db_user.user_type,
            is_customer=db_user.user_type == "customer",
            created_at=db_user.created_at.isoformat()
        )
        return response_user
    except Exception as e:
        print(f"Error creating user: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )