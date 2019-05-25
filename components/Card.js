import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
import {styles} from '../utils/styles';
/**
 * @description: Display single card with flip animation to view answer
 * and Correct/Incorrect buttons for user choice
 */
class Card extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            flipAnim: new Animated.Value(0),
            flippedValue: 0
        }

        this.state.flipAnim.addListener((value) => {
            this.setState(() => ({
                flippedValue: value
            }))
        })
    }

    /**
     * @description: Log user's answer and reset animated values
     * @param: {int} correct or incorrect value
     */
    logAnswer = (choice) => {
        //reset animation values
        this.setState(() => ({
            flipAnim: new Animated.Value(0),
            flippedValue: 0
        }));

        //send choice to parent
        this.props.logAnswer(choice);
    }
    componentDidMount(){
        const flipAnimation = this.state.flipAnim;
         if(Platform.OS === "android"){
            Animated.sequence([
                Animated.timing(flipAnimation, {
                toValue: 180,
                duration: 1,
                useNativeDriver: true,
                }),
                Animated.timing(flipAnimation, {
                toValue: 0,
                duration: 1,
                useNativeDriver: true,
                }),
            ]).start();
        }
      }
    /**
     * @description: Sets animation values on click of the card
     */
    flipCard = () => {
        const flipAnimation = this.state.flipAnim;

        if(this.state.flippedValue.value >= 90){
            Animated.spring(flipAnimation, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start()
        }
        else{
            Animated.spring(flipAnimation, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start()
        }
    }
    /**
     * @description: Transform style for front of card
     */
    front(){
        return {
            transform: [
            {
                rotateY: this.state.flipAnim.interpolate({
                inputRange: [0,180],
                outputRange: ['0deg', '180deg']
                })
            }
        ]}
    }
    /**
     * @description: Transform style for back of card
     */
    back(){
        return {
            transform: [
                {
                    rotateY: this.state.flipAnim.interpolate({
                        inputRange: [0,180],
                        outputRange: ['180deg', '360deg']
                        })
                }
            ]
        }
    }
    render(){
        const {card} = this.props;
        this.frontOpacity = this.state.flipAnim.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });
      
        this.backOpacity = this.state.flipAnim.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });

        return(
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={this.flipCard}>
                        <Animated.View style={flipStyle.card} >
                            <Animated.View style={[flipStyle.front, this.front(), {opacity: this.frontOpacity}]}>
                                <Text style={flipStyle.text}>{card.question}</Text>
                                <Text style={flipStyle.subtext}>Click to view answer</Text>
                            </Animated.View>
                            <Animated.View style={[flipStyle.back, this.back(), {opacity: this.backOpacity}]}>
                                <Text style={flipStyle.text}>{card.answer}</Text>
                            </Animated.View >
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <View style={styles.centerContent}>
                        <TouchableOpacity style={[styles.button, styles.correctBtn]} onPress={() => this.logAnswer(1)}>
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.incorrectBtn]} onPress={() => this.logAnswer(0)}>
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const flipStyle = StyleSheet.create({
    card: {
        alignItems: 'center'
    },
    front: {
        width: 300,
        height: 300,
        borderColor: '#6495ed',
        borderWidth: 2,
        borderRadius: 5,
        backfaceVisibility: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        padding: 10
    },
    back: {
        position: 'absolute',
        top: 0,
        width: 300,
        height: 300,
        borderColor: '#9acd32',
        borderWidth: 2,
        borderRadius: 5,
        backfaceVisibility: 'hidden',        
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        padding: 10
    },
    text: {
        fontSize: 20
    },
    subtext:{
        fontSize: 18,
        color:'#6495ed',
        paddingTop: 20
    }
})
export default connect()(Card)