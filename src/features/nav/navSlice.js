import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isMenuOpen:false,
    isMenuCollapsed: window.innerWidth <= 767,
}

const navSlice = createSlice({
    name:"nav",
    initialState,
    reducers:{
        toggleMenu:(state,{payload})=>{
            state.isMenuOpen = payload
        },
        setMenuColl:(state,{payload})=>{
            state.isMenuCollapsed = payload
        }
    }
})

export default  navSlice.reducer
export const {toggleMenu,setMenuColl} = navSlice.actions