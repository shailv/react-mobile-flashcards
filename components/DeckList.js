import React, { Component } from "react";
import {StyleSheet, Text,View,TouchableOpacity,StatusBar, FlatList} from "react-native";
import { connect } from "react-redux";
import { styles } from "../utils/styles";
import { getAllDecks } from "../actions/decks";
import {withNavigationFocus} from 'react-navigation'
import { ScrollView } from "react-native-gesture-handler";

class DeckList extends Component {
componentDidMount() {
    this.props.dispatch(getAllDecks());
}
  componentDidUpdate(prevProps) {
    if(prevProps.isFocused  !== this.props.isFocused){
        //fetch decks
        this.props.dispatch(getAllDecks());
    }
  }
  render() {
    var deckObject = {};
    var allDecks = {};
    if (this.props.decks !== null) {
      deckObject = Object.assign([], this.props.decks[0]);
      allDecks = Object.keys(deckObject).map(d => deckObject[d]);
    }
    const { navigation } = this.props.screenProps;

    return (
        <ScrollView>
        {this.props.decks !== null && (
            <View style={[styles.container, styles.centerContent]}>
            <View style={styles.statusBar}>
                <StatusBar barStyle="light-content" />
            </View>
            {allDecks.map(deck => (
                <View key={deck.title} style={styles.deckOuter}>
                <TouchableOpacity
                    onPress={() =>
                    navigation.navigate("Deck", { deckTitle: deck.title })
                    }
                >
                    
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.deckSubtitle}>
                    {deck.questions.length} cards
                    </Text>
                </TouchableOpacity>
                </View>
            ))}
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
