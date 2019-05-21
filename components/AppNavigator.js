import {createStackNavigator,createAppContainer} from 'react-navigation'
import DeckList from "./DeckList";
import Deck from "./Deck";
import AddCard from './AddCard'
import Quiz from './Quiz'
import DeckTabs from './TabNavigator'

/**
 * @description Stack navigator for all the screens
 */
const AppNavigator = createStackNavigator({
    Home:{
      screen: DeckTabs,
      navigationOptions: {
        title: "Home"
      }
    },
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            title:"All Decks"
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            title:"Deck"
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions:{
            title: "Add a Card"
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions:{
            title: "Quiz"
        }
    }
  })
export default createAppContainer(AppNavigator);