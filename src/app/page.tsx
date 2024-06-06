import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <Box sx={ {display: 'flex', justifyContent: 'center'}}>
      <Link 
        href="/home"
        style={ {fontSize: '25px'}}>ENTER</Link>
    </Box>          
  )
}
