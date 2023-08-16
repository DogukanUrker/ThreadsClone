from fastapi import APIRouter
from models.thread import Thread
from database.thread import ThreadDB
from utils import uniqueID, response

thread = APIRouter()


@thread.post("/postThread", response_model=Thread)
async def postThread(thread: Thread):
    thread.id = uniqueID()
    ThreadDB.postThread(thread.dict())
    return {
        "threadID": thread.id,
    }


@thread.get("/fetchThreadByID/{id}")
async def fetchThreadByID(id):
    return response(ThreadDB.fetchThreadByID(id))


@thread.get("/fetchThreadByAuthor/{author}")
async def fetchThreadByAuthor(author):
    return response(ThreadDB.fetchThreadByAuthor(author))


@thread.delete("/deleteThreadByID/{threadID}")
async def deleteThreadByID(threadID):
    return ThreadDB.deleteThreadByID(threadID)


@thread.post("/likeThread/{threadID}/{userID}")
async def likeThread(threadID, userID):
    return ThreadDB.likeThread(threadID, userID)
