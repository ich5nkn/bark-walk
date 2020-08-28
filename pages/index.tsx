import React from 'react';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
// import firebase from '../firebase/clientApp';
import Button from '@material-ui/core/Button';
import DefaultButton from '../components/ui/Button/DefaultButton';
import { Typography } from '@material-ui/core';

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user);
    }
  }, [loadingUser, user]);

  // Firebase接続確認用のテストコード
  // const pushData = () => {
  //   const db = firebase.firestore();
  //   db.collection('walkers').add({
  //     name: '山田 花子',
  //     breedingYear: 12,
  //   });
  // };

  return (
    // staticファイルが正常に読み込めないのはなぜ？
    <div
      style={{
        height: '300px',
        background: "url('/hero.jpg') no-repeat center center",
        backgroundSize: 'cover',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        style={{
          color: 'white',
          padding: '40px 20px 0px',
          textShadow: '1px 1px black',
        }}
      >
        ドッグウォーカーがあなたの愛犬の散歩をします
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: 'white',
          padding: '20px',
          textShadow: '1px 1px black',
        }}
      >
        お仕事で忙しい、用事があって散歩に連れて行ってあげられない。そんな時でも、ドッグウォーカーがあなたの愛犬を散歩に連れて行ってくれます。
      </Typography>

      {/* TODO: 不要なので後ほど削除する */}
      {/* <Button
        variant="contained"
        color="primary"
        // onClick={()=>{alert('pushed')}}
      >
        PUSH!!
      </Button>
      <Button variant="outlined" disabled style={{}}>
        Disabled
      </Button>
      <DefaultButton>test</DefaultButton> */}
    </div>
  );
}
