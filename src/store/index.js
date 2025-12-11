import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice.js"
import loaderReducer from "./slices/loaderSlice.js"
import modalReducer from "./slices/modalSlice.js"
import idReducer from "./slices/idSlice.js"
import basketReducer from "./slices/basketSlice.js"
import toggleReducer from "./slices/toggleSlice.js"
import languageReducer from "./slices/languageSlice.js"

export const store = configureStore({
  reducer: {
     user: userReducer,
     loader : loaderReducer,
     modal : modalReducer,
     id : idReducer,
     basket : basketReducer,
     language: languageReducer,
     toggle : toggleReducer,
     imageUrl : 'http://localhost:5500'
  }
});
