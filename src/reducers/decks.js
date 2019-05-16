import { ADD_DECK, ADD_QUESTION, SET_VOTE } from '../actions/decks'

let STATE_INITIAL = {
    decks: [{
        id: 2,
        itens: [
            {
                parentID: 2,
                question: 'The earth is Flat?',
                resolution: false
            }, {
                parentID: 2,
                question: "In JS, 1 + '1' = 11",
                resolution: true
            }
        ],
        title: 'MY FIRST DECK'
    }]
}

const initialDeck = ({ decks }, newDeck) => {
    newDeck.id = Math.random() * 10 + Math.random() * 10;
    newDeck.itens = [];
    return [...decks, newDeck]
}

const questDeck = ({ decks }, newQuestion) => {
    let newDecks = decks.map( deck => 
        deck.id === newQuestion.parentID 
        ? {...deck, itens: [...deck.itens, newQuestion]}
        : deck
    )
    return [...newDecks]
}

export default decks = (state = STATE_INITIAL, action) => {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                decks: initialDeck(state, action.payload),
            }
        case ADD_QUESTION: 
            return {
                ...state,
                decks: questDeck(state, action.payload)
            }
        case SET_VOTE:
            return {
                ...state,
                decks: setVote(state, action.payload)
            }
        default:
            return state
    }
}