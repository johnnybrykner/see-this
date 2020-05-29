import { ADD_FILM } from "./actionTypes";

export function addFilm(payload) {
  return { type: ADD_FILM, payload };
}
