import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { useRouter } from 'next/router';

interface LoginRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginRequestModal = (props: LoginRequestModalProps): JSX.Element => {
  const router = useRouter();
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <DialogContentText>
          登録者の情報を閲覧するためにはログインが必要です
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => router.push('/auth')}>ログイン</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginRequestModal;
