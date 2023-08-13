from fastapi import APIRouter
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from models.user import UpdateUser
from database.user import UserDB
from utils import response, isUserUnique

user = APIRouter()


@user.put("/updateUser")
async def updateUser(user: UpdateUser):
    if isUserUnique(user.username):
        data = jsonable_encoder(user)
        UserDB.updateUser(data)
        raise HTTPException(200, "User settings updated.")
    raise HTTPException(400, "This username is already taken.")


@user.get("/fetchUserByUsername/{username}")
async def fetchUserByUsername(username):
    return response(UserDB.fetchUserByUsername(username))


@user.get("/fetchUserByID/{id}")
async def fetchUserByID(id):
    return response(UserDB.fetchUserByID(id))


@user.put("/setPublic/{userID}")
async def setPublic(userID):
    return UserDB.setPublicByID(userID)


@user.put("/setPrivate/{userID}")
async def setPrivate(userID):
    return UserDB.setPrivateByID(userID)
