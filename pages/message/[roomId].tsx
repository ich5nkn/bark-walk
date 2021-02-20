import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as firebase from 'firebase';
import Layout from '../../components/Layout';
import { makeStyles, TextField } from '@material-ui/core';
import DefaultButton from '../../components/Button/DefaultButton';
import SendIcon from '@material-ui/icons/Send';

interface messageObj {
  message: string;
  sender: string;
}

// TODO : chatの見た目を作る
const useStyles = makeStyles(() => ({
  rightChat: { color: 'red' },
  leftChat: { color: 'blue' },
}));

const Message = (): JSX.Element => {
  const db = firebase.firestore();
  const classes = useStyles();
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

  // TODO : メッセージを送信する処理
  const sendMessage = () => {
    console.log('メッセージ送信 : ' + inputMessage);
  };

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Layout>
      <div style={{ margin: '0 20px' }}>
        <div>
          <TextField
            style={{ width: 'calc(100% - 110px)', marginRight: 20 }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="メッセージを入力"
          />
          <DefaultButton onClick={sendMessage} endIcon={<SendIcon />}>
            送信
          </DefaultButton>
        </div>
        <div style={{ marginTop: 20 }}>
          {messages.map((message, idx) => {
            if (message.sender === '57q3qK3oNchoBeGic15I') {
              return (
                <div key={idx} className={classes.leftChat}>
                  {message.message}
                </div>
              );
            }
            return (
              <div key={idx} className={classes.rightChat}>
                {message.message}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Message;
