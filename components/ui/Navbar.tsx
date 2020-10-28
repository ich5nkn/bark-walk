import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useUser } from '../../utils/auth/useUser';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ログイン判定
  const { user, logout } = useUser();
  const router = useRouter();

  return (
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
          <MenuItem onClick={handleClose}>ドッグウォーカーを探す</MenuItem>
          <MenuItem onClick={handleClose}>ドッグウォーカーになる</MenuItem>
          <MenuItem onClick={handleClose}>サービスについて</MenuItem>
          <MenuItem onClick={handleClose}>会員登録</MenuItem>
        </Menu>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/">
            <a>Bark Walk</a>
          </Link>
        </Typography>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => router.push('/auth')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
