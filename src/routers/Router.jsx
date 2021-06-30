import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Home, Favorites, Planner, Login, Recipe, NotFound } from '../components/index';

const Router = () => {
  return (
    <Switch>
      <PublicRoute exact component={ Login } path='/autorization' />
      <PrivateRoute exact component={ Home } path='/' />
      <PrivateRoute exact component={ Favorites } path='/favorites' />
      <PrivateRoute exact component={ Planner } path='/planner' />
      <PrivateRoute exact component={ Recipe } path='/recipes/:id' />
      <PrivateRoute exact component={ NotFound } path='*' />
    </Switch>
  );
};

export default Router;