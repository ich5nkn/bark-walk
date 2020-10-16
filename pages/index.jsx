import React from 'react';
// import useSWR from 'swr';
// import { useEffect } from 'react';
import { useUser } from '../utils/auth/useUser'
import Welcome from './welcome';
// import firebase from '../firebase/clientApp';
// import Button from '@material-ui/core/Button';
// import DefaultButton from '../components/ui/Button/DefaultButton';
// import { Typography, Grid, Card } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import PeopleIcon from '@material-ui/icons/People';
// import EventNoteIcon from '@material-ui/icons/EventNote';
// import { useRouter } from 'next/router'



export default function Home() {
  const {user, logout} = useUser();
  if(user){
    return(
      <>
        <div>{user.uid}</div>
        <button onClick={logout}></button>
      </>
    )
  }
  return (
    <Welcome />
  );
}
