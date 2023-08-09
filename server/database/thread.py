from .database import colThread


class ThreadDB:
    def postThread(data):
        colThread.insert_one(data)

    def fetchThreadByAuthor(author):
        return colThread.find_one({"author": author})

    def fetchThreadByID(id):
        return colThread.find_one({"id": id})
