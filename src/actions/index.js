import axios from 'axios';
import { TrackHandler, Client } from 'spotify-sdk';

let client = Client.instance;
client.settings = {
    clientId: '298f9dba1a5e432fa3825d9e74d0cc9d',
    secretId: '648e0df7a483469cbe28709540cdcd47',
    scopes: ['user-read-private user-follow-modify user-follow-read user-library-read user-top-read playlist-modify-public'],
    redirect_uri: 'http://localhost:3000/'
}


// A C C I O N E S

export const checkSignIn = () => {
    console.log("action works!::: ", client._clientId)
    return async (dispatch, getState) => {        
        if (sessionStorage.token) {
            // propiedad de instancia
            client.token = sessionStorage.token
        } else if (window.location.hash.split('&')[0].split('=')[1]) {

            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];            
            client.token =  sessionStorage.token;
        } else {
            // si no hay nadie logueado
             await client.login()
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
const setToken = (token) => { return { type: "SET_TOKEN", success: true , payload: token}};
export const playTrack = (songId)  =>{
    return (dispatch, getState) =>{
        console.log("token: "+ client.token + " , songid: "+ songId)
        dispatch(startFetch());
                   https://api.spotify.com/v1
        axios.get('https://api.spotify.com/v1/tracks/'.concat( songId ), { headers: { "Authorization": 'Bearer ' + client.token , 'Content-Type': 'application/x-www-form-urlencoded'} })
            .then(res => {
                dispatch(completeSong(res.data));
                dispatch(setToken(client.token))
            })
            .catch(err=> console.error(err));
    }
}


//  T R A E R     D A T O S     U S U A R I O 
const completeUser = (data) => { return { type: "GET_DATA_USER", success: true , payload: data}};
const setUserId = (idUser) => { return { type: "SET_USER_ID" , payload: idUser}};

export const getDataUser = () => {
    return async (dispatch, getState) => {
        dispatch(startFetch());
        
         await axios.get('https://api.spotify.com/v1/me',  { headers: { "Authorization": 'Bearer ' + client.token , 'Content-Type': 'application/json'} })
            .then(usua =>{
                dispatch(setUserId(usua.data.id));
                console.log("usuario: ", usua.data.id)
                sessionStorage.userId = usua.data.id
                
                console.log("usuario:session storage ", sessionStorage.userId)                
                dispatch(completeUser(usua.data));
            })
            .catch(err => console.error(err));
    }
}


//  G E T     M Y     P L A Y    L I S T  
const completeGetMyPLaylist = (data) => { return { type: "GET_MY_PLAYLIST", success: true , payload: data}};
export const getMyPLayList = (usuarioId) => {
    console.log("user id: ", usuarioId)
    return async (dispatch, getState) =>{
        await dispatch(startFetch());
        //const varUser = await sessionStorage.userId;
        await axios.get('https://api.spotify.com/v1/users/'+ sessionStorage.userId + '/playlists',  { headers: { "Authorization": 'Bearer ' + client.token } })
            .then(myPLayList => {
                console.log(" usuario id param: ", getState)
                console.log("myplaylist ::::::::::::   ", myPLayList.data);
                dispatch(completeGetMyPLaylist(myPLayList.data))
            })
            .catch(err => console.error(err));
    }
} 


//   G E T     T R A C K S 
const completeTracks = (data) => { return {  type: "GET_TRACKS", success:true, payload: data}};
export const getTracksByPlayList = (path) => {
    return async (dispatch, getState) => {
        await axios.get(path, { headers: { "Authorization": 'Bearer ' + client.token, 'Content-Type': 'application/json' } })
            .then(res =>{
                console.log("FROM ACTIONS: gettracks : ", res)
                dispatch(completeTracks(res.data));
                dispatch(setToken(client.token));
            })
            .catch(err => console.error(err));
    }
}

// SAVE PLAYLIST
const completeAdd = (data) => { return { type: "ADD_PLAYLIST", success: true, payload: data}};
export const  savePlaylist = (obj) => {
    return (dispatch, getState) => {
        console.log("token:::: from create action creator :::: " , obj);
        axios.post('https://api.spotify.com/v1/users/'+ sessionStorage.userId + '/playlists', 
        {
            "name": obj.name,
            "public": true,
            "collaborative": false,
            "description": obj.description
        },
        { headers: { "Authorization": 'Bearer ' + sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res =>{
            console.log("save", res)
            dispatch(completeAdd(res.data));
        })
        .catch(err => console.error("errrrrrrrrrrrrrrrrrrrrrrrrrrrr", err));
    }
}