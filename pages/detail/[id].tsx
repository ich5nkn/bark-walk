import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/ui/Layout';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Button,
} from '@material-ui/core';
import { StaticDatePickerJP } from '../../components/ui/DatePickerJP';

const Detail = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (router.asPath !== router.route) {
      console.log(router.query.id);
      setLoading(false);
    }
  }, [router]);

  return (
    <Layout>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Typography>
            私は2014年からゴールデンレトリーバーと過ごしています。
            大型犬の扱いもお任せください。
            大型犬もらくらく入る大型車を所有していますので、自宅まで送迎します。
            お散歩は１日１時間、お食事は指定がなければ１日２回イヌイヌ製造のドッグフードを与えます。
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <section>
            <Typography
              variant="h4"
              component="h3"
              style={{ textAlign: 'center' }}
            >
              料金表
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>メニュー</TableCell>
                  <TableCell>単位</TableCell>
                  <TableCell>金額</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>散歩</TableCell>
                  <TableCell>１時間</TableCell>
                  <TableCell>2,000円</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>お預かり</TableCell>
                  <TableCell>１日</TableCell>
                  <TableCell>20,000円</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>車での送迎</TableCell>
                  <TableCell>１往復</TableCell>
                  <TableCell>
                    1,000円〜
                    <br />
                    距離に応じて
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => console.log('clicked')}
            style={{ margin: '30px auto', display: 'block' }}
          >
            チャットで依頼する
          </Button>
          <StaticDatePickerJP
            value={new Date()}
            onChange={() => {
              console.log('change');
            }}
          />
        </div>
      )}
    </Layout>
  );
};

export default Detail;
