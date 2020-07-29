import React from 'react';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
// import firebase from '../firebase/clientApp';
import Button from '@material-ui/core/Button';
import DefaultButton from '../components/ui/Button/DefaultButton';

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
    <div>
      <h1>TITLE</h1>
      <Button
        variant="contained"
        color="primary"
        // onClick={()=>{alert('pushed')}}
      >
        PUSH!!
      </Button>
      <Button variant="outlined" disabled style={{}}>
        Disabled
      </Button>
      <DefaultButton>test</DefaultButton>
    </div>
  );
}
