import React, { Component } from 'react';
import PropTypes from 'prop-types';

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



    render() {
        const { id, name, tracks, image } = this.props;
        console.log("tracks by my playlist: ", tracks);
        return (
            <div>
            <li className="collection-item avatar link-song-item__content">
                <Link to={"tracks/" + "tracks" } className="link-song-item" onClick={ ()=> this.props.getTracksByPlayList(tracks) }>
                    {/* Image */}
                    <img alt="avatar" src={ image } className="circle" />
                    <p className="song-name"><strong>Nombre de la playList:</strong> { name }</p>
                </Link>
            </li>
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
