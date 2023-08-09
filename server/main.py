from fastapi import FastAPI, HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from models.auth import LoginItem
from models.user import User, UpdateUser
from models.thread import Thread
from models.comment import Comment
from passlib.hash import sha256_crypt
from dependencies import *
from database.user import UserDB
from database.thread import ThreadDB
from database.comment import CommentDB
from utils import uniqueID, response

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
    if not UserDB.fetchUser(user.username):
        from datetime import datetime

        user.id = uniqueID()
        user.password = sha256_crypt.hash(user.password)
        user.joinDate = datetime.today().strftime("%d/%m/%Y")
        user.joinTime = datetime.today().strftime("%H:%M:%S")
        UserDB.addUser(user.dict())
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


@app.get("/fetchUserByUsername/{username}")
async def fetchUserByUsername(username):
    return response(UserDB.fetchUserByUsername(username))


@app.get("/fetchUserByID/{id}")
async def fetchUserByID(id):
    return response(UserDB.fetchUserByID(id))


@app.post("/postThread", response_model=Thread)
async def postThread(thread: Thread):
    thread.id = uniqueID()
    ThreadDB.postThread(thread.dict())


@app.get("/fetchThreadByID/{id}")
async def fetchThreadByID(id):
    return response(ThreadDB.fetchThreadByID(id))


@app.get("/fetchThreadByAuthor/{author}")
async def fetchThreadByAuthor(author):
    return response(ThreadDB.fetchThreadByAuthor(author))


@app.post("/postComment", response_model=Comment)
async def postComment(comment: Comment):
    comment.id = uniqueID()
    CommentDB.postComment(comment.dict())


@app.get("/fetchCommentByThread/{threadID}")
async def fetchCommentByThread(threadID):
    return response(CommentDB.fetchCommentByThread(threadID))


@app.get("/fetchCommentByAuthor/{authorID}")
async def fetchCommentByAuthor(authorID):
    return response(CommentDB.fetchCommentByAuthor(authorID))


@app.delete("/deleteThreadByID/{threadID}")
async def deleteThreadByID(threadID):
    return ThreadDB.deleteThreadByID(threadID)


@app.delete("/deleteCommentByID/{CommentID}")
async def deleteCommentByID(CommentID):
    return CommentDB.deleteCommentByID(CommentID)
