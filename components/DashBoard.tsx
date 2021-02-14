import React, { useState, useEffect } from 'react';
import { User } from '../model/user';
import firebase from 'firebase/app';
import Link from 'next/link';

interface Props {
  user: User;
  logout: () => Promise<void>;
}

// TODO:
// マッチング結果のフェッチが完了するまではローディングを表示
// マッチングがなければ「まだ、やりとりはありません」
// マッチングがあればマッチング一覧を表示

const DashBoard: React.FC<Props> = ({ user, logout }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const sync = async () => {
      const db = firebase.firestore();
      const res = await db
        .collection('rooms')
        .where('ownerId', '==', user.uid)
        .get();
      res.forEach(async (doc) => {
        const walkerId = doc.data().walkerId;
        const res = await db.collection('walkers').doc(walkerId).get();
        setList([{ id: doc.id, name: res.data().name }]);
      });
    };
    sync();
  }, []);

  return (
    <>
      {list.length > 0 ? (
        <ul>
          {list.map((data, idx) => (
            <Link key={idx} href={'/message/' + data.id}>
              <li>{data.name}</li>
            </Link>
          ))}
        </ul>
      ) : null}
      <button onClick={logout}></button>
    </>
  );
};

export default DashBoard;
