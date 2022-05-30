import React from 'react';
import {AppBar, Box, Button, styled, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const navBtns = [
  {
    page: 'Home',
    to: '/',
  },
  {
    page: 'Kelas',
    to: '/courses',
  },
  {
    page: 'Tentang Kami',
    to: '/about'
  }
]

const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
})

const MainNavBar = () => {
  return (
    <AppBar
      position='sticky'
      color='white'
    >
      <StyledToolBar>
        <Link to={'/'} className='text-link'>
          <Typography variant='h6' color='dodgerblue' noWrap xs={{flexGrow: 1}}>
            ARTKADEMI
          </Typography>
        </Link>
        <Box>
          {navBtns.map((btn) => {
            return (
              <Link key={btn.page} to={btn.to} className='text-link'>
                <Button color='info'>
                  {btn.page}
                </Button>
              </Link>
            )
          })}
        </Box>
        <Box>
          <Button
            variant='outlined'
            color='info'
            sx={{marginRight: 1}}
            component={Link}
            to={'/login'}
          >
            LOGIN
          </Button>
          <Button
            variant='contained'
            color='warning'
            sx={{
              boxShadow: 'none'
            }}
            component={Link}
            to={'/register'}
          >
            DAFTAR
          </Button>
        </Box>
      </StyledToolBar>
    </AppBar>
  );
};

export default MainNavBar;