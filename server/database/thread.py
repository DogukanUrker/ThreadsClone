from .database import colThread


class ThreadDB:
    def postThread(data):
        colThread.insert_one(data)

    def fetchThreadByAuthor(author):
        return colThread.find_one({"author": author})

    def fetchThreadByID(id):
        return colThread.find_one({"id": id})

    def deleteThreadByID(threadID):
        return colThread.delete_one({"id": threadID})

    def likeThread(threadID, userID):
        colThread.update_many(
            {"id": threadID},
            {
                "$push": {
                    "likes": userID,
                }
            },
        )

    def getLikeCount(threadID):
        return colThread.find_one({"id": threadID})
