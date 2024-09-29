from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.login import login
from app.models.models import Base
from app.api.user import user
from app.api.role import role
from app.config.database import database
from app.api.permission import permission
from app.api.ticket import ticket
from app.api.profile import profile_api









Base.metadata.create_all(bind=database.engine)


app = FastAPI()



origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:8000",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(login.router)
app.include_router(permission.router)
app.include_router(user.router)
app.include_router(role.router)
app.include_router(ticket.router)
app.include_router(profile_api.router)





