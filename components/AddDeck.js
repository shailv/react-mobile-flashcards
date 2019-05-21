import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {addDeck} from '../actions/decks'
import {styles} from '../utils/styles'
import { connect } from 'react-redux';
import {saveDeckTitle} from '../utils/api'

/**
 * @description: Display a form to add a new deck
 */
class AddDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deckTitle: '',
            isEmpty: false
        }
    }
    /**
     * @description Reset the input field if this component is in focus
     */
    componentDidMount(){
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            () => {
              this.resetForm();
            }
          );
    }

    /**
     * @description Rest the input field
     */
    resetForm = () => {
        this.setState(() => ({
            deckTitle: '',
            isEmpty: false
        }))
    }

    /**
     * @description Save the new deck in asyncstorage and redux state
     */
    addDeck = () =>{ 
        //check if input is empty and display message
        if(this.state.deckTitle === ""){
            this.setState(() => ({
                isEmpty: true
            }))
            return false;
        }
        const newDeck = {
            [this.state.deckTitle]: {
                title: this.state.deckTitle,
                questions: []
            }
        }
        //add deck to asyncstorage
        saveDeckTitle(this.state.deckTitle);

        //add deck to redux state
        this.props.dispatch(addDeck(newDeck, () => {
            this.props.navigation.navigate('Deck', {deckTitle: this.state.deckTitle});
            }
        ));
    }
    render(){
        return(
            <View style={[styles.container, styles.centerContent]}>
                <Text style={[styles.deckSubtitle, {marginBottom: 10}]}>Create a new Deck</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(deckTitle) => this.setState({deckTitle})}
                    value={this.state.deckTitle} 
                    placeholder='Deck Title'
                />
                <TouchableOpacity onPress={this.addDeck} style={[styles.button, styles.submitBtn]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {this.state.isEmpty && 
                    <Text>* Please enter a value for Deck Title</Text>
                }
            </View>
        )
    }
}

export default connect()(AddDeck)