from pydantic import BaseModel


class Comment(BaseModel):
    id: str
    authorID: str
    comment: str
    threadID: str
    media: str
    date: str
    time: str
    likes: list
    repost: list
