import React, { Component } from 'react'
import { View, Picker, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Text, FormValidationMessage, Button } from 'react-native-elements'
import { addQuestion } from '../actions/decks'
import { validateNecessary } from '../utils/validate'
import { Actions } from 'react-native-router-flux'

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
        this.props.decks !== oldProps.decks && Actions.popTo('deckView', {id: this.props.parentID});
    }

    render() {
        return (
            <View>
                <View style={{padding: 20}}>
                    <View style={{ flex: 1, width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text h4>THE QUESTION:</Text>
                            
                            <TextInput
                                style={{ width: '100%', height: 50, borderWidth: 1, padding: 10, color: 'black' }}
                                onChangeText={(text) => this.setState({question: text})}
                                value={this.state.question}
                            />
                            {
                                this.state.err && this.state.err.map((error, index) => {
                                    if (error.input === 'Question') {
                                        return <Text style={{marginTop: -5}} key={index}>Select the proper answer now</Text>
                                    }
                                })
                            }
                        </View>
                        <View>
                            <View style={{ marginTop: 5, padding: 5, marginTop: 80 }}>
                                <Picker
                                    selectedValue={this.state.resolution}
                                    onValueChange={(itemValue, itemIndex) => this.setState({resolution: itemValue})}
                                >
                                    <Picker.Item label="SELECT" value={undefined} />
                                    <Picker.Item label="YES" value={true} />
                                    <Picker.Item label="NO" value={false} />
                                </Picker>
                            </View>
                            
                            {
                                this.state.err && this.state.err.map((error, index) => {
                                    if (error.input === 'Resolution') {
                                        return <Text style={{marginTop: -5}} key={index}>Select the proper answer now</Text>
                                    }
                                })
                            }
                        </View>
                    </View>
                    <View style={{ marginTop: 140 }}>
                        <Button
                            title='ADD'
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