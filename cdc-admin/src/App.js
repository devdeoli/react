import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AutorBox from './Autor';
import Home from './Home';


class App extends Component {

  render() {    
    return (
      <Router>
        <div id="layout">
          
           <a href="#menu" id="menuLink" className="menu-link">
              
              <span></span>
           </a>

           <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                      <li className="pure-menu-item"><Link to="/Autor" className="pure-menu-link">Autor</Link></li>
                      <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
                  </ul>
              </div>
           </div>

           <Route exact path="/" component={Home} />
           <Route path="/autor" component={AutorBox} />
           {/*<Route path="/livro" component={LivroBox} />*/}

            <div id="main">
                <div className="content" id="content">
                    {this.props.children}
                </div>
            </div>            
        </div>         
      </Router>
    );
  }
}

export default App;
