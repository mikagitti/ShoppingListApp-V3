'use client'

import Link from "next/link";

import ThemeComponent from "@/Containers/Theme/ThemeComponent";
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BungalowIcon from '@mui/icons-material/Bungalow';
import InfoIcon from '@mui/icons-material/Info';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import { styled } from '@mui/material';
import React, { useContext, useState } from "react";
import LoginContext from "@/Context/login/LoginContext";
import LoginButton from "@/app/login/button";

const AppBarIconLink = styled(Link)(({ theme }) => ({          
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.primary.light,        
    },
    display: 'flex', 
    gap: 2, 
    flexDirection: 'row',
    alignItems: 'center',
    mt: '110px',
}));


export default function MainNavBar() {
    
    const {selectedUser, clearSelectedUser, selectedAdmin, logoutAdmin} = useContext(LoginContext);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const iconSize = isPhone ? '25px' : '45px';

    const iconStyle = { 
        fontSize: iconSize,
        color: theme.palette.primary.contrastText,
    }

    const adminIconStyle = { 
        fontSize: iconSize,
        color : selectedAdmin ? 'green' : theme.palette.primary.contrastText,        
    }

    const customTypography = {                
        color: theme.palette.primary.contrastText,
        fontSize: '1.2rem',        
        '&:hover': {
            color: theme.palette.primary.light,        
            fontSize: '1.5rem',
        },   
    }
    
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
          return;
        }
        setDrawerOpen(open);
      };

    const drawer = (
        <Box            
            sx={{ width: '100%' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}              
        >          
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, flexDirection: 'column', margin: '10px' }}>
                <AppBarIconLink href="/home">                
                    <BungalowIcon sx={iconStyle} />                    
                    <Typography sx={customTypography}>Home</Typography>
                </AppBarIconLink>
                
                <AppBarIconLink href="/shoppinglist">
                    <ShoppingCartIcon sx={iconStyle}/>
                    <Typography sx={customTypography}>(Old) Shopping list</Typography>                    
                </AppBarIconLink>
            
                <AppBarIconLink href="/shoppinglist_v2">
                    <EngineeringIcon sx={iconStyle}/>
                    <Typography sx={customTypography}>(New) Shopping list</Typography>
                </AppBarIconLink>                

                <AppBarIconLink href="/about">
                    <InfoIcon sx={iconStyle}/>
                    <Typography sx={customTypography}>About this</Typography>
                </AppBarIconLink>

                <AppBarIconLink href="/admin">                    
                    <AdminPanelSettingsOutlinedIcon sx={adminIconStyle}/>
                    <Typography sx={customTypography}>Admin</Typography>                    
                </AppBarIconLink>
            </Box>

        </Box>
      );



    return (
        <AppBar position="static">            
            <Toolbar sx={{ justifyContent: isPhone ? 'left' : 'right',  flexDirection: 'row' }}>
                
                {isPhone ? (
                <>
                 <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, justifyContent: 'left' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                
                    <Drawer
                        anchor={'right'}
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                
                <Box sx={{ position: 'absolute', right: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {
                    selectedUser ? 
                    <Button onClick={() => clearSelectedUser() }>
                        <LoginButton user={selectedUser.username}>Logout</LoginButton>
                    </Button> :
                    <Button>
                        <AppBarIconLink sx={ {color: theme.palette.primary.contrastText} } href='/login'>
                            <LoginButton user={null}>Login</LoginButton>
                        </AppBarIconLink>
                    </Button>
                    }
                    <ThemeComponent  />
                </Box>
                </>
                ) : (
                    <>
                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, ml: '10px' }}>
                            <AppBarIconLink href="/home">
                                <BungalowIcon sx={iconStyle} />
                            </AppBarIconLink>
                            
                            <AppBarIconLink href="/shoppinglist">
                                <ShoppingCartIcon sx={iconStyle}/>
                            </AppBarIconLink>
                        
                            <AppBarIconLink href="/shoppinglist_v2">
                                <EngineeringIcon sx={iconStyle}/>
                            </AppBarIconLink>

                            
                            <AppBarIconLink href="/about">
                                <InfoIcon sx={iconStyle}/>
                            </AppBarIconLink>

                            <AppBarIconLink href="/admin">
                                <AdminPanelSettingsOutlinedIcon sx={adminIconStyle} />                    
                            </AppBarIconLink>
                            
            
                        </Box>                    
                        <Box sx={{ position: 'absolute', right: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {
                                selectedUser ? 
                                <Button onClick={() => clearSelectedUser() }>
                                    <LoginButton user={selectedUser.username}>Logout</LoginButton>
                                </Button> :
                                <Button>
                                    <AppBarIconLink sx={ {color: theme.palette.primary.contrastText} } href='/login'>
                                        <LoginButton user={null}>LogIn</LoginButton>
                                    </AppBarIconLink>
                                </Button>
                            }
                            <ThemeComponent  />
                            
                        </Box>  
                        </>              
                )}
            </Toolbar>                 
        </AppBar>
    );
}