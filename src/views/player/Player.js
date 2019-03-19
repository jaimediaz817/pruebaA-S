import React, { Component } from 'react';
import logoSpotify from '../../assets/spotify_logo.png';
import 'materialize-css/dist/css/materialize.min.css';

// L I N K
import { Link } from 'react-router-dom';

// R E D U X 
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

// C R E A D O R E S   D E   A C C I O N E S 
import { playTrack, checkSignIn } from '../../actions';




class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            songId: this.props.match.params.songId
        }
    }

    // F E T C H    S O N G
    componentDidMount() {
        this.props.checkSignIn();        
        this.props.playTrack(this.state.songId);
    }

    componentWillMount() {
        // fetch a song
        // this.props.checkSignIn();        
        // this.props.playTrack(this.state.songId);

    }

    render() {

        const { player } = this.props;

        console.log(this.state.songId)

        // Validar si hay más imágenes
        let renderImagesDetails = 0;
        //(player.payload.album.images.length > 1)?renderImagesDetails = 1:renderImagesDetails = 0        

        if (player.type == "COMPLETE_SONG") {
            console.log("OK", player.payload);
            console.log("token::: >>> :", this.props.pl)
            return(
                <div>
                    <nav className="green accent-4">
                        <div className="container">
                            <div className="nav-wrapper">
                                <a className="brand-logo" href={`/#access_token=${this.props.player.tokenId}`}>
                                    <img src={ logoSpotify } width="180" height="auto" alt="Logo App" />
                                </a>

                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="">Detalle de una canción</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container">
                        <div className="row">
                            <div className="col s8">
                                <div className="Player">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="Player-left">
                                                <div className="card">
                                                    <div className="card-image card-reproductor">
                                                        <img src={ player.payload.album.images[0].url } className="imagen-detail"/>
                                                        <span className="card-title">Card Title</span>                                                        
                                                        <Link to={`/#access_token=${this.props.player.tokenId}`} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">keyboard_backspace</i></Link>
                                                    </div>
                                                    <div className="card-content">
                                                        <p>
                                                            Detalles generales sobre esta Canción
                                                            <span className="badge">Tipo: { player.payload.album.type }</span>
                                                            <span className="badge">Fecha release: { player.payload.album.release_date }</span>
                                                        </p>
                                                    </div>
                                                    <div className="card-action cont">
                                                        {console.log("datos:", player.payload.album)}
                                                        <audio controls className="audio">
                                                            <source src={ player.payload.preview_url } />
                                                        </audio>
                                                        {/*
                                                        <h4><strong>Canción: </strong>{ player.payload.name}</h4>                                                        
                                                        */}
                                                        <i className="material-icons icon-play-song-app">
                                                        equalizer
                                                        </i>
                                                        <h6><strong>Total de tracks: </strong><span className="new badge">{  player.payload.album.total_tracks }</span></h6>
                                                        <h6><strong>Artista: </strong>{  player.payload.album.artists[0].name }</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col s4">                                
                                <div className="card blue-grey darken-1">
                                    <div className="card-content white-text">
                                        <span className="card-title">Más imágenes</span>
                                        <img className="circle" src={player.payload.album.images[2].url} />
                                        <h5>Visita ahora mismo la web del autor</h5>
                                        <a
                                            href={player.payload.album.artists[0].external_urls.spotify}
                                            className="btn-floating halfway-fab waves-effect waves-light red"
                                            target="_blank"
                                        >
                                            <i className="material-icons">insert_link</i>
                                        </a>
                                        {/*player.payload.album.artists[0]*/}
                                    </div>
                                    <div className="card-action">                                    
                                    </div>
                              </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            );
            
        } else {
            return(
                <div>
                    <nav className="green accent-4">
                        <div className="container">
                            <div className="nav-wrapper">
                                <a className="brand-logo" href="/">
                                    <img src={ logoSpotify } width="180" height="auto" alt="Logo App" />
                                </a>

                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="">Detalle de una canción</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div>
                        Sin resultados
                    </div>
                </div>
            );
        }
    }
}

//  M A P   S T A T E  T O   P R O P S 
function mapStateToProps(state) {
    console.log(state);
    return {
        routes: state.routes,
        player: state.player
    };
}

// para que las acciones se utilicen como props del componente
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        playTrack,
        checkSignIn
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
