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

export function getNumberOfDays(date) {
  const date1 = new Date(date);
  const date2 = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  if (diffInDays > 31) {
    const diffInMonths = Math.round(diffInDays / 30);
    return `${diffInMonths}MONTHS`;
  } else if (diffInDays > 7 && diffInDays < 31) {
    const diffInWeeks = Math.round(diffInDays / 7);
    return `${diffInWeeks}WEEKS`;
  } else {
    return `${diffInDays}DAYS`;
  }
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
