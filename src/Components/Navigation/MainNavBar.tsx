'use client';

import Link from 'next/link';

import ThemeComponent from '@/Containers/Theme/ThemeComponent';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BungalowIcon from '@mui/icons-material/Bungalow';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import { styled } from '@mui/material';
import React, { useContext, useState } from 'react';
import LoginContext from '@/Context/login/LoginContext';
import LoginButton from '@/app/login/button';

const AppBarIconLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.light,
  },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'left',
  gap: '0.76rem',
}));

export default function MainNavBar() {
  const { selectedUser, clearSelectedUser, selectedAdmin, logoutAdmin } = useContext(LoginContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));

  const iconSize = isPhone ? '2.5rem' : '4rem';

  const navbarHeigth = '5rem';

  const iconStyle = {
    fontSize: iconSize,
    color: theme.palette.primary.contrastText,
  };

  const adminIconStyle = {
    fontSize: iconSize,
    color: selectedAdmin ? 'green' : 'red',
  };

  const customTypography = {
    color: theme.palette.primary.contrastText,
    fontSize: '1.2rem',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: '100%' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'left',
          flexDirection: 'column',
          gap: 2.5,
          margin: '1rem 4rem 0 0.8rem',
        }}
      >
        <AppBarIconLink href="/home">
          <BungalowIcon sx={iconStyle} />
          <Typography sx={customTypography}>Home</Typography>
        </AppBarIconLink>

        <AppBarIconLink href="/shoppinglist_v2">
          <ShoppingCartIcon sx={{ ...iconStyle, color: selectedUser ? 'green' : 'red' }} />
          <Typography sx={customTypography}>Shopping list</Typography>
        </AppBarIconLink>

        <AppBarIconLink href="/about">
          <InfoIcon sx={iconStyle} />
          <Typography sx={customTypography}>About this</Typography>
        </AppBarIconLink>

        <AppBarIconLink href="/admin">
          <AdminPanelSettingsOutlinedIcon sx={adminIconStyle} />
          <Typography sx={customTypography}>Admin</Typography>
        </AppBarIconLink>
      </Box>
    </Box>
  );

  const adminLoginButtonStyle = {
    height: '100%',
    width: isPhone ? '7rem' : '10rem',
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: isPhone ? 'left' : 'right',
            flexDirection: 'row',

            height: navbarHeigth,
          }}
        >
          {isPhone ? (
            <>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor={'left'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                  '& .MuiDrawer-paper': {
                    top: navbarHeigth,
                  },
                }}
              >
                {drawer}
              </Drawer>

              <Box
                sx={{
                  position: 'absolute',
                  right: 16,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: navbarHeigth,
                }}
              >
                {selectedUser ? (
                  <Button sx={adminLoginButtonStyle} onClick={() => clearSelectedUser()}>
                    <LoginButton user={selectedUser.name}>Logout</LoginButton>
                  </Button>
                ) : (
                  <AppBarIconLink sx={{ ...adminLoginButtonStyle, color: theme.palette.primary.contrastText }} href="/login">
                    <Button sx={adminLoginButtonStyle}>
                      <LoginButton user={null}>Login</LoginButton>
                    </Button>
                  </AppBarIconLink>
                )}
                <ThemeComponent />
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  gap: 3,
                  ml: '10px',
                }}
              >
                <AppBarIconLink href="/home">
                  <BungalowIcon sx={iconStyle} />
                </AppBarIconLink>

                <AppBarIconLink href="/shoppinglist_v2">
                  <ShoppingCartIcon sx={{ ...iconStyle, color: selectedUser ? 'green' : 'red' }} />
                </AppBarIconLink>

                <AppBarIconLink href="/about">
                  <InfoIcon sx={iconStyle} />
                </AppBarIconLink>

                <AppBarIconLink href="/admin">
                  <AdminPanelSettingsOutlinedIcon sx={adminIconStyle} />
                </AppBarIconLink>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  right: '1rem',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: navbarHeigth,
                }}
              >
                {selectedUser ? (
                  <Button sx={adminLoginButtonStyle} onClick={() => clearSelectedUser()}>
                    <LoginButton user={selectedUser.name}>Logout</LoginButton>
                  </Button>
                ) : (
                  <Button sx={adminLoginButtonStyle}>
                    <AppBarIconLink
                      sx={{
                        color: theme.palette.primary.contrastText,
                      }}
                      href="/login"
                    >
                      <LoginButton user={null}>LogIn</LoginButton>
                    </AppBarIconLink>
                  </Button>
                )}
                <ThemeComponent />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}></Box>
    </>
  );
}
