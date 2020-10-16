import React from 'react';
import Button from '@material-ui/core/Button';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const DefaultButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ color: '#FFF' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
