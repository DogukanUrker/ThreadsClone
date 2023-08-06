from uuid import uuid4 

def uniqueID():
    return str(uuid4()).replace('-','')
