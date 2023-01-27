import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isMenuOpen:false,
    isMenuCollapsed: window.innerWidth <= 767,
    winWidth:window.innerWidth,
    isCartCliked:false,
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
        },
        setWinWidth:(state,{payload})=>{
            state.winWidth = payload
        },
        clickCart:(state,{payload})=>{
            state.isCartCliked=payload
        }
    }
})

export default  navSlice.reducer
export const {toggleMenu,setMenuColl,setWinWidth,clickCart} = navSlice.actions