/**
 * @description Decks reducer
 */
export default function decks(state={}, action){
    switch(action.type){
        case 'RETRIEVE_DECKS':
            if(Object.keys(state).length == 0){
                return {
                    ...state,
                    ...action.decks
                }
            }
            return state;
        case 'FETCH_DECK': 
            return state.filter(deck => deck.title === action.deck.title);
        case 'ADD_DECK':
            state[0] = {
                ...state[0], 
                ...action.deck
            }
            return state;
        case "ADD_CARD":            
            //update the deck with the new card
            if(action.deck.questions !== undefined){
                action.deck.questions.push(action.card);
            }
            else{
                action.deck.questions = new Array(1);
                action.deck.questions.push(action.card);
            }
            //update state with the new deck
            state[0][action.deck.title] = action.deck;
            return state;
        default: 
            return state;
    }

}