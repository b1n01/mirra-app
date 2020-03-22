import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from './components/Login'
import Auth from './components/Auth'
import Share from './components/Share'
import Player from './components/Player'
import Settings from './components/Settings'
import bootstrap from './bootstrap'

bootstrap();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Share} />
        <Route path="/auth"component={Auth} />
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/logout" component={Settings} />
        <Route path="/:key" component={Player} />
      </Switch>
    </Router>
  );
}

export default App;
