from sqlalchemy import Column, Integer, String, ForeignKey,DateTime, Table,Text
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Enum

Base = declarative_base()

user_roles = Table(
    'user_roles', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('role_id', Integer, ForeignKey('roles.id'))
)

# Association Table between Role and Permission
role_permissions = Table(
    'role_permissions', Base.metadata,
    Column('role_id', Integer, ForeignKey('roles.id')),
    Column('permission_id', Integer, ForeignKey('permissions.id'))
)

class GenderEnum(PyEnum):
    male = "male"
    female = "female"
    other = "other"



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    verification_code = Column(String, nullable=True) 
    code_expiration = Column(DateTime, nullable=True)  
    tickets = relationship("Ticket", back_populates="user")
    profile = relationship("Profile", back_populates="user", uselist=False)  
    roles = relationship("Role", secondary=user_roles, back_populates="users")



class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

    users = relationship("User", secondary=user_roles, back_populates="roles")
    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")

class Permission(Base):
    __tablename__ = 'permissions'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    
    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")


class Ticket(Base):
    __tablename__ = 'tickets'
    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="tickets")


class Profile(Base):
    __tablename__ = 'profiles'
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    national_code = Column(String(10), unique=True, nullable=False)
    phone_number = Column(String(15), unique=True, nullable=False)
    username = Column(String(30), unique=True, nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship("User", back_populates="profile")