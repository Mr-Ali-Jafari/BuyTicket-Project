from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas
from fastapi import HTTPException, status
import logging

def is_admin(user: models.User) -> bool:
    return any(role.name == "admin" for role in user.roles)

def create_user(email: str, role_ids: list[int], db: Session):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    db_user = models.User(email=email)
    
    for role_id in role_ids:
        role = db.query(models.Role).filter(models.Role.id == role_id).first()
        if role:
            db_user.roles.append(role)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # چک کردن نقش ادمین
    if is_admin(db_user):
        print("Admin role assigned.")
    
    return db_user

def get_users(skip: int, limit: int, db: Session, current_user: models.User):
    try:
        if not is_admin(current_user):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have permission to view users")
        
        users = db.query(models.User).offset(skip).limit(limit).all()
        return users
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )

def get_user_by_id(user_id: int, db: Session, current_user: models.User):
    if not is_admin(current_user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have permission to view this user")

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

def update_user(user_id: int, email: str, role_ids: list[int], db: Session, current_user: models.User):
    if not is_admin(current_user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have permission to update this user")

    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    db_user.email = email
    
    db_user.roles = []
    for role_id in role_ids:
        role = db.query(models.Role).filter(models.Role.id == role_id).first()
        if role:
            db_user.roles.append(role)

    db.commit()
    db.refresh(db_user)
    return db_user
