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


class UpdateUser(BaseModel):
    id: str
    username: str
    email: str
    name: str
    profilePicture: str
    bio: str
    link: str
