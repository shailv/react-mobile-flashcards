import {allDecks} from '../utils/data'

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

export function getAllDecks(){
    return(dispatch) => {
        return Promise.all([allDecks()])
        .then((decks) => {
            dispatch(retrieveDecks(decks))
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