from fastapi import APIRouter
from models.comment import Comment
from database.comment import CommentDB
from utils import uniqueID, response

comment = APIRouter()


@comment.post("/postComment", response_model=Comment)
async def postComment(comment: Comment):
    comment.id = uniqueID()
    CommentDB.postComment(comment.dict())


@comment.get("/fetchCommentByThread/{threadID}")
async def fetchCommentByThread(threadID):
    return response(CommentDB.fetchCommentByThread(threadID))


@comment.get("/fetchCommentByAuthor/{authorID}")
async def fetchCommentByAuthor(authorID):
    return response(CommentDB.fetchCommentByAuthor(authorID))


@comment.delete("/deleteCommentByID/{CommentID}")
async def deleteCommentByID(CommentID):
    return CommentDB.deleteCommentByID(CommentID)
