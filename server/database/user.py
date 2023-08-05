from .database import colUsers


class UserDB:
    def addUser(data):
        colUsers.insert_one(data)

    def fetchUser(username):
        return colUsers.find_one({"username": username})