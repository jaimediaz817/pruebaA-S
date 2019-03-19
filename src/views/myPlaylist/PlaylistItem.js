import React, { Component } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import sinTrackAsignado from '../../assets/image_no_tracks.png';

// R E D U X 
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
    
import { 
    getTracksByPlayList
} from '../../actions';

// L I N K
import { Link } from 'react-router-dom';


class PlaylistItem extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    noTracksMessage() {
        M.toast({html: 'Aún no tiene asociado canciones para reproducir dentro de su Playlist, agréguelas desde la aplicación.'});
    }

    render() {
        const { id, name, tracks, image, tieneTracks, tokenPath } = this.props;
        
        return (

                
                <div>   
                    { tieneTracks ? 
                    (
                    <li className="collection-item avatar link-song-item__content" onClick={ ()=> this.props.getTracksByPlayList(tracks) }>
                        <Link to={ "tracks/" + "tracks" } className="link-song-item">
                            {/* Image */}
                            <img alt="avatar" src={ image } className="circle" />
                            <p className="song-name"><strong>Nombre de la playList:</strong> { name }</p>
                        </Link>
                    </li>
                    )
                    :(
                    <li className="collection-item avatar link-song-item__content" onClick={ ()=> this.noTracksMessage() }>
                        <div className="link-song-item">
                            {/* Image */}
                            <img alt="avatar" src={ sinTrackAsignado } className="circle noTrack" />
                            <p className="song-name"><strong>Nombre de la playList:</strong> { name }</p>
                            <span class="new badge red">: Sin tracks asignados</span>
                        </div>
                    </li>
                    ) }

                </div>
            
        );
    }
}

//  M A P   S T A T E  T O   P R O P S 
function mapStateToProps(state) {
    return {
        playlist: state.playlist.payload
    }
}

// para que las acciones se utilicen como props del componente
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTracksByPlayList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
