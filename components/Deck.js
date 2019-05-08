import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import {getAllDecks} from '../actions/decks'
import {styles} from '../utils/styles'

/**
 * @description: Display single deck
 */
class Deck extends React.Component{
    componentDidMount(){
        //fetch decks
        this.props.dispatch(getAllDecks());
    }
    render(){
        const {navigation} = this.props
        const deckTitle = navigation.getParam('deckTitle');
        
        const allDecks = Object.values(this.props.decks[0]);
        const deck = Object.values(allDecks.filter(deck => deck.title === deckTitle))[0];

    return(
        <View style={[styles.container, styles.centerContent]}>
         {deck!== undefined && 
            <View>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text style={styles.deckSubtitle}>{deck.questions.length} cards</Text>
                <TouchableOpacity style={[styles.button, styles.addCardBtn]} onPress={() => navigation.navigate('AddCard', {deck: deck})}>
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.quizBtn]} onPress={() => navigation.navigate('Quiz', {deck: deck})}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        }
        </View>
    )
    }
}

function mapStateToProps(state){
    return{
        decks: state.decks
    }
}
export default connect(mapStateToProps)(Deck)