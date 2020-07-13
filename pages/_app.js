import React from 'react';
import UserProvider from '../context/userContext';
import theme from '../components/theme.ts';
import { ThemeProvider } from '@material-ui/core';

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}
