import React from 'react';
import Button from '@material-ui/core/Button';

const DefaultButton = ({ children }) => {
  return (
    <Button variant="contained" color="primary" style={{ color: '#FFF' }}>
      {children}
    </Button>
  );
};

export default DefaultButton;
