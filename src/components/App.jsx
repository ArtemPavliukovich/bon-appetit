import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header, Home, Favorites, Planner, Login, Recipe, NotFound, ScrollTop } from './index';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../api/firebase';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '360px',
    '-webkit-tap-highlight-color': 'transparent'
  }
});

const App = () => {
  const { container } = useStyles();
  const [ user, setUser ] = useState({
    user: null,
    isDisplay: false
  });

  useEffect(() => {
    Firebase.init();
    Firebase.isAutorization()
      .then(() => {
        setUser({
          user: Firebase.getUser(),
          isDisplay: true
        });
      });
  }, []);

  return (
    <>
      {!user.isDisplay ? null :
        <Container 
          disableGutters={ true } 
          maxWidth={ false } 
          className={ container }
        >
          {user.user ? <Header /> : null}
          {user.user 
            ? <Switch>
                <Route exact path='/' render={ () => <Home /> } />
                <Route path='/favorites' render={ () => <Favorites /> } />
                <Route path='/planner' render={ () => <Planner /> } />
                <Route path='/recipes/:id' render={ () => <Recipe /> } />
                <Redirect from='/autorization' to='/' />
                <Route path='*' render={ () => <NotFound /> } />
              </Switch> 
            : <Switch>
                <Route exact path='/autorization' render={ () => <Login /> } />
                <Redirect from='*' to='/autorization' />
              </Switch>
          }
          <ScrollTop />
        </Container>
      }
    </>
  );
};

export default App;