import React, { Component } from 'react'
import { View, Picker, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Text, FormValidationMessage, Button } from 'react-native-elements'
import { addQuestion } from '../actions/decks'
import { validateNecessary } from '../utils/validate'
import { Actions } from 'react-native-router-flux'
import styles from '../styles'

class QuestionForm extends Component {

    state = {
        question: '',
        resolution: undefined
    }

    confirm = () => {
        const { state: { question, resolution }, props: { parentID } } = this

        let err = []
        !validateNecessary(parentID) && err.push({input: 'ID', msg: 'ParentID is null!'});
        !validateNecessary(question) && err.push({input: 'Question', msg: 'Question is null!'});
        !validateNecessary(resolution) && err.push({input: 'Resolution', msg: 'Resolution not selected!'});

        err.length === 0 ? (
            this.props.dispatch(addQuestion({
                parentID: parentID,
                question: question,
                resolution: resolution,
            }))
        ) : (
            this.setState({err})
        )
    }

    componentDidUpdate(oldProps) {
        this.props.decks !== oldProps.decks && Actions.popTo('deckView', {id: this.props.parentID, color: this.props});
    }

    render() {
        const color = this.props.color;

        return (

            <View style={[styles.page, { backgroundColor: color }]}>
                <View style={[styles.pagePanel, { padding: 20 }]}>
                    <View style={[styles.pageHeader, { flex: 1, width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }]}>
                        <View style={styles.inputPanel}>
                            <Text h4 style={[styles.text, { color: color }]}>Question*:</Text>
                            
                            <TextInput
                                style={[styles.input, { borderColor: color, color: color }]}
                                placeholder="Insert question of the card"
                                onChangeText={(text) => this.setState({question: text})}
                                value={this.state.question}
                            />
                            {
                                this.state.err && this.state.err.map((error, index) => {
                                    if (error.input === 'Question') {
                                        return <FormValidationMessage key={index}>Error: {error.msg}</FormValidationMessage>
                                    }
                                })
                            }
                        </View>
                        <View style={styles.inputPanel}>
                            <View style={[styles.input, { borderColor: color, color: color, marginTop: 5, padding: 5 }]}>
                                <Picker
                                    selectedValue={this.state.resolution}
                                    style={{ color: color }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({resolution: itemValue})}
                                >
                                    <Picker.Item label="Select Resolution!" value={undefined} />
                                    <Picker.Item label="Correct" value={true} />
                                    <Picker.Item label="Incorrect" value={false} />
                                </Picker>
                            </View>
                            
                            {
                                this.state.err && this.state.err.map((error, index) => {
                                    if (error.input === 'Resolution') {
                                        return <FormValidationMessage key={index}>Error: {error.msg}</FormValidationMessage>
                                    }
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.pageBody}>
                        <Button
                            buttonStyle={[styles.button, { backgroundColor: color, padding: 16 }]}
                            icon={{name: 'plus-circle', type: 'font-awesome'}}
                            title='Create Card' 
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


export default connect(mapStateToProps)(QuestionForm)