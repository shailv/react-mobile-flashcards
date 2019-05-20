import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

export const DECKS_KEY = "MobileFlashcards:decks";
const NOTIFICATION_KEY = "MobileFlashcards:notifications";
/**
 * @description Add an entry for the date quiz was taken
 * @param {key} param0
 * @param {entry}
 */

//Add deck
export function saveDeckTitle(data){
    return AsyncStorage.mergeItem(DECKS_KEY, 
        JSON.stringify({
            [data]: {title: data}
        }))
        .then(() => {
            AsyncStorage.getItem(DECKS_KEY).then(decks => {
                console.log('decks', decks);
            })
        });
}

//Add card
export function addCardToDeck(key, data){
    return AsyncStorage.getItem(DECKS_KEY)
        .then((results) => {
            if(results !== null){
                const allDecks = JSON.parse(results);
                const deck = allDecks[key];

                //Update the deck with the new card
                if(deck.questions !== undefined){
                    deck.questions.push(data);
                }
                else{
                    deck.questions = new Array();
                    deck.questions.push(data);
                }
                allDecks[key] = deck;

                if(deck!== null){
                    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(allDecks))
                }
            }
        })
}

//Get all Decks
export async function getDecks(){
    let alldecks = await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse);
    return alldecks;
}

//Get Deck
export function getDeck(title){
    return AsyncStorage.getItem(DECKS_KEY)
      .then(data => {
          if(data.length > 0){
            const allDecks = JSON.parse(data);
              const deck = allDecks[title];
              return deck;
          }
      });
}

//Notifications
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
        if (status === "granted") {
          Notifications.cancelAllScheduledNotificationsAsync();

          var scheduledTime = new Date();
          scheduledTime.setDate(scheduledTime.getDate() + 1);
          scheduledTime.setHours(22);
          scheduledTime.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: scheduledTime,
            repeat: "day"
          });

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      });
    }
  });
}

function createNotification() {
  return {
    title: "Take your daily quiz",
    body: "Don't forget to take your daily quiz",
    ios: {
      sound: true
    },
    andriod: {
      sound: true,
      priority: "high",
      sticky: false
    }
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}
