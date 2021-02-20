import React from 'react';
import Button from '@material-ui/core/Button';
import { ButtonProps } from '@material-ui/core';

interface DefaultButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      style={{ color: '#FFF' }}
      data-testid="defaultButton"
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
