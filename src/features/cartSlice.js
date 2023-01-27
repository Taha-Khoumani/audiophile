//redux
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
    total:0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem:(state,{payload})=>{
            const {slug,name,price,quantity} = payload
            if(state.items.some(item=>item.itemslug===slug)){
                return{
                    items:state.items.map(item=>
                        item.itemslug===slug?{...item,itemQuantity:item.itemQuantity+quantity}:8
                    ),
                    total:0
                }
            }else{
                state.items.push({
                    itemslug:slug,
                    itemName:name,
                    itemPrice:price,
                    itemQuantity:quantity,
                })
            }
        }
    }
})

export default cartSlice.reducer
export const {addItem} = cartSlice.actions