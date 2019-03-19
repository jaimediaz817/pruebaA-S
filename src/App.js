import React, { Component } from 'react'
import { Route, Router } from 'react-router'
import PropTypes from 'prop-types'
import './App.css'

// Importando componentes
import Index from './views/index/Index';
import Player from './views/player/Player';
import PlaylistDetail from './views/myPlaylist/DetailTrack';
import FormCrearPlaylist from './views/myPlaylist/CreatePlaylist';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={ this.props.history }>
          
          <div>
            <Route exact path="/" component={ Index }/>
            <Route path="/player/:songId" component={ Player }/>
            <Route path="/tracks/:id" component={ PlaylistDetail }/>
            <Route path="/crearPlaylist" component={ FormCrearPlaylist }/>
          </div>
        </Router>


        <footer className="page-footer footer-jdiaz">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Jaime Iván Díaz</h5>
                <p className="grey-text text-lighten-4"><strong>Frontend Developer</strong> con más de 3 años de experiencia en este campo.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links Github</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="https://github.com/jaimediaz817"><i className="fa fa-github"></i> Cuenta de Github #1 (laboral)</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://github.com/jivan0017"> <i className="fa fa-github"></i>Cuenta de Github #2 (proyectos personales y experimentos)</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2019 Copyright Prueba práctica | ATLANTIC SOFT
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.any
};

export default App;
