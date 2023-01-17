import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isMenuOpen:false,
    isMenuCollapsed: window.innerWidth <= 767,
    winWidth:window.innerWidth,
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
        }
    }
})

export default  navSlice.reducer
export const {toggleMenu,setMenuColl,setWinWidth} = navSlice.actions