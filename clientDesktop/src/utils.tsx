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
