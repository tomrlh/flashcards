import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Card, ListItem, Button, Text  } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class Deck extends Component {

    render() {
        const {key, deck: { id, title }} = this.props
        return (
            <Card>
                <View key={key} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text h4 style={{color: '#333', margin: 5}}>{ title }</Text>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 5}}>
                    </View>
                </View>
                <Button fontSize={16} title='BEGIN' onPress={() => Actions.deckView({ ...this.props.deck })}
                />
            </Card>
        )
    }
}

export default connect()(Deck)