import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import DeckList from "./DeckList";
import AddDeck from './AddDeck'

/**
 * @description Tsb navigator for Decklist and New Deck screens
 */
const DeckTabs = createMaterialTopTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions:{
            title: 'All Decks'
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions:{
            title: 'New Deck'
        }
    }
},
{        
    initialRouteName: 'DeckList',
    backBehavior: 'initialRoute',
    tabBarOptions: {
        order: ['DeckList', 'AddDeck'],
        labelStyle: {
        fontSize: 18,
        },
        style: {
            backgroundColor: '#6495ed',
        },
    }
})
export default createAppContainer(DeckTabs)