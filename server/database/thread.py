from .database import colThread


class ThreadDB:
    def newThread(data):
        colThread.insert_one(data)