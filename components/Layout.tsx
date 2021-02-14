import React from 'react';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/core';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  // const useStyles = makeStyles(() => {});
  return (
    <>
      <Container maxWidth="md">
        <Navbar />
        <div style={{ marginTop: 80 }}>{children}</div>
      </Container>
    </>
  );
};

export default Layout;
