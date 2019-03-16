import React, { Component } from 'react';
import logoSpotify from '../../assets/spotify_logo.png';

// R E D U X 
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
    savePlaylist
} from '../../actions';

class CreatePlaylist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            public: true,
            collaborative: true,
            description: ''
        }
    }

    agregarPlayList = (e) =>{
        e.preventDefault();
        const objNew = {
            name: this.props.name,
            public: true,
            collaborative: true,
            description: this.props.description
        }
        this.props.savePlaylist(objNew)
    }

    getNombre = (e) =>{
        this.setState({name: e.target.value})
    }
    getDescripcion = (e) =>{
        this.setState({description: e.target.value})
    }

    render() {
        return (
            <div>
                <nav className="green accent-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a className="brand-logo" href="/">
                                <img src={ logoSpotify } width="180" height="auto" alt="Logo App" />
                            </a>

                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="">Crear una nueva Playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s12 m4 l12">
                            <h3>Crear nueva playlist</h3>
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={ this.agregarPlayList }>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    onChange={ this.getNombre }
                                                    value={ this.state.name }
                                                    type="text" 
                                                    placeholder="Nombre de la playlist"
                                                    name="namePlaylist" />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea 
                                                    onChange={ this.getDescripcion }
                                                    value={ this.state.description } 
                                                    name="description"
                                                    placeholder="Descripción" 
                                                    className="materialize-textarea">
                                                </textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Guardar Playlist
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//  M A P   S T A T E  T O   P R O P S 
function mapStateToProps(state) {
    return {
        playlist: state.playlist
    }
}

// para que las acciones se utilicen como props del componente
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        savePlaylist
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (CreatePlaylist);
