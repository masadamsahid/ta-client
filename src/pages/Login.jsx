import React, {useState} from 'react';
import {Box, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {Link as RLink, Navigate} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/authSlice";
import {LoginOutlined} from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();

  const {selfUser} = useSelector(store => store.auth);

  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, {loading, data}] = useMutation(LOGIN_USER,{
    variables:{
      usernameEmail,
      password,
    },
    update(cache, result){
      dispatch(authActions.login(result.data.login));
    }
  });

  function login(e) {
    e.preventDefault();
    loginUser();
  }

  console.log(data)

  if (selfUser) return <Navigate to='/'/>

  return (
    <Stack minHeight={'100vh'}>
      <Stack my='auto'>
        <Typography className='text-link' variant='h3' fontWeight={700} textAlign='center' mb='40px' component={RLink} to='/'>
          GAMADEMY
        </Typography>
        <Box
          sx={{
            boxShadow: '0 0 8px rgba(0,0,0,.2)'
          }}
          minWidth='200px'
          width='40vw'
          mx='auto'
          borderRadius='5px'
          textAlign='center'
        >
          <form onSubmit={login}>
            <Stack padding={2} gap={1} bgcolor='#fff'>
              <TextField label='username/email' value={usernameEmail} onChange={({target:{value}})=>setUsernameEmail(value)}/>
              <TextField label='password' type='password' value={password} onChange={({target:{value}})=>setPassword(value)}/>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} thickness={7} color='inherit'/> : <LoginOutlined/>}
              >
                {loading ? 'loading response' : 'Login'}
              </Button>
              <p>
                Belum memiliki akun? <RLink to='/register'>Daftar</RLink>
              </p>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Stack>
  );
};

const LOGIN_USER = gql`
  mutation login($usernameEmail: String!, $password: String){
    login (usernameEmail: $usernameEmail, password: $password){
      username
      email
      about
      token
      role
    }
  }
`

export default Login;