/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Grid,Select,FormControl,InputLabel,Typography,Paper } from '@material-ui/core';
import Layout from '../../components/ui/Layout';
import DatePickerJP from '../../components/ui/DatePickerJP';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const Search: React.FC = () => {
  const [place, setPlace] = useState('東京都');
  const [list, setList] = useState([]);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(new Date());

  // const data = [
  //   {place:'東京都',name:'山田'},
  //   {place:'東京都',name:'田中'},
  //   {place:'東京都',name:'森山'},
  //   {place:'大阪府',name:'佐藤'},
  //   {place:'大阪府',name:'広瀬'},
  //   {place:'大阪府',name:'南'},
  //   {place:'福岡県',name:'本田'},
  //   {place:'福岡県',name:'斎藤'},
  //   {place:'福岡県',name:'田島'},
  // ]

  // const json = [
  //   {
  //     place: '東京都',
  //     date: new Date('2020-10-10'),
  //     name: '山田',
  //     star: 3.5,
  //     ownerId: 'LSDF10SJHG0A2DDF',
  //   },
  //   {
  //     place: '東京都',
  //     date: new Date('2020-10-10'),
  //     name: '山田',
  //     star: 3.5,
  //     ownerId: 'LSDF10SJHG0A2DDF',
  //   },
  //   {
  //     place: '東京都',
  //     date: new Date('2020-10-10'),
  //     name: '山田',
  //     star: 3.5,
  //     ownerId: 'LSDF10SJHG0A2DDF',
  //   },
  //   {
  //     place: '東京都',
  //     date: new Date('2020-10-10'),
  //     name: '山田',
  //     star: 3.5,
  //     ownerId: 'LSDF10SJHG0A2DDF',
  //   },
  //   {
  //     place: '東京都',
  //     date: new Date('2020-10-10'),
  //     name: '山田',
  //     star: 3.5,
  //     ownerId: 'LSDF10SJHG0A2DDF',
  //   },
  //   {
  //     place: '東京都',
  //     date: new Date('2020-10-10'),
  //     name: '山田',
  //     star: 3.5,
  //     ownerId: 'LSDF10SJHG0A2DDF',
  //   },
  // ];

  useEffect(() => {
    // firabaseからデータを取得
    const fetchedData = async () => {
      const db = firebase.firestore();
      const res = await db.collection('walkers').get();
      const data = [];
      res.forEach((doc) => {
        data.push(doc.data());
      });

      // placeに合致するデータのみ取得
      const filterdData = data.filter((item) => {
        return item.place === place;
      });
      const mapedData = filterdData.map((item) => {
        return item.name;
      });
      setList(mapedData);
    };
    fetchedData();
  }, [place]);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={6} style={{padding:'20px 10px'}}>
        <DatePickerJP
          label="日付選択"
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
          future
        />
        </Grid>
        <Grid item xs={6}style={{padding:'20px 10px'}}>
          <FormControl
            variant="outlined"
            fullWidth
          >
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
        <div style={{backgroundColor:'#DDD',width:'100%',padding:10}}>
          <Typography
            variant="subtitle1"
            component="h3"
          >
            検索結果一覧
          </Typography>
        </div>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Paper style={{margin:'10px auto', width:'95%', backgroundColor:'#F3F1F3'}}>
              aaa
            </Paper>
          </Grid>
        </Grid>
      <p>{list}</p>
      </Grid>
    </Layout>
  );
};

export default Search;
