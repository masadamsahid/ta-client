import React from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Link as RLink} from "react-router-dom";

const Register = () => {
  return (
    <Stack minHeight={'100vh'}>
      <Stack my='auto'>
        <Typography className='text-link' variant='h3' fontWeight={700} textAlign='center' mb='40px' component={RLink} to='/'>
          ARTKADEMI
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
          <form>
            <Stack padding={2} gap={1}>
              <TextField label='username'/>
              <TextField label='email'/>
              <TextField label='password' type='password'/>
              <TextField label='confirm password' type='password'/>
              <Button variant='contained' fullWidth>
                Daftar
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

export default Register;