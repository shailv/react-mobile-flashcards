import {AsyncStorage} from 'react-native'

/**
 * @description Add an entry for the date quiz was taken
 * @param {key} param0 
 * @param {entry}
 */
export function logDailyQuiz({key, data}){
    AsyncStorage.setItem(key, JSON.stringify(data));
}

export function getDailyQuiz({key}){
    AsyncStorage.getItem(key)
    .then((results) => {
        return results === null ? null : JSON.stringify(results)
    })
}


