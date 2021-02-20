/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Avatar,
  Chip,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import DatePickerJP from '../../components/DatePickerJP';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
// import {storage} from '../../firebase/clientApp';
import LoginRequestModal from '../../components/LoginRequestModal';
import { useUser } from '../../context/userContext';
import { useRouter } from 'next/router';
import { Walker } from '../../model/walker';

const Search: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [place, setPlace] = useState('東京都');
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    new Date()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<Walker[]>([]);
  const [LoginRequestOpen, setLoginRequestOpen] = useState<boolean>(false);

  useEffect(() => {
    // firabaseからデータを取得
    const fetchedData = async () => {
      setLoading(true);
      const db = firebase.firestore();
      const res = await db
        .collection('walkers')
        .where('place', '==', place)
        .get();
      const data = [];
      console.log('res : ', res);
      console.log('res[0] : ', res[0]);
      res.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setList(data);
    };
    fetchedData();
  }, [place, selectedDate]);

  useEffect(() => {
    console.log(list);
    setLoading(false);
  }, [list]);

  const goDetail = (id: string): void => {
    if (user) {
      router.push('/detail/' + id);
    } else {
      setLoginRequestOpen(true);
    }
  };

  const walkerCard = (walker: Walker): JSX.Element => {
    const defaultHeader =
      'url(https://firebasestorage.googleapis.com/v0/b/bark-wark.appspot.com/o/mitte102520950_TP_V.jpg?alt=media&token=3b564cf2-e952-412b-9d1f-bf1bb6d6856b)';
    return (
      <Paper
        style={{
          margin: '10px auto',
          width: '100%',
          backgroundColor: '#F3F1F3',
        }}
        onClick={() => goDetail(walker.id)}
      >
        <Grid container>
          <Grid
            item
            style={{
              height: 125,
              width: '100%',
              backgroundImage: walker.headerPath
                ? 'url(' + walker.headerPath + ')'
                : defaultHeader,
              backgroundSize: 'cover',
            }}
          >
            <Avatar
              style={{ width: 75, height: 75, margin: 25, marginLeft: 10 }}
              src={walker.avaterPath ? walker.avaterPath : ''}
            />
          </Grid>
          <Grid item style={{ width: '100%', margin: 20 }}>
            <Typography variant="h5">{walker.name}</Typography>
            {walker.tags ? (
              <Grid container style={{ marginTop: 10 }}>
                {walker.tags.map((tag, idx) => (
                  <Grid item key={idx}>
                    <Chip
                      label={tag}
                      color="primary"
                      size="small"
                      variant="outlined"
                      style={{ margin: 5 }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : undefined}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <Layout loading={loading}>
      <Grid container>
        <Grid item xs={6} style={{ padding: '20px 10px' }}>
          <DatePickerJP
            label="日付選択"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            future
          />
        </Grid>
        <Grid item xs={6} style={{ padding: '20px 10px' }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>都道府県</InputLabel>
            <Select
              native
              value={place}
              onChange={(e) => setPlace(e.target.value as string)}
              label="都道府県"
            >
              <option value={'東京都'}>東京都</option>
              <option value={'大阪府'}>大阪府</option>
              <option value={'福岡県'}>福岡県</option>
            </Select>
          </FormControl>
        </Grid>
        <div style={{ backgroundColor: '#DDD', width: '100%', padding: 10 }}>
          <Typography variant="subtitle1" component="h3">
            検索結果一覧
          </Typography>
        </div>
        <Grid item container spacing={2}>
          {list.length === 0 ? (
            <div style={{ marginTop: 30 }}>
              条件に一致するドッグウォーカーはみつかりませんでした
            </div>
          ) : (
            list.map((walker, idx) => (
              <Grid item key={idx} xs={12} md={6}>
                {walkerCard(walker)}
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <LoginRequestModal
        open={LoginRequestOpen}
        onClose={() => {
          setLoginRequestOpen(false);
        }}
      />
    </Layout>
  );
};

export default Search;
