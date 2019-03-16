export default function player (state=[], action) {
    switch(action.type) {
        case "GET_MY_PLAYLIST":
            return [...state, action.payload];

        case "GET_TRACKS":
            return [...state, action.payload];

        case "ADD_PLAYLIST":
            return [...state, action.payload];
        default:
            return state;
    }
}