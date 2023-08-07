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

    def fetchUser(username):
        return colUsers.find_one({"username": username})
