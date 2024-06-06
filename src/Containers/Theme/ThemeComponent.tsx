'use client'
import React, { useContext } from 'react';
import ThemeContext from '../../Context/Theme/ThemeContext';
import { Box, Switch, alpha, styled } from '@mui/material';

const SwitchStyle = {
  border: 'solid',
  borderRadius: '10px', 
  margin: '0 0 0 20px',
  p: '4px 14px'
}

export default function ThemeComponent() {

  const { toggleTheme } = useContext(ThemeContext);

  return (  
    <>
      <Box sx={ SwitchStyle }>
        <Switch onChange={toggleTheme} />
      </Box>    
    </>
  );
};


