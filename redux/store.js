import {
  configureStore,
  getDefaultMiddleware,
  createSlice,
} from "@reduxjs/toolkit";

const middleware = [...getDefaultMiddleware()];

const initialFilmsState = {
  currentFilms: [],
};

const filmsSlice = createSlice({
  name: "currentFilms",
  initialState: initialFilmsState,
  reducers: {
    ADD_FILM: (state, action) => {
      state.currentFilms = [...state.currentFilms, action.payload];
    },
  },
});

export const { ADD_FILM } = filmsSlice.actions;
const filmsReducer = filmsSlice.reducer;

const initialOverlayState = {
  open: false,
};

const overlaySlice = createSlice({
  name: "overlay",
  initialState: initialOverlayState,
  reducers: {
    TOGGLE_OVERLAY: (state, action) => {
      state.open = !state.open;
    },
  },
});

export const { TOGGLE_OVERLAY } = overlaySlice.actions;
const overlayReducer = overlaySlice.reducer;

export const store = configureStore({
  reducer: {
    filmsStore: filmsReducer,
    overlayStore: overlayReducer,
  },
  middleware,
});
