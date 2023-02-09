import { createSlice } from "@reduxjs/toolkit";

const savedData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {
    address:"",
    city: "",
    country: "",
    eMoneyNumber: "",
    eMoneyPin: "",
    emailAddress: "",
    name: "",
    paymentMethod: "",
    phoneNumber: "",
    zipCode: "",
  };

const initialState = savedData;

const userDataSlice = createSlice({
  name: "userData",
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
