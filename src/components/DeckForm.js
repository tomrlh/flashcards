import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Text, FormValidationMessage, Button } from 'react-native-elements'
import { addDeck } from '../actions/decks'
import { Actions } from 'react-native-router-flux'

class DeckForm extends Component {

    state = {
        title: ''
    }

    confirm = () => {
        const { title } = this.state
        title.length > 0 ? (
            this.props.dispatch(addDeck({title: title}))
        ) : (
            this.setState({err: [{
                input: 'TITLE',
                msg: 'NOT TITLE FILLED!'
            }]})
        )
    }

    componentDidUpdate(oldProps) {
        if (this.props.decks !== oldProps.decks) {
            const newDeck = this.props.decks[this.props.decks.length - 1];
            return Actions.deckView({ ...newDeck })
        }
    }

    render() {
        return (
            <View>
                <View style={{ padding: 20 }}>
                    <View style={{ flex: 1, width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text h4>Title*:</Text>
                            
                            <TextInput
                                style={{ width: '100%', height: 50, borderWidth: 1, padding: 10, color: 'black' }}
                                onChangeText={(text) => this.setState({title: text.toUpperCase()})}
                                value={this.state.title}
                            />
                            {
                                this.state.err && this.state.err.map((error, index) => {
                                    if (error.input === 'title') {
                                        return <HelperText type="error" key={index}>{error.msg}</HelperText>
                                    }
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <Button
                            buttonStyle={{ marginTop: 80, padding: 16 }}
                            title='NEW DECK' 
                            onPress={() => this.confirm()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        decks: state.decks.decks 
    }
}


export default connect(mapStateToProps)(DeckForm)