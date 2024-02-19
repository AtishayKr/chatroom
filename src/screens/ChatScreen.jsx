import { useRoute } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Avatar, Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import Icons from 'react-native-vector-icons/Entypo'
import { Header } from '../components/common'


const ChatScreen = () => {
    const route = useRoute();
    const [messages, setMessages] = useState([])

    const sessionId = "atishay8433244675";
    const userId = route.params.data.userId;
    const userName = route?.params?.data?.name;

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

    // const customInputToolbar = props => {
    //     return (
    //         <>
    //             <InputToolbar
    //                 {...props}
    //                 containerStyle={{
    //                     backgroundColor: "gray",
    //                     borderRadius: 50,
    //                     width: '90%'
    //                 }}
    //             />
    //             <View  style={{
    //                 width: '10%',
    //                 height: 45,
    //                 borderRadius: 50,
    //                 backgroundColor: "gray",
    //                 alignSelf: 'flex-end'
    //             }}></View>
    //         </>
    //     )
    // }

    return (
        <View style={styles.mainContainer}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                    name: userName,
                }}
                placeholder='Message'
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: {
                                    color: 'black',
                                },
                                left: {
                                    marginTop: 25,
                                }
                            }}
                            timeTextStyle={{
                                right: {
                                    color: '#000000',
                                    opacity: 0.45,
                                },
                            }}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: '#DCF7C5',
                                }
                            }}
                            usernameStyle={{
                                // backgroundColor: 'black',
                                marginTop: -40
                            }}

                        />
                    );
                }}
                // renderInputToolbar={props => customInputToolbar(props)}
                // renderMessage={(props) => renderCustomMessage(props)}
                // renderBubble={(props) => renderCustomBubble(props)}
                renderUsernameOnMessage={true}
                renderAvatarOnTop={true}
            // showAvatarForEveryMessage={true}
            // isTyping={true}
            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray'
    }

})