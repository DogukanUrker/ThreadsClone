from uuid import uuid4


def uniqueID():
    return str(uuid4()).replace("-", "")


def response(response):
    if response:
        del response["_id"]
        return response