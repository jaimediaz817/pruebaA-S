export default function player (state=[], action) {
    switch(action.type) {
        case "GET_MY_PLAYLIST":
            return {...state, myplaylist: action.payload };

        case "GET_TRACKS":
            console.log("from reducer: ", action.payload)
            return {...state, tracks: action.payload.items };
            //return action.payload;

        case "ADD_PLAYLIST":
            return [...state, action.payload];

        case "SET_TOKEN":
            return {...state, tokenId: action.payload}

        default:
            return state;
    }
}