import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Planner from './Planner';
import Favorites from './Favorites';
import Analyzer from './Analyzer';
import Login from './Login';
import NotFound from './NotFound';
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
    <Container disableGutters={ true } maxWidth="xl" className={ container }>
      <Header />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/favotites' component={ Favorites } />
        <Route path='/planner' component={ Planner } />
        <Route path='/analyzer' component={ Analyzer } />
        <Route path='/login' component={ Login } />
        <Route path='*' component={ NotFound } />
      </Switch>
    </Container>
  );
};

export default App;