import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as firebase from 'firebase';

interface messageObj {
  message: string;
  sender: string;
}

const Message = (): JSX.Element => {
  const db = firebase.firestore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<messageObj[]>([]);

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
    <div>
      {messages.map((message, idx) => (
        <div key={idx}>{message.message}</div>
      ))}
    </div>
  );
};

export default Message;
