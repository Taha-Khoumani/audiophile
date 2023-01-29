import { createSlice } from "@reduxjs/toolkit";

const savedData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const initialState = savedData;

const userDataSlice = createSlice({
  name: "useData",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      const { name, value } = payload;
      return {
        ...state,
        [name]: value,
      };
    },
  },
});

export default userDataSlice.reducer;
export const { setData } = userDataSlice.actions;
