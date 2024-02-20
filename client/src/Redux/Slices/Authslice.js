import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  logstatus: false
};

const authslice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: {
    set_loginstatus(state, action) {
      state.logstatus = action.payload
    },
   
    
  },
});
export const { set_loginstatus} = authslice.actions;
export const selectloginstatus = (state) => state.auth.logstatus;
export default authslice.reducer;