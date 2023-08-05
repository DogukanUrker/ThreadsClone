from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
    password: str
    name: str
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
