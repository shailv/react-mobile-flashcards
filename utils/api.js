import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

export const DECKS_KEY = "MobileFlashcards:decks";
const NOTIFICATION_KEY = "MobileFlashcards:notifications";

/**
 * @description Add a new deck
 * @param {string} data Title of the new deck
 */
export function saveDeckTitle(data) {
  return AsyncStorage.mergeItem(
    DECKS_KEY,
    JSON.stringify({
      [data]: { title: data }
    })
  );
}

/**
 * @description Add a new card to the specified deck and update the Asyncstorage object
 * @param {string} key Title of deck
 * @param {object} data New card to be added
 */
export function addCardToDeck(key, data) {
  return AsyncStorage.getItem(DECKS_KEY).then(results => {
    if (results !== null) {
      const allDecks = JSON.parse(results);
      const deck = allDecks[key];

      //Update the deck with the new card
      if (deck.questions !== undefined) {
        deck.questions.push(data);
      } else {
        deck.questions = new Array();
        deck.questions.push(data);
      }
      allDecks[key] = deck;

      if (deck !== null) {
        AsyncStorage.setItem(DECKS_KEY, JSON.stringify(allDecks));
      }
    }
  });
}

/**
 * @description Retrieve all decks from Asyncstorage
 */
export async function getDecks() {
  let alldecks = await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse);
  return alldecks;
}

/**
 * @description Retrieve the deck object given its title
 * @param {string} title
 */
export function getDeck(title) {
  return AsyncStorage.getItem(DECKS_KEY).then(data => {
    if (data.length > 0) {
      const allDecks = JSON.parse(data);
      const deck = allDecks[title];
      return deck;
    }
  });
}

//Notifications
/**
 * @description Set local notification to the next day at 22:00
 */
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

/**
 * @description Create notification message
 */
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

/**
 * @description Clear all existing notifications
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
