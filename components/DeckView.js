import React, { PureComponent } from 'react'
import { View, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { randomColor } from '../utils/colors'
import { setVote } from '../actions/decks'
import posed from 'react-native-pose';
import styles from '../styles'

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
        const color = this.props.color || randomColor()
        const { deck } = this.state
        return (
            <Box style={[{ flex: 1, backgroundColor: color }]} pose={this.state.pose}>
                { 
                    Object.keys(deck).length > 0 && (
                        this.state.poseChild === 'closed' && this.setState({ poseChild: 'open' }),
                        <Card style={styles.pagePanel} pose={this.state.poseChild}>
                            <View style={styles.pageHeader}>
                                <Text h2 style={styles.pageText}>{deck.title}</Text>
                                <Text h4 style={styles.pageText}>CARDS: { deck.itens.length }</Text>
                            </View>
                            <View style={styles.pageBody}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <Text style={styles.pageText}>DISLIKES: { deck.dislikes }</Text>
                                    <Text style={styles.pageText}>LIKES: { deck.likes }</Text>
                                </View>
                                
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <Button
                                        buttonStyle={[styles.button, { padding: 8, borderRadius: 5, backgroundColor: '#FF6660' }]}
                                        fontSize={14}
                                        icon={{name: 'thumbs-down', type: 'font-awesome'}}
                                        title='Dislike' 
                                        onPress={() => this.props.dispatch(setVote({parentID: this.props.id, option: false}))}
                                    />
                                    <Button
                                        buttonStyle={[styles.button, { padding: 8, borderRadius: 5, backgroundColor: '#26E8BA' }]}
                                        fontSize={14}
                                        icon={{name: 'thumbs-up', type: 'font-awesome'}}
                                        title='Like' 
                                        onPress={() => this.props.dispatch(setVote({parentID: this.props.id, option: true}))}
                                    />
                                </View>
                            </View>
                            <View style={styles.pageBody}>
                                {
                                    this.state.deck.itens.length > 0 && (
                                        <Button
                                            buttonStyle={[styles.button, { padding: 20, borderRadius: 10, backgroundColor: color }]}
                                            backgroundColor="#333"
                                            fontSize={20}
                                            icon={{name: 'games'}}
                                            title='Start a Quiz' 
                                            onPress={() => Actions.play({itens: this.state.deck.itens})}
                                        />
                                    )
                                }
                                <Button
                                    buttonStyle={[styles.button, { padding: 15, backgroundColor: color }]}
                                    backgroundColor="#333"
                                    fontSize={20}
                                    icon={{name: 'plus-circle', type: 'font-awesome'}}
                                    title='Create New Question' 
                                    onPress={() => Actions.cardForm({mode: 'new', parentID: this.props.id, color: color})}
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