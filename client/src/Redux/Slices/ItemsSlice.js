import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    items:[{
        name:"",
        category:"",
        quantity:"",
        finalprice:"",
    }]
}

const itemslice = createSlice(
    {
        name:"fooditems",
        initialState:initialstate,
        reducers:{
            set_items(state,action){
                return {
                    ...state,
                    items: [...state.items, action.payload]
                };

            }
            
        }
    }
    
)
export const {set_items} = itemslice.actions
export const selectitems = (state) => state.fooditems.items
export default itemslice.reducer