import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as firebase from 'firebase';
import Layout from '../../components/Layout';
import { useUser } from '../../context/userContext';
import { makeStyles } from '@material-ui/core';

interface messageObj {
  message: string;
  sender: string;
}

const useStyles = makeStyles(() => ({
  chatLeft: {
    position: 'relative',
    display: 'inline-block',
    margin: '1.5em 0 1.5em 15px',
    padding: '7px 10px',
    minWidth: '120px',
    maxWidth: '100%',
    color: '#555',
    fontSize: '16px',
    background: '#FFF',
    border: 'solid 3px #555',
    boxSizing: 'border-box',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-24px',
      marginTop: '-12px',
      border: '12px solid transparent',
      borderRight: '12px solid #FFF',
      zIndex: '2',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-30px',
      marginTop: '-14px',
      border: '14px solid transparent',
      borderRight: '14px solid #555',
      zIndex: '1',
    },
  },
  chatRight: {
    position: 'relative',
    display: 'inline-block',
    margin: '1.5em 15px 1.5em 0',
    left: '100%',
    transform: 'translateX(-100%)',
    padding: '7px 10px',
    minWidth: '120px',
    maxWidth: '100%',
    color: '#555',
    fontSize: '16px',
    background: '#FFF',
    border: 'solid 3px #555',
    boxSizing: 'border-box',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: '-24px',
      marginTop: '-12px',
      border: '12px solid transparent',
      borderLeft: '12px solid #FFF',
      zIndex: '2',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: '-30px',
      marginTop: '-14px',
      border: '14px solid transparent',
      borderLeft: '14px solid #555',
      zIndex: '1',
    },
  },
}));

const Message = (): JSX.Element => {
  const db = firebase.firestore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<messageObj[]>([]);
  const { user } = useUser();
  const classes = useStyles();

  useEffect(() => {
    if (router.asPath !== router.route) {
      const roomId =
        typeof router.query.roomId === 'string' ? router.query.roomId : 'error';
      const getChat = async () => {
        const messagesTemp = [];
        const docRef = db.collection('rooms').doc(roomId).collection('chats');
        const doc = await docRef.get();
        doc.docs.forEach((doc) => {
          const message = doc.data();
          messagesTemp.push({
            message: message.message,
            sender: message.sender,
          });
        });
        setMessages(messagesTemp);
        setLoading(false);
      };
      getChat();
    }
  }, [router]);

  return (
    <Layout loading={loading}>
      {messages.map((message, idx) => (
        <div key={idx}>
          <div
            className={
              user.uid == message.sender ? classes.chatRight : classes.chatLeft
            }
          >
            {message.message}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Message;
