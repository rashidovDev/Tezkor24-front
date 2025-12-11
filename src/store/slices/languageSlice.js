import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'language';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: getInitialLanguage()
  },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, action.payload);
      }
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
