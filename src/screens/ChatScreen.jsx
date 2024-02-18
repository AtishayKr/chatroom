import { useRoute } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'


const ChatScreen = () => {
    const route = useRoute();
    const [messages, setMessages] = useState([])

    const sessionId = "atishay8433244675";
    const userId = route.params.data.userId;

    useEffect(() => {
        const subscriber = firestore()
            .collection("chats")
            .doc(sessionId)
            .collection("messages")
            .orderBy("createdAt", "desc");
        subscriber.onSnapshot((querysnapshot) => {
            const allmessages = querysnapshot.docs.map((item) => {
                return { ...item._data }
            })
            setMessages(allmessages);
        });

        return () => subscriber;

    }, [])

    const onSend = useCallback((messages = []) => {
        console.log(messages)
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: userId,
            sendTo: sessionId,
            createdAt: Date.parse(msg.createdAt),
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        firestore()
            .collection("chats")
            .doc(sessionId)
            .collection("messages")
            .add(myMsg)
    }, [])
    return (
        <View style={styles.mainContainer}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                }}
            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})