/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Select } from '@material-ui/core';
import Layout from '../../components/ui/Layout';
import DatePickerJP from '../../components/ui/DatePickerJP';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const Search: React.FC = () => {
  const [place, setPlace] = useState('東京都');
  const [list, setList] = useState([]);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    new Date()
  );

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

  const json = [
    {
      place: '東京都',
      date: new Date('2020-10-10'),
      name: '山田',
      star: 3.5,
      ownerId: 'LSDF10SJHG0A2DDF',
    },
    {
      place: '東京都',
      date: new Date('2020-10-10'),
      name: '山田',
      star: 3.5,
      ownerId: 'LSDF10SJHG0A2DDF',
    },
    {
      place: '東京都',
      date: new Date('2020-10-10'),
      name: '山田',
      star: 3.5,
      ownerId: 'LSDF10SJHG0A2DDF',
    },
    {
      place: '東京都',
      date: new Date('2020-10-10'),
      name: '山田',
      star: 3.5,
      ownerId: 'LSDF10SJHG0A2DDF',
    },
    {
      place: '東京都',
      date: new Date('2020-10-10'),
      name: '山田',
      star: 3.5,
      ownerId: 'LSDF10SJHG0A2DDF',
    },
    {
      place: '東京都',
      date: new Date('2020-10-10'),
      name: '山田',
      star: 3.5,
      ownerId: 'LSDF10SJHG0A2DDF',
    },
  ];

  useEffect(() => {
    // firabaseからデータを取得
    const fetchedData = async () => {
      const db = firebase.firestore();

      // document取得
      // const doc = await db.collection("users").doc(
      //   "kzibAOH4Vc3goeS386BA"
      //   ).get();
      // console.log(doc.data());
      // console.log("Fetch Clicked");

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
      <DatePickerJP
        label="日付選択"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <Select
        native
        variant="outlined"
        value={place}
        onChange={(e) => setPlace(e.target.value as string)}
      >
        <option value={'東京都'}>東京都</option>
        <option value={'大阪府'}>大阪府</option>
        <option value={'福岡県'}>福岡県</option>
      </Select>
      <p>{list}</p>
    </Layout>
  );
};

export default Search;
