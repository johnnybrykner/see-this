import {
  configureStore,
  getDefaultMiddleware,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const middleware = [...getDefaultMiddleware()];

const initialFilmsState = {
  selectedFilms: [],
  currentQueryResults: {
    Search: null,
    totalResults: null,
    Response: null,
    Error: null,
  },
  loading: false,
  showNotification: false,
  notificationText: "",
};

export const LOOK_UP = createAsyncThunk(
  "films/lookup",
  async ({ title, type, year }, { dispatch }) => {
    dispatch(SET_LOADING(true));
    const rawData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}&s=${title}${
        year ? "&y=" + year : ""
      }${type ? "&type=" + type : ""}`
    );
    const response = await rawData.json();
    dispatch(SET_LOADING(false));
    if (response.Error) {
      dispatch(SHOW_NOTIFICATION(response.Error));
      return;
    }

    // setTimeout(() => {
    // }, 4000);
    return response;
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState: initialFilmsState,
  reducers: {
    ADD_FILM: (state, action) => {
      state.selectedFilms = [...state.selectedFilms, action.payload];
    },
    SET_LOADING: (state, action) => {
      state.loading = action.payload;
    },
    SHOW_NOTIFICATION: (state, action) => {
      state.showNotification = true;
      state.notificationText = action.payload;
    },
    RESET_NOTIFICATION: (state) => {
      state.showNotification = false;
      state.notificationText = "";
    },
  },
  extraReducers: {
    [LOOK_UP.fulfilled]: (state, action) => {
      state.currentQueryResults = action.payload;
    },
  },
});

export const {
  ADD_FILM,
  SET_LOADING,
  SHOW_NOTIFICATION,
  RESET_NOTIFICATION,
} = filmsSlice.actions;
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
