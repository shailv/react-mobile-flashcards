const FETCH_CARDS = 'RETRIEVE_CARDS'
const ADD_CARD = 'ADD_CARD'

export function fetchCardsInDeck(deck){
    return(dispatch) => {
        dispatch(fetchCards(deck))
    }
}
function fetchCards(deck){
   return{
       type: FETCH_CARDS,
       deck
   }
}

export function addCard(newCard, deck){
    return (dispatch) => {
        dispatch(saveCard(newCard, deck));
    }
}
function saveCard(card, deck){
    return{
        type: ADD_CARD,
        card,
        deck
    }
}