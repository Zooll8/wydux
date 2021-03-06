import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './Home.jsx';
import PlayerImage from './Player.jsx';
import PlayerBottom from './PlayerBottom.jsx';
import Album from './Album.jsx';
import Artist from './Artist.jsx';


const Main = () => (
  <Router>
    <div className="browser-window">
      <div className="content">
        <div className="col-left">
        
          <div className="window">
            <div className="logo">
              <Link to="/"><i className="fa fa-headphones" aria-hidden="true" /> wyDux</Link>
            </div>

            <PlayerImage />
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/album/:id" component={Album} />
          <Route path="/artist/:id" component={Artist} />
          <Route component={Home} />
        </Switch>
      </div>
      <PlayerBottom />
    </div>
  </Router>
);

export default Main;
