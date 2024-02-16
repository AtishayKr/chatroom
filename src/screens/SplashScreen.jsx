import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

    const navigation = useNavigation();
    return (
        <View>
            <Text>this is Splash screen</Text>
            <Button onPress={() => navigation.push("Home")} title='Go to HomeScreen' />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})