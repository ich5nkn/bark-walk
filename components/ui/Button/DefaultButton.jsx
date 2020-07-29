import React from 'react';
import Button from '@material-ui/core/Button';

const DefaultButton = ({ children }) => {
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  );
};

export default DefaultButton;
