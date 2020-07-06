  import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import PrivateRoute from './auth'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewNaver from './pages/NewNaver';
import EditNaver from './pages/EditNaver';

const Routes: React.FC = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <PrivateRoute component={Dashboard} path="/dashboard" />
        <PrivateRoute component={NewNaver} path="/new-naver" />
        <PrivateRoute component={EditNaver} path="/edit-naver" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;