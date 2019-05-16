import React, { PureComponent } from 'react'
import { View, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { setVote } from '../actions/decks'
import posed from 'react-native-pose';

const Box = posed.View({
    open: { opacity: 1 }
});

const Card = posed.View({
    open: { x: 0, opacity: 1 },
    closed: { x: 400 }
})


class DeckView extends PureComponent {

    state = {
        deck: {},
        pose: 'closed',
        poseChild: 'closed'
    }

    componentDidMount() {
        Object.keys(this.state.deck).length <= 0 && this.catchDeck(this.props.decks, this.props.id)
        this.setState({pose: 'open'});
    }

    componentDidUpdate(oldProps) {
        this.props.decks !== oldProps.decks && this.catchDeck(this.props.decks, this.props.id)
    }

    catchDeck = (decks, id) => {
        const selectedDeck = decks.filter(deck => deck.id === id);
        return selectedDeck.map(deck => this.setState({deck}))
    }

    render() {
        const { deck } = this.state
        return (
            <Box style={{ flex: 1 }} pose={this.state.pose}>
                { 
                    Object.keys(deck).length > 0 && (
                        this.state.poseChild === 'closed' && this.state.poseChild === 'open',
                        <Card pose={this.state.poseChild}>
                            <View>
                                <Text h2>{deck.title}</Text>
                                <Text h4>CARDS: { deck.itens.length }</Text>
                            </View>
                            <View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                </View>
                            </View>
                            <View>
                                {
                                    this.state.deck.itens.length > 0 && (
                                        <Button
                                            buttonStyle={{ padding: 20, marginBottom: 10 }}
                                            backgroundColor="#333"
                                            fontSize={20}
                                            title='QUIZ' 
                                            onPress={() => Actions.play({itens: this.state.deck.itens})}
                                        />
                                    )
                                }
                                <Button
                                    buttonStyle={{ padding: 15 }}
                                    backgroundColor="#333"
                                    fontSize={20}
                                    title='NEW QUESTION' 
                                    onPress={() => Actions.cardForm({mode: 'new', parentID: this.props.id})}
                                />

                            </View>
                        </Card>
                    )
                }

            </Box>
        )   
    } 
    
}

mapStateToProps = (state) => {
    return {
        decks: state.decks.decks
    }
}

export default connect(mapStateToProps)(DeckView)