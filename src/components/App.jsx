import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Home, Favorites, Planner, Login, Recipe, NotFound } from './index';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
});

const App = () => {
  const { container } = useStyles();

  return (
    <Container disableGutters={ true } maxWidth={ false } className={ container }>
      <Header />
      <Switch>
        <Route exact path='/' render={ () => <Home /> } />
        <Route path='/favotites' render={ () => <Favorites /> } />
        <Route path='/planner' render={ () => <Planner /> } />
        <Route path='/login' render={ () => <Login /> } />
        <Route path='/recipes/:id' render={ () => <Recipe /> } />
        <Route path='*' render={ () => <NotFound /> } />
      </Switch>
    </Container>
  );
};

export default App;