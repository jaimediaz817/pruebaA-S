import { combineReducers } from 'redux';

//  C U S T O M S   R E D U C E R S 
import { initial } from './initial'
import player from './player';
import playlist from './playlist';

//import { player } from './player';

export default combineReducers({
    initial, playlist, player
});
