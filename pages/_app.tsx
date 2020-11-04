import React from 'react';
import UserProvider from '../context/userContext';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import 'fontsource-roboto';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
