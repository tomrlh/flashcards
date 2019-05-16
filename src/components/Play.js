import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

class Play extends Component {

    state = { color: 'black', keyPlay: 0, cards: 0, points: 0, cardActive: 0, showResolution: false }

    componentDidMount() {
        const { itens } = this.props
        itens !== undefined && this.setState({cards: itens.length})

    }

    setResponse = (response) => {
        const { state: { cards, points, cardActive }, props: { itens } } = this
        let tempPoints = itens[cardActive].resolution === response ? points + 1 : points  
        let tempCards = cards - 1
        let tempCardActive = cardActive < itens.length ? cardActive + 1 : itens.length
        return this.setState({cards: tempCards, points: tempPoints, cardActive: tempCardActive, showResolution: false})
    }

    reset = () => {
        const { itens } = this.props
        this.setState({cards: itens.length, points: 0, cardActive: 0, showResolution: false });
    }

    render() {
        const { keyPlay, cards, points, cardActive, showResolution } = this.state
        const { itens } = this.props
        return (
            <View key={keyPlay}>
                {
                    cards !== 0 && cardActive < itens.length && (
                        <View>
                            <View style={{ flex: 0 }}>
                                <Text h2>Points: {points}</Text>
                                <Text h4>Cards Rest: {cards}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>{itens[cardActive].question}</Text>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                                    {
                                        showResolution && (
                                            <Text style={{ fontSize: 16, color: 'black' }}>Resolution: {itens[cardActive].resolution === true ? `Correct` : `Incorrect`}</Text>
                                        )
                                    }
                                    <Button
                                        buttonStyle={{ backgroundColor: 'gray', padding: 16, marginTop: 20 }}
                                        fontSize={12}
                                        title='ANSWER' 
                                        onPress={() => this.setState({showResolution: true})}
                                    />
                                </View>
                                <View style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 60}}>
                                    <Button
                                        buttonStyle={{ backgroundColor: 'red', width: '30%'}}
                                        large
                                        title='NO' 
                                        onPress={() => this.setResponse(false)}
                                    />
                                    <Button
                                        buttonStyle={{ backgroundColor: 'green', marginTop: 70, width: '30%'}}
                                        large
                                        title='YES' 
                                        onPress={() => this.setResponse(true)}
                                    />                         
                                </View>

                            </View>
                        </View>
                    )
                }
                {
                    cards === 0 && cardActive === itens.length && (
                        <View style={{ marginTop: 50 }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text h2>Final Points: {points}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Button
                                        buttonStyle={{ backgroundColor: 'blue', padding: 16, marginTop: 60 }}
                                        fontSize={14}
                                        title='RESTART' 
                                        onPress={() => this.reset()}
                                    />
                                    <Button
                                        buttonStyle={{ backgroundColor: 'orange', padding: 16, marginTop: 20 }}
                                        fontSize={14}
                                        title='RETURN' 
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