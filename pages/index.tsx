import React from 'react';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
// import firebase from '../firebase/clientApp';
// import Button from '@material-ui/core/Button';
// import DefaultButton from '../components/ui/Button/DefaultButton';
import { Typography, Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import EventNoteIcon from '@material-ui/icons/EventNote';

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
  featureBullet: {
    color: '#5EAFC2',
    fontSize: 30,
    verticalAlign: 'middle',
    fontWeight: 'bold',
  },
  step: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  numberCircle: {
    height: 30,
    width: 30,
    borderRadius: '100%',
    backgroundColor: '#777',
    color: '#FFF',
    margin: '0 auto',
    lineHeight: '30px',
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
            <span className={classes.featureBullet}>・</span>
            厳正な審査を合格した信頼できるドッグウォーカーだけ
          </li>
          <li>
            <span className={classes.featureBullet}>・</span>
            ドッグウォーカーから毎日のお散歩レポートが届く
          </li>
          <li>
            <span className={classes.featureBullet}>・</span>
            もしもの時のための、２４時間電話サポート
          </li>
        </ul>
      </div>
      <div
        style={{
          backgroundColor: '#DDD',
          padding: '20px 0',
          textAlign: 'center',
        }}
      >
        <Typography color="primary" style={{ fontSize: 24, marginBottom: 10 }}>
          利用開始までのステップ
        </Typography>
        <Grid container style={{ textAlign: 'center' }}>
          <Grid item xs={12} md={4} className={classes.step}>
            <div className={classes.numberCircle}>1</div>
            <Typography variant="h6" component="h3" style={{ color: '#777' }}>
              ドッグウォーカーを探す
            </Typography>
            <SearchIcon style={{ width: 80, height: 80 }} />
            <Typography style={{ color: '#777' }}>
              ご近所にお住まいの
              <br />
              ドッグウォーカーを探します
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.step}>
            <div className={classes.numberCircle}>2</div>
            <Typography variant="h6" component="h3" style={{ color: '#777' }}>
              事前面談をする
            </Typography>
            <PeopleIcon style={{ width: 80, height: 80 }} />
            <Typography style={{ color: '#777' }}>
              気になるドッグウォーカーを見つけたら
              <br />
              直接面談します
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.step}>
            <div className={classes.numberCircle}>3</div>
            <Typography variant="h6" component="h3" style={{ color: '#777' }}>
              予約を入れる
            </Typography>
            <EventNoteIcon style={{ width: 80, height: 80 }} />
            <Typography style={{ color: '#777' }}>
              ドッグウォーカーのスケジュールを
              <br />
              確認して予約します
            </Typography>
          </Grid>
        </Grid>
      </div>

      <div style={{ minWidth: 800 }}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <Card style={{ backgroundColor: '#DDD' }}>
              <div style={{ height: 150, backgroundColor: '#857' }}></div>
              <div style={{ height: 250, textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  component="h3"
                  style={{ marginTop: 15 }}
                >
                  {'Title'}
                </Typography>
                <Typography style={{ marginTop: 10 }}>{'text'}</Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* <Grid item xs={12} md={4}>
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
            <PeopleIcon />
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
            <EventNoteIcon />
            ドッグウォーカーのスケジュールを確認して予約します
          </Grid> */}
    </>
  );
}
