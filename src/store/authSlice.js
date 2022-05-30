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
      if (['admin', 'tutor'].includes(decodedJWToken.role)){
        localStorage.setItem('jwtoken', payload.token);
        state.selfUser = decodedJWToken;
      }else {
        state.selfUser = null;
      }
    },
    logout: (state, action) => {
      localStorage.removeItem('jwtoken')
      state.selfUser = null
    },
  }
});

export default authSlice;