from fastapi import APIRouter
from fastapi import HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from models.auth import LoginItem
from models.user import User
from passlib.hash import sha256_crypt
from dependencies import *
from database.user import UserDB
from utils import uniqueID, isUserUnique

auth = APIRouter()


@auth.post("/signup", response_model=User)
async def signup(user: User):
    if isUserUnique(user.username):
        from datetime import datetime

        user.id = uniqueID()
        user.password = sha256_crypt.hash(user.password)
        user.joinDate = datetime.today().strftime("%d/%m/%Y")
        user.joinTime = datetime.today().strftime("%H:%M:%S")
        UserDB.addUser(user.dict())
        return user
    raise HTTPException(400, "This user already exists.")


@auth.post("/login")
async def login(loginitem: LoginItem):
    data = jsonable_encoder(loginitem)
    response = UserDB.fetchUserByUsername(data["username"])
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
                                    "user": data["username"],
                                }
                            case False:
                                raise HTTPException(404, f"wrong password")
            case False:
                raise HTTPException(404, f"user name cant be 'edit' ")
    raise HTTPException(404, f"user not found")
