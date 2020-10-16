import React from 'react';
import Button from '@material-ui/core/Button';

const DefaultButton = ({ children,onClick=() => {} }) => {
  return (
    <Button variant="contained" color="primary" style={{ color: '#FFF' }} onClick={onClick}>
      {children}
    </Button>
  );
};

export default DefaultButton;
