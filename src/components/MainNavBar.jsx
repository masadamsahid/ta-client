import React, {useState} from 'react';
import {AppBar, Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, MenuList, styled, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

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
  const {selfUser} = useSelector(store => store.auth);
  console.log(selfUser)

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileMenuAnchEl, setProfileMenuAnchEl] = useState(null);

  function handleAvatarClick(e) {
    setProfileMenuAnchEl(e.currentTarget);
    setProfileMenuOpen(true);
  }

  function handleAvatarMenuClose() {
    setProfileMenuOpen(false);
    setProfileMenuAnchEl(null);
  }

  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
    >
      <StyledToolBar>
        <Link to='/' className='text-link'>
          <Typography variant='h6' color='black' noWrap xs={{flexGrow: 1}} fontWeight={700}>
            GAMADEMY
          </Typography>
        </Link>
        <Box display='flex' gap={2} flexGrow={8} justifyContent='center'>
          {navBtns.map((btn) => {
            return (
              <Link key={btn.page} to={btn.to} className='text-link'>
                <Button color='black'>
                  {btn.page}
                </Button>
              </Link>
            )
          })}
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between' gap={1}>
          {selfUser !== null ? (
            <>
              <Typography>Hello, {selfUser.username}!</Typography>
              <IconButton onClick={handleAvatarClick}>
                <Avatar
                  children={selfUser.username[0].toUpperCase()}
                />
              </IconButton>
              <Menu
                open={profileMenuOpen}
                anchorEl={profileMenuAnchEl}
                onClose={handleAvatarMenuClose}
              >
                <MenuList dense>
                  <MenuItem>
                    Profile
                  </MenuItem>
                  <Divider/>
                  <MenuItem>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant='outlined'
                color='info'
                sx={{marginRight: 1}}
                component={Link}
                to='/login'
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
                to='/register'
              >
                DAFTAR
              </Button>
            </>
          )}
        </Box>
      </StyledToolBar>
    </AppBar>
  );
};

export default MainNavBar;