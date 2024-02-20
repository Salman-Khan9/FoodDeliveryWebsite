import { configureStore } from "@reduxjs/toolkit";
import fooditems from "../Slices/ItemsSlice";
import auth from "../Slices/Authslice"
const store = configureStore({
  reducer: {
    fooditems: fooditems,
    auth:auth
  },
});
export { store };
