import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { View, ScrollView, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Deck from './Deck'

class Home extends Component {

    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        const { decks } = this.props
        
        return (
            <View style={{flex: 1, justifyContent: 'space-between', marginBottom: 20}}>
                <ScrollView style={{flex: 1}}>
                    {
                        decks !== undefined && (
                            decks.map((deck, index) => <Deck key={index} deck={deck} />)
                        )
                    }
                </ScrollView>

                <Button
                    backgroundColor="#333"
                    large
                    title='ADD DECK' 
                    onPress={() => Actions.deckForm({mode: 'new'})}
                />

            </View>
        )   
    } 
    
}

mapStateToProps = (state) => {
    console.log(state.decks.decks)
    return {
        decks: state.decks.decks
    }
}

export default connect(mapStateToProps)(Home)