import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slice/Form';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

