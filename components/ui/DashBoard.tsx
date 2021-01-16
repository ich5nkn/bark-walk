import React, { useState, useEffect } from 'react';
import { UserData } from '../../utils/auth/userData';
import firebase from 'firebase/app';
import Link from 'next/link';
import {Avatar,Typography,Card,Grid} from '@material-ui/core'
import {format} from 'date-fns'

interface Props {
  user: UserData;
  logout: () => Promise<void>;
}

interface chatCardData {
  id:string
  icon:string
  name:string
  timestamp:Date
  message:string
  isSendMe:boolean
}

// TODO:
// マッチング結果のフェッチが完了するまではローディングを表示
// マッチングがなければ「まだ、やりとりはありません」
// マッチングがあればマッチング一覧を表示

const chatCard = (data:chatCardData):JSX.Element=>(
    <Link key={data.id} href={'/message/' + data.id}>
      <Card style={{padding:30,backgroundColor:'#F3F1F3', marginTop:20}}>
        <div style={{display:'flex'}}>
            <Avatar src={data.icon} style={{width:100,height:100,margin:10}}/>
          <div style={{marginLeft:30}}>
            <Typography variant="h4" component="h3">{data.name}</Typography>
            <Typography variant="h6" component="p" style={{marginTop:10, whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
              {(data.isSendMe ? '自分' : data.name) +' : '+ data.message}
            </Typography>
            <p>{format(data.timestamp,'yyyy年MM月dd日 HH:mm:ss')}</p>
          </div>
          
        </div>
      </Card>
    </Link>
)

const DashBoard: React.FC<Props> = ({ user, logout }) => {
  const [list, setList] = useState([]);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const sync = async () => {
      const db = firebase.firestore();
      const res = await db
        .collection('rooms')
        .where('ownerId', '==', user.uid)
        .get();
        setLoading(false)
        res.docs.forEach(async (doc) => {
          console.log(doc.data())
        const walkerId = doc.data().walkerId;
        const chats = await db.collection('rooms').doc(doc.id).collection('chats').orderBy('timestamp','desc').limit(1).get()
        const chat = chats.docs[0].data()
        const res = await db.collection('walkers').doc(walkerId).get();
        const walker = res.data()
        // TODO ディープコピーができていないのか、最後の１件しかlistに表示されない
        const addedList = list.map(item=>{return item})
        console.log('list',list)
        console.log('addedList',addedList)
        addedList.push(
          { 
            id: doc.id,
            name: walker.name,
            icon:walker.avaterPath,
            timestamp:chat.timestamp.toDate(),
            message:chat.message,
            isSendMe:chat.sender !== res.id
          }
        )
        console.log('addedList',addedList)
        setList(addedList);
        console.log(list)
      });
    };
    sync();
  }, []);

  return (
    <>
      <Typography variant="h3" component="h1" >ドッグウォーカー一覧</Typography>
      {loading ? 'loading...' : list.length > 0 ?
          list.map((item, idx) => chatCard(item)) : null}
    </>
  );
};

export default DashBoard;
