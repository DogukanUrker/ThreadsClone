from uuid import uuid4
from fastapi import HTTPException


def uniqueID():
    return str(uuid4()).replace("-", "")


def response(response):
    if response:
        del response["_id"]
        return response
    else:
        raise HTTPException(404, f"DATA NOT FOUND")
