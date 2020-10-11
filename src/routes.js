import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Announce from './pages/Announce';
import Details from './pages/Details';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/announce" component={Announce} />
        <Route path="/details/:carId" component={Details} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;