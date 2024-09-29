from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum

class PermissionBase(BaseModel):
    name: str

class PermissionCreate(PermissionBase):
    pass

class Permission(PermissionBase):
    id: int

    class Config:
        orm_mode = True

class RoleBase(BaseModel):
    name: str

class RoleCreate(RoleBase):
    permission_ids: List[int] = []




class Role(RoleBase):
    id: int
    permissions: List[Permission] = []

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: EmailStr
    verification_code: Optional[str] = None
    code_expiration: Optional[str] = None

class UserCreate(UserBase):
    role_ids: List[int] = []

class User(UserBase):
    id: int
    roles: List[Role] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str


class RefreshTokenSchema(BaseModel):
    access_token: str
    token_type: str

class EmailBody(BaseModel):
    email: str

class Verify(BaseModel):
    email: str
    code: str


class ticketbase(BaseModel):
    message: str

    class Config:
        orm_mode = True



class GenderEnum(str, Enum):
    male = "male"
    female = "female"
    other = "other"


class ProfileBase(BaseModel):
    first_name: str
    last_name: str
    gender: GenderEnum
    national_code: str
    phone_number: str
    username: str


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int

    class Config:
        orm_mode = True