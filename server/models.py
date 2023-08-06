from pydantic import BaseModel

class User(BaseModel):
    id: str
    username: str
    email: str
    password: str
    name: str
    joinDate: str
    joinTime: str
    profilePicture: str
    bio: str
    link: str
    followers: list
    following: list
    private: bool
    active: bool
    confirmed: bool 

class LoginItem(BaseModel):
    username: str
    password: str


class Thread(BaseModel):
    id: str
    author: str
    thread: str
    media: str
    date: str
    time: str
    likes: list
    repost: list
    replies: list
