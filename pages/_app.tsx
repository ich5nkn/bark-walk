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

import { useUser } from '../utils/auth/useUser';
import {useRouter} from 'next/router';
import Link from 'next/link';


// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ログイン判定
  const { user, logout } = useUser()
  const router = useRouter();

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
                <Link href='/'>
                  <a>Bark Walk</a>
                </Link>
              </Typography>
              {user
                ?<Button color="inherit" onClick={logout}>Logout</Button>
                :<Button color="inherit" onClick={()=>router.push('/auth')}>Login</Button>
              }
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

          a {
            color:inherit;
            text-decoration:none;
          }
        `}</style>
      </ThemeProvider>
    </UserProvider>
  );
}
