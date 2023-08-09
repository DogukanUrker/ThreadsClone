from .database import colComment


class CommentDB:
    def postComment(comment):
        colComment.insert_one(comment)

    def fetchCommentByThread(threadID):
        return colComment.find_one({"threadID": threadID})

    def fetchCommentByAuthor(authorID):
        return colComment.find_one({"authorID": authorID})

    def deleteCommentByID(commentID):
        return colComment.delete_one({"id": commentID})
