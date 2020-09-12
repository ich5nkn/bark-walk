import React from 'react';
import UserProvider from '../context/userContext';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
// app bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import 'fontsource-roboto';

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Bark Walk</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <AppBar position="fixed" style={{ width: '100%', flexGrow: 1 }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  ドッグウォーカーを探す
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  ドッグウォーカーになる
                </MenuItem>
                <MenuItem onClick={handleClose}>サービスについて</MenuItem>
                <MenuItem onClick={handleClose}>会員登録</MenuItem>
              </Menu>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Bark Walk
              </Typography>
              <Button color="inherit">Sign Up</Button>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: 56 }}>
            <Component {...pageProps} />
          </div>
        </body>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </ThemeProvider>
    </UserProvider>
  );
}
