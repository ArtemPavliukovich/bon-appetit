import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Firebase from '../api/firebase';
import type { RouteTypes } from '../types';

const PrivateRoute: React.FC<RouteTypes> = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={() =>
      Firebase.getUser() ? <Component /> : <Redirect to='/autorization' />
    }/>
  );
};

export default PrivateRoute;