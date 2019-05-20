import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {addDeck} from '../actions/decks'
import {styles} from '../utils/styles'
import { connect } from 'react-redux';
import {saveDeckTitle} from '../utils/api'

class AddDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deckTitle: ''
        }
    }
    addDeck = () =>{ 
        const newDeck = {
            [this.state.deckTitle]: {
                title: this.state.deckTitle,
                questions: []
            }
        }

        this.props.dispatch(addDeck(newDeck, () => {
            this.props.navigation.navigate('DeckList');
            }
        ));
        
        //async add deck
        saveDeckTitle(this.state.deckTitle);
    }
    render(){
        return(
            <View style={[styles.container, styles.centerContent]}>
                <Text>Create a new Deck</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(deckTitle) => this.setState({deckTitle})}
                    value={this.state.deckTitle} 
                    placeholder='Deck title'
                />
                <TouchableOpacity onPress={this.addDeck} style={[styles.button, styles.submitBtn]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddDeck)