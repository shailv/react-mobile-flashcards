import {allDecks} from '../utils/data'
import {AsyncStorage} from 'react-native'
import {DECKS_KEY} from '../utils/api'

const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
const FETCH_DECK = 'FETCH_DECK'
const ADD_DECK = 'ADD_DECK'

export function getDeck(title){
    return(dispatch) => {
        dispatch(fetchDeck(title))
    }
}
function fetchDeck(title){
   return{
       type: FETCH_DECK,
       title
   }
}

/**
 * @description Retrieve data from the js file and initialize state and
 * add to asyncstorage
 */
export function getAllDecks(){
    return(dispatch) => {
        return Promise.all([allDecks()])
        .then((decks) => {
            dispatch(retrieveDecks(decks));
            let alldecks = {...decks[0]};

            AsyncStorage.removeItem(DECKS_KEY)
            .then(() => {
                AsyncStorage.setItem(DECKS_KEY, JSON.stringify(alldecks))
            });
        })
    }
}

function retrieveDecks(decks){
    return{
        type: RETRIEVE_DECKS,
        decks
    }
}

export function addDeck(deck, callBack){
    return(dispatch) => {
        dispatch(saveDeck(deck))
        callBack()
    }
}
function saveDeck(deck){
    return{
        type: ADD_DECK,
        deck
    }
}