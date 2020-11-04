import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: 56 }}>{children}</div>
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
