import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
// import Layout from '../../components/ui/Layout';

// interface DetailProps {
//   id: string;
// }

const Detail = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
  }, []);

  return <div style={{ marginTop: 50 }}>表示</div>;
};

export default Detail;
