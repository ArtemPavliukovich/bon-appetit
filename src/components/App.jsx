import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header, Home, Favorites, Planner, Login, Recipe, NotFound } from './index';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../api/firebase';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
});

const App = () => {
  const { container } = useStyles();
  const [ user, setUser ] = useState(undefined);
  const isDisplay = useRef(false);

  useEffect(() => {
    Firebase.init();
    Firebase.isAutorization()
      .then(() => {
        isDisplay.current = true;
        setUser(Firebase.getUser());
      });
  }, []);

  return (
    <>
      {!isDisplay.current ? null :
        <Container 
          disableGutters={ true } 
          maxWidth={ false } 
          className={ container }
        >
          {user ? <Header /> : null}
          {user 
            ? <Switch>
                <Route exact path='/' render={ () => <Home /> } />
                <Route path='/favorites' render={ () => <Favorites /> } />
                <Route path='/planner' render={ () => <Planner /> } />
                <Route path='/recipes/:id' render={ () => <Recipe /> } />
                <Route path='*' render={ () => <NotFound /> } />
              </Switch> 
            : <Switch>
                <Route exact path='/' render={ () => <Login /> } />
                <Redirect from='*' to='/' />
              </Switch>
          }
        </Container>
      }
    </>
    );
};

export default App;