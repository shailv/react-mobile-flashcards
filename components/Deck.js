import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";
import { styles } from "../utils/styles";
import { getDeck } from "../utils/api";

/**
 * @description: Display single deck
 */
class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {},
      deckTitle: props.navigation.getParam("deckTitle")
    };
  }
  /**
   * @description Update the Back button to navigate to the Decklist tab
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate("DeckList")}
          title="< Home"
        />
      )
    };
  }
  /**
   * @description Fetch data whenever this component is in focus
   */
  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.fetchData();
      }
    );
  }
  /**
   * @description Get deck details from asyncstorage
   */
  fetchData = () => {
    if (this.state !== null && this.state.deckTitle !== null) {
      getDeck(this.state.deckTitle).then(results => {
        this.setState(() => ({
          deck: results,
          isLoading: false
        }));
      });
    }
  }
  render() {
    const { navigation } = this.props;
    let deck = {};
    if (this.state !== null) {
      deck = this.state.deck;
    }
    return (
      <View style={[styles.container, styles.centerContent]}>
        {deck !== undefined && (
          <View>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text style={styles.deckSubtitle}>
              {deck.questions !== undefined
                ? deck.questions.length + " cards"
                : "0 cards"}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.addCardBtn]}
              onPress={() => navigation.navigate("AddCard", { deck: deck })}
            >
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={deck.questions !== undefined ? [styles.button, styles.quizBtn]: [styles.button, styles.quizBtnDisabled]}
              onPress={() => navigation.navigate("Quiz", { deck: deck })}
              disabled={deck.questions !== undefined ? false : true}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}
export default connect(mapStateToProps)(Deck);
