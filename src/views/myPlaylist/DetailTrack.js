import React, { Component } from 'react';
import logoSpotify from '../../assets/spotify_logo.png';
import 'materialize-css/dist/css/materialize.min.css';
// R E D U X 
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
    
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
        console.log("...", this.props.playlist);
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
                                <li><a href="">Tracks de un playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                track detauks
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
        getTracksByPlayList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailTrack);
