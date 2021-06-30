import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Firebase from '../api/firebase';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={() => 
      Firebase.getUser() ? <Redirect to='/' /> : <Component />
    }/>
  );
};

export default PublicRoute;