import React from 'react';
import { Text, View, TouchableOpacity, TextInput} from 'react-native'
import {addCard} from '../actions/cards'
import {styles} from '../utils/styles'
import { connect } from 'react-redux'
import {addCardToDeck} from '../utils/api'

class AddCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
    }
    addCard = () =>{ 
        const deck = this.props.navigation.getParam('deck');
        const newCard = {
            question: this.state.question,
            answer: this.state.answer
        }
        
        this.props.dispatch(addCard(newCard, deck));

        //async add card
        addCardToDeck(deck.title, newCard).then(() => {
            this.props.navigation.navigate('Deck', {deckTitle: deck.title});
        });
    }
    render(){
        
        return(
            <View style={[styles.container, styles.centerContent]}>
                <TextInput
                    style={styles.input}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question} 
                    placeholder='Enter the Question'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    placeholder='Enter the Answer'
                />
                <TouchableOpacity onPress={this.addCard} style={[styles.button, styles.submitBtn]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddCard)