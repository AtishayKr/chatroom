import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Icons from 'react-native-vector-icons/Entypo'

const Header = ({ title, leftIcon, rightIcon, leftIconPress, rightIconPress }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            {leftIcon ? <TouchableHighlight ><Icons name="arrow-long-left" size={30} /></TouchableHighlight> : <Text>{" "}</Text>}
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rightContainer} >
                {rightIcon ? <>
                    <View style={styles.textCont}>
                        <Text style={styles.text}>{cart.length}</Text>
                    </View>
                    <Icons onPress={() => navigation.push("MyCart")} name="heart-outlined" size={40} /></>
                    : <Text>{" "}</Text>}
            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        // backgroundColor: 'gray'
    },
    leftIcon: {
        height: 25,
        width: 35
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    textCont: {
        position: 'absolute',
        zIndex: 100,
        marginTop: 20,
        marginLeft: 6,
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontSize: 20,
        borderRadius: 50,
        alignSelf: 'center',
    }

})
