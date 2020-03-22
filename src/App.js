import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from './components/Home'
import Authenticated from './components/Authenticated'
import Share from './components/Share'
import Player from './components/Player'
import bootstrap from './bootstrap'

bootstrap();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/authenticated"component={Authenticated} />
        <Route path="/share" component={Share} />
        <Route path="/listen/:key" component={Player} />
      </Switch>
    </Router>
  );
}

export default App;
