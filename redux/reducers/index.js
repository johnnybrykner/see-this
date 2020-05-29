import { combineReducers } from "redux";
import { ADD_FILM } from "../actionTypes";

const initialState = {
  films: [],
};

function currentFilms(state = initialState, action) {
  switch (action.type) {
    case ADD_FILM: {
      return {
        films: [...state.films, action.payload],
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  currentFilms,
});
