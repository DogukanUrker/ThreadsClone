from .database import colUsers


class UserDB:
    def addUser(data):
        colUsers.insert_one(data)

    def updateUser(data):
        colUsers.update_many(
            {"id": data["id"]},
            {
                "$set": {
                    "username": data["username"],
                    "email": data["email"],
                    "password": data["password"],
                    "name": data["name"],
                    "profilePicture": data["profilePicture"],
                    "bio": data["bio"],
                    "link": data["link"],
                    "private": data["private"],
                    "active": data["active"],
                }
            },
        )

    def fetchUserByUsername(username):
        return colUsers.find_one({"username": username})

    def fetchUserByID(id):
        return colUsers.find_one({"id": id})

    def setPrivateByID(userID):
        colUsers.update_one(
            {"id": userID},
            {
                "$set": {
                    "private": True,
                }
            },
        )

    def setPublicByID(userID):
        colUsers.update_one(
            {"id": userID},
            {
                "$set": {
                    "private": False,
                }
            },
        )
