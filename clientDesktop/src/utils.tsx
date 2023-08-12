import axios from "axios";
import { API } from "./dependencies";

export function setPublic(userID: string) {
  axios.put(`${API}setPublic/${userID}`);
  window.location.reload();
}

export function setPrivate(userID: string) {
  axios.put(`${API}setPrivate/${userID}`);
  window.location.reload();
}

export function saveChanges(
  userID: string,
  username: string,
  name: string,
  bio: string,
  link: string,
  mail: string
) {
  axios.put(`${API}updateUser/`, {
    id: userID,
    username: username,
    name: name,
    bio: bio,
    link: link,
    mail: mail,
    profilePicture: "",
  });
}
