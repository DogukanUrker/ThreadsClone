from uuid import uuid4
from fastapi import HTTPException
from database.database import colUsers


def uniqueID():
    return str(uuid4()).replace("-", "")


def response(response):
    if response:
        del response["_id"]
        return response
    else:
        raise HTTPException(404, f"DATA NOT FOUND")


def isUserUnique(username):
    data = []
    for i in colUsers.find({}):
        data.append(list(i.values())[2].lower())
    return not username.lower() in data
