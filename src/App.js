import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SidePanel from './components/SidePanel'
import SideContainer from './components/SideContainer'
import SignIn from './pages/SignIn'

const App = (props) => {
  return (
    <Router>
      <SideContainer />
      <Switch>
      	<Route path="/login" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
