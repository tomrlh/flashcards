import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Deck from './Deck'
import styles from '../styles'

class Home extends Component {

    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        const { decks } = this.props
        
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <ScrollView style={{flex: 1}}>
                    {
                        decks !== undefined && (
                            decks.map((deck, index) => <Deck key={index} deck={deck} />)
                        )
                    }
                </ScrollView>

                <Button
                    buttonStyle={[styles.button]}
                    backgroundColor="#333"
                    large
                    icon={{name: 'plus-circle', type: 'font-awesome'}}
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