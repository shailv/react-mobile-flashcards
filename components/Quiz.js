import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {styles} from '../utils/styles';
import Card from './Card';
import {setLocalNotification, clearLocalNotification} from '../utils/api';

/**
 * @description: Display all cards for the quiz
 */
class Quiz extends React.Component{
    constructor(props){
        super(props);
        var questionCount = 0;

        if(props.navigation !== undefined){
            questionCount = props.navigation.getParam('deck').questions.length;
        }

        this.state = {
            questionsAnswered: 0,
            totalQuestions: questionCount,
            questionNumber: 1,
            displayResult: false
        }
    }
    logAnswer = (choice) => {
        const questionNumber = this.state.questionNumber;
        const questionCount = this.state.totalQuestions;
        const newQuestionNumber = (questionCount >= questionNumber) ? questionNumber + 1 : questionNumber;
        
        this.setState((prevState) => {
            return {
                questionsAnswered: (choice === 1) ? prevState.questionsAnswered + 1 : prevState.questionsAnswered,
                questionNumber: newQuestionNumber,
                displayResult: (newQuestionNumber > questionCount) ? true : false
            }
        });

        //clear today's notification and set it for tomorrow
        clearLocalNotification()
            .then(setLocalNotification)
    }
    restartQuiz = () => {
        var questionCount = 0;

        if(this.props.navigation !== undefined){
            questionCount = this.props.navigation.getParam('deck').questions.length;
        }
        this.setState(() => ({
            questionsAnswered: 0,
            totalQuestions: questionCount,
            questionNumber: 1,
            displayResult: false
        }))
    }

    render(){
        const {navigation} = this.props;        
        const deck = navigation.getParam('deck')

    return(
        <View style={[styles.container, styles.centerContent]}>

            {/* //If all questions have been answered, display the result */}
            {(!this.state.displayResult) ? 
                <View>
                    <Text style={styles.deckSubtitle}>{this.state.questionNumber} / {this.state.totalQuestions}</Text>

                    {(deck.questions.length > 0) && 
                        <Card card={deck.questions[this.state.questionNumber - 1]} logAnswer={this.logAnswer}/>
                    }
                </View>
            :
                <View style={styles.centerContent}>
                    <Text style={styles.deckTitle}>Your Quiz Score</Text>
                    <Text style={styles.deckSubtitle}>{this.state.questionsAnswered} / {this.state.totalQuestions}</Text>
                    <Text style={styles.deckSubtitle}>{this.state.questionsAnswered / this.state.totalQuestions * 100}%</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Deck', {deckTitle: deck.title})} style={[styles.button, styles.submitBtn]}>
                        <Text style={styles.buttonText}>Back to Deck</Text> 
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.button, styles.quizBtn]} onPress={this.restartQuiz}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
}
function mapStateToProps(state){
    return{
        cards: state.cards
    }
}
export default connect(mapStateToProps)(Quiz)
