import React from 'react';
import { useEffect } from 'react';
import { useUser } from '../../context/userContext';
// import firebase from '../firebase/clientApp';
// import Button from '@material-ui/core/Button';
import DefaultButton from '../../components/ui/Button/DefaultButton';
import { Typography, Grid, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

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

export default function Login() {
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
    <>
      <TextField variant="outlined" />
    </>
  );
}
