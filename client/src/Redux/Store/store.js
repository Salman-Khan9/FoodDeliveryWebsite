import { configureStore } from "@reduxjs/toolkit";
import fooditems from "../Slices/ItemsSlice";
const store = configureStore({
  reducer: {
    fooditems: fooditems,
  },
});
export { store };
