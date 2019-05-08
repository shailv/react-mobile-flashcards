import {createStackNavigator,createAppContainer} from 'react-navigation'
import Home from "./Home";
import DeckList from "./DeckList";
import Deck from "./Deck";
import AddCard from './AddCard'
import Quiz from './Quiz'

const AppNavigator = createStackNavigator({
    Home:{
      screen: Home,
      navigationOptions: {
        title:"Mobile Flashcards"
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