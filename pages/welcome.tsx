import React from 'react';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DefaultButton from '../components/ui/Button/DefaultButton';
import { Typography, Grid, Card } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '../components/ui/Layout';

const useStyles = makeStyles(() => ({
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

const ReviewCard = (title: string, text: string, image?: string) => {
  return (
    <div style={{ display: 'inline-block', padding: 10 }}>
      <Card style={{ width: 260, backgroundColor: '#DDD' }}>
        <div
          style={
            image
              ? { height: 180, background: 'url(/' + image + ')' }
              : { height: 180, backgroundColor: '#857' }
          }
        ></div>
        <div style={{ height: '280px', textAlign: 'center' }}>
          <Typography variant="h5" component="h3" style={{ margin: '30px 0' }}>
            {title}
          </Typography>
          <Typography style={{ padding: '0 20px', whiteSpace: 'normal' }}>
            {text}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

const reviewItems = [
  {
    title: '佐藤さん',
    text:
      '仕事で忙しくて毎日なかなか構ってあげられませんでしたが、Bark Walkで信頼できるドッグウォーカーを見つけることができ、日中は毎日散歩をしてもらっています',
    image: 'sato.png',
  },
  {
    title: '山口さん',
    text:
      '出張や残業が多く、ワンちゃんには寂しい思いをさせることが多かったのですが、ドッグウォーカーさんに依頼するようになってから、ワンちゃんの日中の遊び相手が出来てイキイキするようになりました！',
    image: 'yamaguchi.png',
  },
  {
    title: '田中さん',
    text:
      'いつもBark Walkを利用しています。24時間サポートのおかげで、安心してサービスを利用することができています。大切な愛犬を心配なく預けることができています。',
    image: 'tanaka.png',
  },
];

const Welcome: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Layout>
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
        <DefaultButton onClick={() => router.push('/search/')}>
          ご近所のドッグウォーカーを検索する
        </DefaultButton>
      </div>

      <div
        style={{
          padding: '20px 0',
          textAlign: 'center',
        }}
      >
        <Typography color="primary" style={{ fontSize: 24, marginBottom: 10 }}>
          実際に利用されている方々の声
        </Typography>
        <div
          style={{
            overflowX: 'auto',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            whiteSpace: 'nowrap',
          }}
        >
          {reviewItems.map((item) => {
            return ReviewCard(item.title, item.text, item.image);
          })}
        </div>
      </div>
      <div
        style={{
          padding: '20px 0',
          textAlign: 'center',
        }}
      >
        <Typography color="primary" style={{ fontSize: 24, marginBottom: 10 }}>
          ドッグウォーカーになる
        </Typography>
        <Typography style={{ marginBottom: 20 }}>
          犬が大好きで、ペット飼育経験のある方、
          <br />
          犬と関わることを仕事にしたい方。
          <br />
          まずは会員登録してドッグウォーカーになるためのステップを確認しましょう！
        </Typography>
        <DefaultButton
          onClick={() => {
            router.push('/auth');
          }}
        >
          会員登録する
        </DefaultButton>
      </div>
    </Layout>
  );
};

export default Welcome;
