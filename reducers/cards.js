
export default function cards(state={}, action){
    switch(action.type){
        case "FETCH_CARDS":
            return {
                ...state,
                ...action.cards
            };
        // case "ADD_CARD": 
        // //add card to deck specified
        // console.log(state);
        // console.log(action);
        //     return {
        //         ...state, 
        //         ...action.card
        //     };
        default: 
            return state;
    }

}