import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {styles} from '../utils/styles'
import {setLocalNotification} from '../utils/api'
import {getAllDecks} from '../actions/decks';

class Home extends React.Component {
  componentDidMount(){
    setLocalNotification();
    //fetch decks
    this.props.dispatch(getAllDecks());
  }
  render() {
    return (
      <View style={styles.container}> 
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