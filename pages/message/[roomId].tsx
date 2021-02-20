import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as firebase from 'firebase';
import Layout from '../../components/Layout';
import { TextField } from '@material-ui/core';
import DefaultButton from '../../components/Button/DefaultButton';
import SendIcon from '@material-ui/icons/Send';

interface messageObj {
  message: string;
  sender: string;
}

const Message = (): JSX.Element => {
  const db = firebase.firestore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<messageObj[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

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

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Layout>
      <TextField
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="メッセージを入力"
      />
      <DefaultButton
        onClick={() => {
          console.log('送信');
        }}
        endIcon={<SendIcon />}
      >
        送信
      </DefaultButton>
      {messages.map((message, idx) => (
        <div key={idx}>{message.message}</div>
      ))}
    </Layout>
  );
};

export default Message;
