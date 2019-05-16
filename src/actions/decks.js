export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SET_VOTE = 'SET_VOTE'

/**
* @description Add deck
* @param {object} data { title }
* @returns {array} Decks
*/
export function addDeck(data) {
    return {
        type: ADD_DECK,
        payload: data
    }
}

/**
* @description Add question
* @param {object} data { parentID, question, response }
* @returns {array} Questions
*/
export function addQuestion(data) {
    return {
        type: ADD_QUESTION,
        payload: data
    }
}

/**
* @description Like or Dislike deck
* @param {data} vote { parentID, option: (true or false) }
* @returns {array} Decks
*/
export function setVote(vote) {
    return {
        type: SET_VOTE,
        payload: vote
    }
}
