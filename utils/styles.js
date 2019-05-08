import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centerContent:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckOuter: {
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderWidth: 1,
        width: 200,
        height: 200,
    },
    deckTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6495ed',
        marginTop: 30
    },
    deckSubtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30
    },
    statusBar: {
        backgroundColor: 'green'
    },
    input: {
        height: 50, 
        width: 250,
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 20
    },
    button:{
        width: 150,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 2,
        marginTop: 20,
        borderRadius: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        alignContent: 'center',
        fontSize: 20,
        marginTop:10,
        color: '#fff'
    },
    submitBtn: {
        backgroundColor: '#9acd32'
    },
    addCardBtn: {
        backgroundColor: '#9acd32'
    },
    quizBtn: {
        backgroundColor: '#6495ed'
    },
    correctBtn:{
        backgroundColor: '#9acd32'
    },
    incorrectBtn: {
        backgroundColor: '#cc0000'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignContent: 'center',
        marginTop:10
    },
    viewLink: {
        color: '#9acd32', 
        fontWeight: 'bold'
    }
})