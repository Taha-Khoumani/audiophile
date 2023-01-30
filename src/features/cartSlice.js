//redux
import { createSlice } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const initialState = {
  items: persistedState,
  isModalOpen:false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const { slug, name, price, quantity } = payload;
      if (state.items.some((item) => item.itemslug === slug)) {
        return {
          items: state.items.map((item) =>
            item.itemslug === slug
              ? { ...item, itemQuantity: item.itemQuantity + quantity }
              : item
          ),
          total: 0,
        };
      } else {
        state.items.push({
          itemslug: slug,
          itemName: name,
          itemPrice: price,
          itemQuantity: quantity,
        });
      }
    },
    removeAll: (state) => {
      state.items = [];
    },
    modifyByOne: (state, { payload }) => {
      const { isAdding, slug } = payload;
      if (isAdding) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.itemslug === slug
              ? { ...item, itemQuantity: item.itemQuantity + 1 }
              : item
          ),
        };
      } else if (
        state.items.find((t) => t.itemslug === slug).itemQuantity > 1
      ) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.itemslug === slug
              ? { ...item, itemQuantity: item.itemQuantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter((t) => t.itemslug !== slug),
        };
      }
    },
    setPreviousCart: (state, { payload }) => {
      state.items = payload;
    },
    toggleModal:(state,{payload}) =>{
      state.isModalOpen = payload
    }
  },
});

export default cartSlice.reducer;
export const { addItem, removeAll, modifyByOne, setPreviousCart,toggleModal } =
  cartSlice.actions;
