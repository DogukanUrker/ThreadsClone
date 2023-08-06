from fastapi import FastAPI, HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from models import LoginItem, User, Thread, UpdateUser
from passlib.hash import sha256_crypt
from dependencies import *
from database.user import UserDB
from database.thread import ThreadDB
from helpers import uniqueID

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=origins,
    allow_credentials=True,
)


@app.post("/signup", response_model=User)
async def signup(user: User):
    print(user)
    if not UserDB.fetchUser(user.username):
        from datetime import datetime

        user.id = uniqueID()
        user.password = sha256_crypt.hash(user.password)
        user.joinDate = datetime.today().strftime("%d/%m/%Y")
        user.joinTime = datetime.today().strftime("%H:%M:%S")
        UserDB.addUser(user.dict())
        print(user)
        return user
    raise HTTPException(400, "This user already exists.")


@app.post("/login")
async def login(loginitem: LoginItem):
    data = jsonable_encoder(loginitem)
    response = UserDB.fetchUser(data["username"])
    if response:
        match data["username"] != "edit":
            case True:
                match data["username"] == response["username"]:
                    case True:
                        match sha256_crypt.verify(
                            data["password"], response["password"]
                        ):
                            case True:
                                encodedJWT = jwt.encode(
                                    data, SECERT_KEY, algorithm=ALGORITHM
                                )
                                return {
                                    "token": encodedJWT,
                                    "username": data["username"],
                                }
                            case False:
                                raise HTTPException(404, f"wrong password")
            case False:
                raise HTTPException(404, f"user name cant be 'edit' ")
    raise HTTPException(404, f"user not found")


@app.put("/updateUser")
async def updateUser(user: UpdateUser):
    data = jsonable_encoder(user)
    UserDB.updateUser(data)


@app.get("/fetchUser/{id}")
async def fetchUser(id):
    response = UserDB.fetchUser(id)
    if response:
        del response["_id"]
        return response
    raise HTTPException(404, f"data not found")


@app.post("/newThread", response_model=Thread)
async def newThread(thread: Thread):
    thread.id = uniqueID()
    ThreadDB.newThread(thread.dict())
