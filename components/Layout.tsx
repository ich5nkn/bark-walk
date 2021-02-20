import React from 'react';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
import { useUser } from '../context/userContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  // const useStyles = makeStyles(() => {});
  const { loadingUser } = useUser();
  return (
    <Container maxWidth="md">
      <Navbar />
      {loadingUser ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <div style={{ marginTop: 80 }}>{children}</div>
      )}
    </Container>
  );
};

export default Layout;
