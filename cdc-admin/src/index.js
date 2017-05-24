import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AutorBox from './Autor';
import Home from './Home';
import LivroBox from './Livro';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


ReactDOM.render(
  (
      <Router>
        <App>
           <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" component={LivroBox} />
           </Switch>
        </App>
      </Router>
      
  ) , 

  document.getElementById('root')
);