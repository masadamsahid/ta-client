import {createSlice} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  selfUser: null
}

if (localStorage.getItem('jwtoken')){
  const decodedJWToken = jwtDecode(localStorage.getItem('jwtoken'));

  if (Date.now() > decodedJWToken.exp * 1000){
    localStorage.removeItem('jwtoken');
  }else {
    initialState.selfUser = decodedJWToken;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const decodedJWToken = jwtDecode(payload.token);
      localStorage.setItem('jwtoken', payload.token);
      state.selfUser = decodedJWToken;
    },
    logout: (state, action) => {
      localStorage.removeItem('jwtoken');
      state.selfUser = null;
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice;