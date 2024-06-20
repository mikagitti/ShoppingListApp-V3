
import { ReactNode } from 'react';
import type { Metadata } from 'next';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@/Context/Theme/ThemeContext';
import MainNavBar from '@/Components/Navigation/MainNavBar';
import { LoginProvider } from '@/Context/login/LoginContext';

export const metadata: Metadata = {
  title: 'Page is page',  
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">      
      <ThemeProvider>
        <LoginProvider>
        <CssBaseline />
        <body>
          <MainNavBar />
          {children}          
        </body>
        </LoginProvider>
      </ThemeProvider>
    </html>
  )
}
