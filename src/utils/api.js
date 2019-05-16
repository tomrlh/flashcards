import { AsyncStorage } from "react-native"

const chave = "@flashcards";

addDeck = async (data) => {
    try {
        await AsyncStorage.setItem(`${chave}:deck`, data);
        return true;
    } catch (error) {
        return false;
    }
}

listDecks = async () => {
    try {
        const decks = await AsyncStorage.getItem(`${chave}:deck`);
        return decks;
    } catch (error) {
        return false;
    }
}