import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { randomColor } from '../utils/colors'
import styles from '../styles'
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'

class Play extends Component {

    state = {
        keyPlay: 0,
        cards: 0,
        points: 0,
        cardActive: 0,
        showResolution: false,
        color: randomColor()
    }

    componentDidMount() {
        const { itens } = this.props
        itens !== undefined && this.setState({cards: itens.length})

        clearLocalNotification()
        .then(setLocalNotification)
    }

    setResponse = (response) => {
        const { state: { cards, points, cardActive }, props: { itens } } = this
        let tempPoints = itens[cardActive].resolution === response ? points + 1 : points  
        let tempCards = cards - 1
        let tempCardActive = cardActive < itens.length ? cardActive + 1 : itens.length
        return this.setState({cards: tempCards, points: tempPoints, cardActive: tempCardActive, showResolution: false, color: randomColor()})
    }

    reset = () => {
        const { itens } = this.props
        this.setState({cards: itens.length, points: 0, cardActive: 0, showResolution: false });
    }

    render() {
        const { keyPlay, cards, points, cardActive, showResolution } = this.state
        const { itens } = this.props
        return (
            <View key={keyPlay} style={[styles.page, { backgroundColor: this.state.color }]}>
                {
                    cards !== 0 && cardActive < itens.length && (
                        <View style={styles.pagePanel}>
                            <View style={[styles.pageHeader, { flex: 0 }]}>
                                <Text h2 style={styles.pageText}>Points: {points}</Text>
                                <Text h4 style={styles.pageText}>Cards Rest: {cards}</Text>
                            </View>
                            <View style={[styles.pageBody, { flex: 1 }]}>
                                <Text style={[styles.pageText, { fontSize: 16, textAlign: 'center' }]}>{itens[cardActive].question}</Text>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    {
                                        showResolution && (
                                            <Text style={[styles.pageText, { fontSize: 16, color: this.state.color }]}>Resolution: {itens[cardActive].resolution === true ? `Correct` : `Incorrect`}</Text>
                                        )
                                    }
                                    <Button
                                        buttonStyle={[styles.button, { backgroundColor: this.state.color, padding: 16 }]}
                                        fontSize={12}
                                        title='SHOW RESOLUTION' 
                                        onPress={() => this.setState({showResolution: true})}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Button
                                        buttonStyle={[styles.button, { backgroundColor: '#FF6660', padding: 16 }]}
                                        fontSize={14}
                                        title='INCORRECT' 
                                        onPress={() => this.setResponse(false)}
                                    />
                                    <Button
                                        buttonStyle={[styles.button, { backgroundColor: '#26E8BA', padding: 16 }]}
                                        fontSize={14}
                                        title='CORRECT' 
                                        onPress={() => this.setResponse(true)}
                                    />                         
                                </View>

                            </View>
                        </View>
                    )
                }

                {
                    cards === 0 && cardActive === itens.length && (
                        <View style={styles.pagePanel}>
                            <View style={[styles.pageHeader, { flex: 1, justifyContent: 'center' }]}>
                                <Text h2 style={styles.pageText}>Final Points: {points}</Text>
                            </View>
                            <View style={[styles.pageBody, { flex: 1 }]}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Button
                                        buttonStyle={[styles.button, { backgroundColor: this.state.color, padding: 16 }]}
                                        fontSize={14}
                                        title='Restart Quiz' 
                                        onPress={() => this.reset()}
                                    />
                                    <Button
                                        buttonStyle={[styles.button, { backgroundColor: this.state.color, padding: 16 }]}
                                        fontSize={14}
                                        title='Back to Deck' 
                                        onPress={() => Actions.pop()}
                                    />                         
                                </View>
                            </View>
                        </View>
                    )
                }

            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
    }
}


export default connect(mapStateToProps)(Play)