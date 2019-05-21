import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { addCard } from "../actions/decks";
import { styles } from "../utils/styles";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";

/**
 * @description Add a new card to the selected deck
 */
class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      isEmpty: false
    };
  }
  /**
   * @description Add new card to the deck and store in asyncstorage and redux state
   */
  addCard = () => {
    //check if input fields are empty and display message
    if (this.state.question === "" || this.state.answer === "") {
      this.setState(() => ({
        isEmpty: true
      }));
      return false;
    }
    const deck = this.props.navigation.getParam("deck");
    const newCard = {
      question: this.state.question,
      answer: this.state.answer
    };

    //add to redux state
    this.props.dispatch(addCard(newCard, deck));

    //add to asyncstorage
    addCardToDeck(deck.title, newCard).then(() => {
      this.props.navigation.navigate("Deck", { deckTitle: deck.title });
    });
  }
  render() {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <TextInput
          style={styles.input}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
          placeholder="Enter the Question"
        />
        <TextInput
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
          placeholder="Enter the Answer"
        />
        <TouchableOpacity
          onPress={this.addCard}
          style={[styles.button, styles.submitBtn]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {this.state.isEmpty && (
          <Text>* Please enter a value for Question and Answer</Text>
        )}
      </View>
    );
  }
}

export default connect()(AddCard);