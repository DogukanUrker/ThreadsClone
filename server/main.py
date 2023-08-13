from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dependencies import *
from routes.auth import auth
from routes.user import user
from routes.thread import thread
from routes.comment import comment

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=origins,
    allow_credentials=True,
)

app.include_router(auth)
app.include_router(user)
app.include_router(thread)
app.include_router(comment)
