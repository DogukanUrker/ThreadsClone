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

    def likeComment(commentID, userID):
        colComment.update_many(
            {"id": commentID},
            {
                "$push": {
                    "likes": userID,
                }
            },
        )

    def getLikeCount(commentID):
        return len(list(colComment.find_one({"id": commentID}).values())[6])
