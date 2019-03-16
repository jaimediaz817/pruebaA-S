import React, { Component } from 'react';
// usar versión minificada de materialize
import logoSpotify from '../../assets/spotify_logo.png';
import 'materialize-css/dist/css/materialize.min.css';

// Spinner
import Spinner from 'react-spinkit';

// C O M P O N E N T S
import SongItem from './SongItem';
import PlaylistItem from '../myPlaylist/PlaylistItem';

// R E D U X 
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

// C R E A D O R E S   D E   A C C I O N E S 
import { 
    checkSignIn,
    searchSongs,
    getDataUser,
    getMyPLayList
} from '../../actions';

// L I N K
import { Link } from 'react-router-dom';

class Index extends Component {

    //  C O N S T R U C T O R
    constructor() {
        super();
        // Creación del estado
        this.state = {
            song: '',
            userId: ''
        }
        this.getResulSoungList = this.getResulSoungList.bind(this);
        this.getResultMyPlayList = this.getResultMyPlayList.bind(this);
    }

    componentDidMount() {      
    }

    componentWillReceiveProps(nextProps) {

    }    

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillMount() {
        this.props.checkSignIn();
        this.props.getDataUser();
        
        this.props.getMyPLayList("test");
    }

    //  P R O C C E S S    T O K E N
    getTokenPath() {
        let path = window.location.href;
        return path.substring(path.indexOf("#"), path.length);
    }    

    // R E N D E R   R E S U L T S   L I S T 
    getResulSoungList() {
        const { songsReducer } = this.props;

        if (songsReducer.length > 0) {
            return (
                songsReducer.map((song, index)=> {
                    return(
                        <SongItem 
                            key={ index }
                            songId={ song.id}
                            tokenPath={ this.getTokenPath() }
                            albumPhoto={ song.album.images[0].url }
                            albumName={ song.album.name }
                            songName = { song.name }
                            artistName = { song.artists[0].name }
                        />                        
                        //    <div>song</div>
                    );
                })
            );
        }
    }


    // R E N D E R    M Y  P L A Y L I S T  
    getResultMyPlayList() {
        const { playlist } = this.props;

        if (playlist.length > 0) {
            return(
                playlist[0].items.map((listItem, index) => {
                    return(
                        // name, images, tracks=> href
                        <PlaylistItem
                            key={index}
                            id={listItem.id}
                            name={listItem.name}
                            image={listItem.images[0].url}
                            tracks={listItem.tracks.href}
                        />                        
                        
                    );
                })
            );
        }
    }

    buscarCancionSpotify = (songInput) => {
        //this.props.getDataUser();
        this.props.searchSongs(songInput);
        
    }

    recargarPlayList = () =>{
        //this.props.getMyPLayList("s")
        this.setState({ userId: ""})
    }



    // --------------------------------   R E N D E R  ---------------------------------------------
    render() {

        // Obteniendo del estado, la canción que se ha ingresado en al caja de busqueda
        const { songInput } = this.state;
        const { songsReducer } = this.props;
        const { usuario } = this.props;
        const { playlist } = this.props;
        
        const parseadoUser = JSON.stringify(usuario)

        if ( songsReducer.type == "IS_FETCHING") {
            <Spinner name="double-bounce" />
        }

        // validar conexión con el almacen de redux
        let datosUusario = {}

        // H A C K 
        // TODO: Nota: esto lo hice porque no había intentado en el almacen redux sacar una copia del estado, REFACTORIZAR!
        for(var k in  this.props.songsReducer.payload) {
            datosUusario[k] = this.props.songsReducer.payload[k]
            if (k == "images") {
                let temp = this.props.songsReducer.payload[k]
                datosUusario["foto"] = temp[0].url
            }
        }

        return (
            <div>
                <nav className="green accent-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a className="brand-logo" href="/">
                                <img src={ logoSpotify } width="180" height="auto" alt="Logo App" />
                            </a>
                            

                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to={"/crearPlaylist"}>Crear Playlist</Link></li>
                                <li style={{ textDecoration: 'underline' }}> {datosUusario.display_name}</li>
                                <li style={{ textDecoration: 'underline' }}> {datosUusario.display_name}</li>
                                <li><a href="">Búsqueda de canciones y su información básica</a></li>
                            </ul>
                        </div>
                    </div>

                </nav>


                {/* B U S C A D O R*/}
                <div className="Index">
                    <div className="card">
                        <div className="card-content">
                            <div className="Index-searchBox">
                                <input 
                                    type="text"
                                    className="inputSearch"
                                    placeholder="Canción"
                                    onChange={ (e)=> { this.setState({ song: e.target.value })}}
                                    value= { songInput }
                                />
                                <a 
                                    className="waver-effect waves-light btn green"
                                    onClick={ ()=>  this.props.searchSongs(songInput) }
                                >
                                    <i className="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col s12 m4 l4">
                            <div className="card Index-results-card">
                                <div className="card-content">
                                    
                                    {/* Contenido dinamico */}
                                    <ul className="collection">
                                        { this.getResulSoungList() }
                                        {/*<SongItem />*/}
                                    </ul>
                                    
                                    
                                </div>
                            </div>                            
                        </div>

                        <div className="col s12 m4 l5">
                            <div className="card Index-results-card">
                                <div className="card-content">
                                    <ul className="collection">                        
                                        { this.getResultMyPlayList() }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* S I D E B A R*/}
                        <div className="col s12 m4 l3">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <div className="avatar avatar-container-user">
                                        <img src={datosUusario.foto} className="circle avatar-usuario-request"/>
                                    </div>
                                    <span className="card-title">Usuario Spotify:  <strong>{ datosUusario.display_name }</strong></span>
                                    <p>País:  <strong>{ datosUusario.country }</strong></p>
                                    <p>Correo electrónico:  <strong>{ datosUusario.email }</strong></p>
                                </div>
                                <div className="card-action">
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
    console.log("ESTADOOOOOOOO : ", state);
    return {
        routes: state.routes,
        songsReducer: state.player,
        usuario: state.player.payload,
        playlist: state.playlist
    };
}

// para que las acciones se utilicen como props del componente
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkSignIn,
        searchSongs,
        getDataUser,
        getMyPLayList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
