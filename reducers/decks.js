import { ADD_DECK, ADD_QUESTION, SET_VOTE } from '../actions/decks'

let STATE_INITIAL = {
    decks: [{
        id: 2,
        itens: [
            {
                parentID: 2,
                question: 'Naruto é a raposa de nove caudas?',
                resolution: true
            }, {
                parentID: 2,
                question: 'Filmes são novos meios de entretenimento na atualidade?',
                resolution: false
            }, {
                parentID: 2,
                question: 'Serjão matou uma onça?',
                resolution: true
            }
        ],
        title: 'teste',
        likes: 0,
        dislikes: 0,
    }]
}

const initialDeck = ({ decks }, newDeck) => {
    newDeck.id = Math.random() * 10 + Math.random() * 10;
    newDeck.itens = [];
    newDeck.likes = 0;
    newDeck.dislikes = 0;
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

const setVote = ({ decks, likes, dislikes }, vote) => {
    let newDecks = decks.map(deck => 
        deck.id === vote.parentID
        ? { 
            ...deck, 
            likes: vote.option === true ? deck.likes + 1 : deck.likes, 
            dislikes: vote.option === false ? deck.dislikes + 1 : deck.dislikes 
        }
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