import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: [],
  dragOrder:[],
  description:"",
  descName:"",
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.formData = action.payload;
    },

    addDragOrder: (state, action) => {
      state.dragOrder = action.payload;
    },

    addDescription: (state, action) => {
      state.description = action.payload;

    },

    addName: (state, action) => {
      state.descName = action.payload;
    },
  },
});

export const {addFormData , addDragOrder , addDescription , addName} = resumeSlice.actions;

export default resumeSlice.reducer;
