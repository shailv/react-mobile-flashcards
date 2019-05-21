import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { connect } from "react-redux";
import { styles } from "../utils/styles";
import { getAllDecks } from "../actions/decks";
import { withNavigationFocus } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { getDecks } from "../utils/api";

/**
 * @description Display all the decks
 */
class DeckList extends Component {
  constructor(props) {
    super(props);
    state = {
      isLoading: true
    };
  }

  /**
   * @description Fetch data whenever this component is in focus
   */
  componentDidMount() {
    this.props.dispatch(getAllDecks());

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.fetchData();
      }
    );
  }
  /**
   * @description Fetch data for all the decks
   */
  fetchData() {
    getDecks().then(results => {
      this.setState(() => ({
        decks: results,
        isLoading: false
      }));
    });
  }
  render() {
    var deckObject = {};
    var allDecks = {};
    if (this.state !== null) {
      deckObject = Object.assign([], this.state.decks);
      allDecks = Object.keys(deckObject).map(d => deckObject[d]);
    }
    const { navigation } = this.props;

    return (
      <ScrollView>
        {this.state !== null && this.state.isLoading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <View>
            {this.state !== null && (
              <View style={[styles.container, styles.centerContent]}>
                <View style={styles.statusBar}>
                  <StatusBar barStyle="light-content" />
                </View>
                {allDecks.map(deck => (
                  <View key={deck.title}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Deck", { deckTitle: deck.title })
                      }
                    >
                      <View style={styles.deckOuter}>
                        <Text style={styles.deckTitle}>{deck.title}</Text>
                        <Text style={styles.deckSubtitle}>
                          {deck.questions !== undefined
                            ? deck.questions.length + " cards"
                            : "0 cards"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}
export default connect(mapStateToProps)(withNavigationFocus(DeckList));