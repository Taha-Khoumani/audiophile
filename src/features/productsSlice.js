import { createSlice } from "@reduxjs/toolkit";

//data
import data from "../data.json"

const initialState={
    allProductsList:data,
}

const productsSlice = createSlice(
    {
        name:"products",
        initialState,
    }
)

export default productsSlice.reducer