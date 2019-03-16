import React, { Component } from 'react';
import PropTypes from 'prop-types';

// L I N K
import { Link } from 'react-router-dom';


class SongItem extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        //this.props.checkSignIn();
    }


    validaNombreSong(nameIn) {
        let name = '';
        if ( nameIn == undefined || nameIn == '' || nameIn == null) {
            name = 'Sin nombre asignado';
        } else {
            name = this.props.name;
        }
        return name;
    }

    render() {

        // Destructurando los elementos:
        const { songName, tokenPath, albumPhoto, artistName, songId,  _popularity} = this.props;
        console.log("variables items::::: ,", this.props)

        return (
            <li className="collection-item avatar link-song-item__content">
                <Link to={"player/" + songId + tokenPath } className="link-song-item">
                    {/* Image */}
                    <img alt="avatar" src={ albumPhoto } className="circle" />
                    <p className="song-name"><strong>Nombre de la canción:</strong> { songName }</p>
                    <p className="artist-name">Nombre del artista: { artistName }</p>
                    <p className="">Popularidad: { _popularity }</p>
                    <span href="#!" className="secondary-content"><i className="material-icons">grade</i></span>
                </Link>
            </li>
        );
    }
}

SongItem.PropTypes = {
    songId: PropTypes.string,
    tokenPath: PropTypes.string,
    albumPhoto: PropTypes.string,
    songName: PropTypes.string,
    artistName: PropTypes.string
}

export default SongItem;
