import axios from 'axios';
import { TrackHandler, Client } from 'spotify-sdk';

let client = Client.instance;
client.settings = {
    clientId: '298f9dba1a5e432fa3825d9e74d0cc9d',
    secretId: '648e0df7a483469cbe28709540cdcd47',
    scopes: ['user-read-private user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:3000/'
}


// A C C I O N E S

export const checkSignIn = () => {
    console.log("action works!::: ", client._clientId)
    return (dispatch, getState) => {        
        if (sessionStorage.token) {
            // propiedad de instancia
            client.token = sessionStorage.token
        } else if (window.location.hash.split('&')[0].split('=')[1]) {

            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];            
            client.token = sessionStorage.token;
        } else {
            // si no hay nadie logueado
            client.login()
                .then( url => {
                    console.log("login: ", url);
                    // para que spotify se haga presente en el proyecto
                    window.location.href = url;
                })
        }
    }
}


//  B U S C A R 
const startFetch = () => { return { type: "IS_FETCHING", isFetching: true }};
const errorFetch = (err) => { return { type: "ERROR_FETCH", isFetching: false, err}};
const completedFetch = (data) => { return { type: 'COMPLETE_FETCH', isFetching: false, payload: data }};

export const searchSongs = (trackName) => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        let track = new TrackHandler();
        // Buscar videos
        track.search( trackName, { limit: 5 } )
            .then( trackCollection => {
                console.log(trackCollection);
                dispatch(completedFetch(trackCollection));
            })
            .catch(err => {
                dispatch(errorFetch(err));
            })
    }
}


//  S O N G     T R A C K

// Payload:
const completeSong = (data) => { return { type: "COMPLETE_SONG", success: true , payload: data}};
export const playTrack = (songId)  =>{
    return (dispatch, getState) =>{
        console.log("token: "+ client.token + " , songid: "+ songId)
        dispatch(startFetch());
                   https://api.spotify.com/v1
        axios.get('https://api.spotify.com/v1/tracks/'.concat( songId ), { headers: { "Authorization": 'Bearer ' + client.token , 'Content-Type': 'application/x-www-form-urlencoded'} })
            .then(res => {
                dispatch(completeSong(res.data));
            })
            .catch(err=> console.error(err));
    }
}



//  T R A E R     D A T O S     U S U A R I O 
const completeUser = (data) => { return { type: "GET_DATA_USER", success: true , payload: data}};

export const getDataUser = () => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        axios.get('https://api.spotify.com/v1/me',  { headers: { "Authorization": 'Bearer ' + client.token , 'Content-Type': 'application/json'} })
            .then(usua =>{
                console.log("usuario: ", usua.data.id)
                sessionStorage.userId = usua.data.id
                console.log("usuario:session storage ", sessionStorage.userId)
                dispatch(completeUser(usua.data))
            })
            .catch(err => console.error(err));
    }
}


//  G E T     M Y     P L A Y    L I S T  
const completeGetMyPLaylist = (data) => { return { type: "GET_MY_PLAYLIST", success: true , payload: data}};
export const getMyPLayList = (usuarioId) => {
    return (dispatch, getState) =>{
        dispatch(startFetch());
        axios.get('https://api.spotify.com/v1/users/'+ sessionStorage.userId + '/playlists',  { headers: { "Authorization": 'Bearer ' + client.token } })
            .then(myPLayList => {
                console.log("myplaylist ::::::::::::   ", myPLayList.data);
                dispatch(completeGetMyPLaylist(myPLayList.data))
            })
            .catch(err => console.error(err));
    }
} 


// GET TRACKS
const completeTracks = (data) => { return {  type: "GET_TRACKS", success:true, payload: data}};
export const getTracksByPlayList = (path) => {
    return (dispatch, getState) => {
        axios.get(path, { headers: { "Authorization": 'Bearer ' + client.token } })
            .then(res =>{
                dispatch(completeTracks(res.data));
            })
            .catch(err => console.error(err));
    }
}

// SAVE PLAYLIST
const completeAdd = (data) => { return { type: "ADD_PLAYLIST", success: true, payload: data}};
export const  savePlaylist = (obj) => {
    return (dispatch, getState) => {
        console.log("token:::: " , sessionStorage.token);
        axios.post('https://api.spotify.com/v1/users/'+ sessionStorage.userId + '/playlists',  { headers: { "Authorization": 'Bearer ' + sessionStorage.token, 'Content-Type': 'application/json' } }, 
        {
            name: obj.name,
            public: true,
            collaborative: true,
            description: obj.description
        })
            .then(res =>{
                console.log("save", res)
                dispatch(completeAdd(res.data));
            })
            .catch(err => console.error(err));
    }
}