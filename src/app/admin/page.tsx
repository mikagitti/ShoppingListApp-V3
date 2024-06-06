'use client'

import { Box, Button, Typography, useMediaQuery, useTheme, Paper, Grid, styled } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useContext, useState } from "react";
import Register from "./register";
import Login from "./login";
import LoginContext from "@/Context/login/LoginContext";


const CustomButton = styled(Button)(({ theme }) => ({          
    '&:hover': {
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.light,
        fontWeight: 'bold',
    },
    
    
    border: `1px solid ${theme.palette.primary.contrastText}`,
    
    overflow: 'hidden',
    width: '250px'
    
    
  }));
  

export default function Home() {

    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const {selectedAdmin, logoutAdmin} = useContext(LoginContext);



    const typographyStyle = { 
        m: isPhone ? '2px' : '6px',
        fontSize: isPhone ? '20px' : '45px',
    }

    const iconStyle = {         
        fontSize: isPhone ? '40px' : '60px',
    }

    const iconBoxStyle = {         
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'row', 
        m:'20px', 
        gap:'13px',
    }

    const buttonGroudStyle = {         
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'row', 
        m:'20px', 
        gap:'13px',
    }

    const [newAdminModalOpen, setNewAdminModalOpen] = useState<boolean>(false);
    const [loginAdminModalOpen, setLoginAdminModalOpen] = useState<boolean>(false);

    const gridBox = () => {
        return (
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} sx={{ padding: 2 }}>                        
                            <CustomButton onClick={() => setNewAdminModalOpen(true)}>                                
                                Add new Admin 
                            </CustomButton>                        
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <CustomButton onClick={logoutAdmin}>
                            Logout                            
                        </CustomButton>                       
                    </Paper>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    const adminPageLoggedIn = (        
        <>
        <Typography sx={typographyStyle}>
            This is Admin page, welcome!
        </Typography>        
        {gridBox()}
        </>
    );
    
    const iconRow = () => {
        return (
            <Box sx={ iconBoxStyle }>
            <AdminPanelSettingsOutlinedIcon sx={ iconStyle }/>
            <AdminPanelSettingsOutlinedIcon sx={ iconStyle }/>
            <AdminPanelSettingsOutlinedIcon sx={ iconStyle }/>
        </Box>    
        )
    }

    const adminPageNotLoggedIn = (            
        <>

        <Typography color={'primary'} sx={typographyStyle}>
            Welcome
        </Typography>

        <Typography sx={typographyStyle}>
            to
        </Typography>

        <Typography color={'secondary'} sx={typographyStyle}>
            Admin page!
        </Typography>
        
        <Typography paragraph>    
            Pages are under development...
        </Typography>

        <Box sx={buttonGroudStyle}>                    
            { selectedAdmin != null ?                 
                <h1>Your In !</h1> :
                <Button variant="outlined" onClick={() => setLoginAdminModalOpen(true)}>
                    Login as Administrator
                </Button> 
            }
        </Box>        
        </>
    );
        
    
    return (
        <Box sx={ {display: 'flex', alignItems: 'center', flexDirection: 'column', mt:'20px'} }>        
            {iconRow()}            
            { selectedAdmin != null ? 
                adminPageLoggedIn : 
                adminPageNotLoggedIn
            }
            {iconRow()}
            
            {newAdminModalOpen && <Register onClose={() => setNewAdminModalOpen(false)} /> }   
            {loginAdminModalOpen && <Login onClose={() => setLoginAdminModalOpen(false)} /> }
        </Box>
    )
}


