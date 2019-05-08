import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import DeckTabs from './TabNavigator'
import {styles} from '../utils/styles'

class Home extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}> 
        <DeckTabs screenProps={ {navigation: navigation}}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return{
        decks: state.decks
    }
}
export default connect(mapStateToProps)(Home);


