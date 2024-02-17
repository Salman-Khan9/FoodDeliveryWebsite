import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  items: [],
};

const itemslice = createSlice({
  name: "fooditems",
  initialState: initialstate,
  reducers: {
    set_items(state, action) {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    delete_item(state, action) {
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      };
    },
    delete_items(state, action) {
      return {
        ...state,
        items: [],
      };
    },
  },
});
export const { set_items, delete_item, delete_items } = itemslice.actions;
export const selectitems = (state) => state.fooditems.items;
export default itemslice.reducer;
