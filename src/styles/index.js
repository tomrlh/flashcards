import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    navTitle: {
        color: '#FFF'
    },
    nav: {
        backgroundColor: '#333'
    },
    card: {
        borderRadius: 20, borderWidth: 3, elevation: 0
    },
    cardImage: {
        borderTopRightRadius: 14, borderTopLeftRadius: 14, height: 110
    },
    button: {
        borderRadius: 100, margin: 8, elevation: 3, padding: 10
    },
    page: {
        flex: 1, justifyContent: 'space-between', alignItems: 'center'
    },
    pagePanel: {
        flex: 1, backgroundColor: '#FFF', margin: 20, width: '90%', borderRadius: 5, padding: 10, justifyContent: 'space-around'
    },
    pageHeader: {
        justifyContent: 'center', alignItems: 'center'
    },
    pageBody: {
        width: '100%', justifyContent: 'center', alignItems: 'center'
    },
    pageText: {
        color: '#333', margin: 10
    },
    inputPanel: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'  
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: '#333'
    },
    errorPanel: {
        flex: 0,
        backgroundColor: '#FF6660', 
        padding: 10,
        margin: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    error: {
        color: '#FFFFFF'
    }
})

export default styles;