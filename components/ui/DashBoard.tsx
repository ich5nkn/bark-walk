import React, { useState, useEffect } from 'react';
import { UserData } from '../../utils/auth/userData';
import firebase from 'firebase/app';
import Link from 'next/link';
import { Avatar, Typography, Card } from '@material-ui/core';
import { format } from 'date-fns';

interface Props {
  user: UserData;
  logout?: () => Promise<void>;
}

interface chatCardData {
  id: string;
  icon: string;
  name: string;
  timestamp: Date;
  message: string;
  isSendMe: boolean;
}

// TODO:
// スマホの見た目を作る
// チャットルームの中身（チャット機能の画面）を作る

const chatCard = (data: chatCardData): JSX.Element => (
  <Link key={data.id} href={'/message/' + data.id}>
    <Card style={{ padding: 30, backgroundColor: '#F3F1F3', marginTop: 20 }}>
      <div style={{ display: 'flex' }}>
        <Avatar
          src={data.icon}
          style={{ width: 100, height: 100, margin: 10 }}
        />
        <div style={{ marginLeft: 30 }}>
          <Typography variant="h4" component="h3">
            {data.name}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            style={{
              marginTop: 10,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {(data.isSendMe ? '自分' : data.name) + ' : ' + data.message}
          </Typography>
          <p>{format(data.timestamp, 'yyyy年MM月dd日 HH:mm:ss')}</p>
        </div>
      </div>
    </Card>
  </Link>
);

const DashBoard: React.FC<Props> = ({ user }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = firebase.firestore();
    const getChatList = async () => {
      // チャットルームのドキュメントIDを取得
      const res = await db
        .collection('rooms')
        .where('ownerId', '==', user.uid)
        .get();
      const newList = [];
      await Promise.all(
        res.docs.map(async (doc) => {
          // チャットルームのwalkerIdを取得
          const walkerId = doc.data().walkerId;
          // チャットルームの中の一番最新のチャットを取得
          const chats = await db
            .collection('rooms')
            .doc(doc.id)
            .collection('chats')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();
          const chat = chats.docs[0].data();
          // ウォーカーの情報を取得
          const res = await db.collection('walkers').doc(walkerId).get();
          const walker = res.data();
          // チャットルームの概要情報を格納
          newList.push({
            id: doc.id,
            name: walker.name,
            icon: walker.avaterPath,
            timestamp: chat.timestamp.toDate(),
            message: chat.message,
            isSendMe: chat.sender !== res.id,
          });
        })
      );
      const dateSort = (a, b) => {
        const result =
          new Date(a.timestamp).getTime() < new Date(b.timestamp).getTime();
        return result ? 1 : -1;
      };
      newList.sort(dateSort);
      setList(newList);
    };
    getChatList();
    setLoading(false);
    const createSnapshot = async () => {
      const res = await db
        .collection('rooms')
        .where('ownerId', '==', user.uid)
        .get();
      res.docs.forEach((doc) => {
        db.collection('rooms')
          .doc(doc.id)
          .collection('chats')
          .onSnapshot(() => getChatList());
      });
    };
    createSnapshot();

    // アンマウント時にfirestoreの購読を解除する
    return () => {
      createSnapshot();
    };
  }, []);

  return (
    <>
      <Typography variant="h3" component="h1">
        ドッグウォーカー一覧
      </Typography>
      {loading
        ? 'loading...'
        : list.length > 0
        ? list.map((item) => chatCard(item))
        : 'ドッグウォーカーとのやり取りはまだありません'}
    </>
  );
};

export default DashBoard;
