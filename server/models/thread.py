from pydantic import BaseModel


class Thread(BaseModel):
    id: str
    author: str
    thread: str
    media: str
    date: str
    time: str
    likes: list
    repost: list
