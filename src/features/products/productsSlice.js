import { createSlice } from "@reduxjs/toolkit";

//data
import data from "../../data.json"

const initialState={
    productsList:data,
}

const productsSlice = createSlice(
    {
        name:"products",
        initialState,
    }
)

export default productsSlice.reducer