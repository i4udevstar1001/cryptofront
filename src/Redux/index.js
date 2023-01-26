import {createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import game from './State/Config'
import chat from './State/Chat'
const reducer = (state = {tables: [], aceLiveActive: null}, action) => {
    const newState = {...state}
    switch (action.type){
        case 'UPDATE_ACE_LIVE_INFO':
            newState.aceLiveActive = action.payload;
            break;
        case 'UPDATE_TABLES_LIST':
            newState.tables = action.payload;
            break;
        default:
            break;
    }   
    return newState 
}

const store = createStore(combineReducers({
    game, 
    chat, 
    tableLobby: reducer 
}), composeWithDevTools())

export default store
