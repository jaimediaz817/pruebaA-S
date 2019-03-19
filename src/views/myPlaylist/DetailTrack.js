import React, { Component } from 'react';
import logoSpotify from '../../assets/spotify_logo.png';
import 'materialize-css/dist/css/materialize.min.css';

// L I N K
import { Link } from 'react-router-dom';

// R E D U X 
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

// C O M P O N E N T S
import SongItem from '../index/SongItem';
    
import { 
    getTracksByPlayList
} from '../../actions';

class DetailTrack extends Component {

    constructor(props) {
        super(props);

        this.state = {
            songId: this.props.match.params.songId
        }        
    }

    componentDidMount() {
        console.log("...", this.props.player);
    }

    renderTracksByPlayList() {
        const { playlist } = this.props;

        if (playlist.tracks) {
            console.log(":::::::::::::::::::: ", playlist.tracks)
            var arr = playlist.tracks.map((el, i) =>{
                console.log("traack item ", el.track)
                // return <div key={i}>elelemtnpo</div>
                return(
                    //<li key={i}> { el.track.name } </li>
                    <SongItem 
                        key={ i }
                        songId={ el.track.id}
                        tokenPath={ "" }
                        albumPhoto={ el.track.album.images[0].url }
                        albumName={ el.track.album.name }
                        songName = { el.track.name }
                        artistName = { el.track.artists[0].name }
                    />    
                );
            })
    
            return arr;
        }
        
    }

    render() {
        console.log("... estado actual: ", this.props.playlist)
        return (
            <div>
                <nav className="green accent-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a className="brand-logo" href="/">
                                <img src={ logoSpotify } width="180" height="auto" alt="Logo App" />
                            </a>

                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="">Tracks de un playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Meter acá el cuerpo de los detalles Song */}

                <div className="container">
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="card Index-results-card">
                                <div className="card-content">
                                    <ul className="collection">
                                        { this.renderTracksByPlayList() }
                                    </ul>
                                    <Link to={`/#access_token=${this.props.playlist.tokenId}`} className="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">keyboard_backspace</i></Link>
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
        routes: state.routes,
        playlist: state.playlist
    };
}

//para que las acciones se utilicen como props del componente
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTracksByPlayList
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (DetailTrack);
