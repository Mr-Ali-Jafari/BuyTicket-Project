from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import datetime, timedelta
import random
import string

from app.models import models
from app.utils.auth_jwt.auth import *

CODE_EXPIRATION_MINUTES = 10
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

def generate_verification_code(length=6):
    """Generate a random verification code."""
    return ''.join(random.choices(string.digits, k=length))

def send_verification_code(email: str, code: str):
    """Send verification code to the user's email."""
    # This is a placeholder. Implement the actual email sending logic here.
    print(f"Sending code {code} to email {email}")

def login_with_email_service(db: Session, email: str):
    """Send verification code or create a new user if they do not exist."""
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        # Create a new user if not exists
        user = models.User(email=email)
        db.add(user)
        db.commit()
        db.refresh(user)

    # Generate and send a verification code
    code = generate_verification_code()
    user.verification_code = code
    user.code_expiration = datetime.utcnow() + timedelta(minutes=CODE_EXPIRATION_MINUTES)
    
    # Send verification code to the user's email
    send_verification_code(user.email, code)
    
    db.commit()
    return {"msg": "Verification code sent to your email."}

def verify_code_service(db: Session, email: str, code: str):
    """Verify the code and generate JWT access and refresh tokens if valid."""
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Check the validity of the code and its expiration
    if user.verification_code != code or user.code_expiration < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification code",
        )

    # Clear the verification code after successful verification
    user.verification_code = None
    user.code_expiration = None
    db.commit()

    # Generate JWT access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Generate JWT refresh token
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = create_access_token(
        data={"sub": user.email}, expires_delta=refresh_token_expires
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

def get_current_user_service(db: Session, token: str):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(models.User).filter(models.User.email == payload.get("sub")).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user




def refresh_token_service(refresh_token: str, db: Session):
    """Verify the refresh token and generate new access and refresh tokens."""
    try:
        # Decode the refresh token to get the email (subject)
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Find the user associated with the email
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Generate new access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Optionally generate a new refresh token
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    new_refresh_token = create_access_token(
        data={"sub": user.email}, expires_delta=refresh_token_expires
    )

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,  # Optional if you want to rotate refresh tokens
        "token_type": "bearer"
    }