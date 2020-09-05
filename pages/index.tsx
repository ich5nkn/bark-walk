import React from 'react';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
// import firebase from '../firebase/clientApp';
// import Button from '@material-ui/core/Button';
// import DefaultButton from '../components/ui/Button/DefaultButton';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  block1: {
    height: '300px',
    background: "url('/hero.jpg') no-repeat center center",
    backgroundSize: 'cover',
  },
  block1Title: {
    color: 'white',
    padding: '40px 20px 0px',
    textShadow: '1px 1px black',
  },
  block1Text: {
    color: 'white',
    padding: '20px',
    textShadow: '1px 1px black',
  },
}));

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const classes = useStyles();

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
    <>
      <div className={classes.block1}>
        <Typography variant="h4" component="h1" className={classes.block1Title}>
          ドッグウォーカーがあなたの愛犬の散歩をします
        </Typography>
        <Typography className={classes.block1Text} variant="body1">
          お仕事で忙しい、用事があって散歩に連れて行ってあげられない。そんな時でも、ドッグウォーカーがあなたの愛犬を散歩に連れて行ってくれます。
        </Typography>
      </div>
      <div style={{ margin: '20px 20px 0' }}>
        <Typography color="primary" style={{ fontSize: 24 }}>
          BARK WALKの特徴
        </Typography>
        <Typography style={{ color: '#777' }}>
          あなたの愛犬を大切にお預かりするために、Bark
          Walkでは下記の点を十分に考慮しております
          <br />
          安心してご利用いただけるよう努めています
        </Typography>
        <ul style={{ listStyle: 'none', paddingLeft: 0, color: '#555' }}>
          <li>
            <span
              style={{
                color: '#5EAFC2',
                fontSize: 30,
                verticalAlign: 'middle',
                fontWeight: 'bold',
              }}
            >
              ・
            </span>
            厳正な審査を合格した信頼できるドッグウォーカーだけ
          </li>
          <li>
            <span
              style={{
                color: '#5EAFC2',
                fontSize: 30,
                verticalAlign: 'middle',
                fontWeight: 'bold',
              }}
            >
              ・
            </span>
            ドッグウォーカーから毎日のお散歩レポートが届く
          </li>
          <li>
            <span
              style={{
                color: '#5EAFC2',
                fontSize: 30,
                verticalAlign: 'middle',
                fontWeight: 'bold',
              }}
            >
              ・
            </span>
            もしもの時のための、２４時間電話サポート
          </li>
        </ul>
      </div>
      <div style={{ backgroundColor: '#DDD' }}>
        <div style={{ margin: '20px 20px 0', textAlign: 'center' }}>
          <Typography color="primary" style={{ fontSize: 24 }}>
            利用開始までのステップ
          </Typography>
          <Grid container style={{ textAlign: 'center' }}>
            <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
              <div
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: '100%',
                  backgroundColor: '#777',
                  color: '#FFF',
                  margin: '0 auto',
                }}
              >
                1
              </div>
              <Typography style={{ color: '#777' }}>
                ドッグウォーカーを探す
              </Typography>
              <SearchIcon />
              ご近所にお住まいのドッグウォーカーを探します
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: '100%',
                  backgroundColor: '#777',
                  color: '#FFF',
                  margin: '0 auto',
                }}
              >
                2
              </div>
              <Typography style={{ color: '#777' }}>事前面談をする</Typography>
              気になるドッグウォーカーを見つけたら直接面談します
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: '100%',
                  backgroundColor: '#777',
                  color: '#FFF',
                  margin: '0 auto',
                }}
              >
                3
              </div>
              <Typography style={{ color: '#777' }}>予約を入れる</Typography>
              ドッグウォーカーのスケジュールを確認して予約します
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
