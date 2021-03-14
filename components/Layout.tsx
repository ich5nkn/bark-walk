import React from 'react';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';

interface Props {
  loading?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, loading }) => {
  // const useStyles = makeStyles(() => {});
  return (
    <Container maxWidth="md">
      <Navbar />
      {loading ? (
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
