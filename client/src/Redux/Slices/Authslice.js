import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  logstatus: false,
  Adminlogstatus:  false
};

const authslice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: {
    set_loginstatus(state, action) {
      state.logstatus = action.payload
    },set_Adminloginstatus(state, action) {
      state.Adminlogstatus = action.payload;
    },
   
    
  },
});
export const { set_loginstatus,set_Adminloginstatus} = authslice.actions;
export const selectloginstatus = (state) => state.auth.logstatus;
export const selectAdminloginstatus = (state) => state.auth.Adminlogstatus;
export default authslice.reducer;