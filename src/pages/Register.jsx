import React, {useState} from 'react';
import {Box, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {Link as RLink, Navigate} from "react-router-dom";
import gql from "graphql-tag";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "@apollo/client";
import {authActions} from "../store/authSlice";
import {ExitToApp} from "@mui/icons-material";

const Register = () => {
  const dispatch = useDispatch();

  const {selfUser} = useSelector(store => store.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerUser, {loading, data}] = useMutation(REGISTER_MUTATION, {
    variables: {
      username, email, fullName, password, confirmPassword
    },
    update(cache,result){
      dispatch(authActions.login(result.data.register));
    }
  });

  if (selfUser) return <Navigate to='/'/>

  function register(e) {
    e.preventDefault();
    registerUser();
  }

  return (
    <Stack minHeight={'100vh'}>
      <Stack my='auto'>
        <Typography
          className='text-link'
          variant='h3'
          fontWeight={700}
          textAlign='center'
          mb='40px'
          component={RLink}
          to='/'
        >
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
          <form onSubmit={register}>
            <Stack padding={2} gap={1} bgcolor='#fff'>
              <TextField
                label='username'
                value={username}
                onChange={({target: {value}}) => setUsername(value)}
                required
              />
              <TextField
                label='full name'
                value={fullName}
                onChange={({target: {value}}) => setFullName(value)}
                required
              />
              <TextField
                label='email'
                value={email}
                onChange={({target: {value}}) => setEmail(value)}
                required
              />
              <TextField
                label='password'
                type='password'
                value={password}
                onChange={({target: {value}}) => setPassword(value)}
                required
              />
              <TextField
                label='confirm password'
                type='password'
                value={confirmPassword}
                onChange={({target: {value}}) => setConfirmPassword(value)}
                required
              />
              <Button
                fullWidth
                type='submit'
                variant='contained'
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} thickness={7} color='inherit'/> : <ExitToApp/>}
              >
                {loading ? 'loading' : 'Daftar'}
              </Button>
              <p>
                Sudah memiliki akun? <RLink to='/login'>Login</RLink>
              </p>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Stack>
  );
};

const REGISTER_MUTATION = gql`
    mutation register($username: String!, $fullName: String!, $email: String!, $password: String!, $confirmPassword: String!){
        register(username: $username, fullName: $fullName, email: $email, password: $password, confirmPassword: $confirmPassword){
            token
        }
    }
`

export default Register;