import React, { useState, useEffect } from 'react';
import { Header, ScrollTop } from './index';
import Router from '../routers/Router';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../api/firebase';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '360px',
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-text-size-adjust': '100%!important'
  }
});

const App = () => {
  const { container } = useStyles();
  const [ firebaseInit, setFirebaseInit ] = useState(false);

  useEffect(() => {
    Firebase.init();
    Firebase.isAutorization()
      .then(() => setFirebaseInit(true));
  }, []);

  return (
    <>
      {!firebaseInit ? null :
        <Container 
          disableGutters={ true } 
          maxWidth={ false } 
          className={ container }
        >
          {Firebase.getUser() && <Header />}
          <Router />
          <ScrollTop />
        </Container>
      }
    </>
  );
};

export default App;