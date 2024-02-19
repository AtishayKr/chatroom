import { useRoute } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Actions, Avatar, Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import Icons from 'react-native-vector-icons/Entypo'
import { Header } from '../components/common'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';


const ChatScreen = () => {
    const route = useRoute();
    const [messages, setMessages] = useState([])
    const [storeImgPath, setstoreImgPath] = useState();

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
            image: storeImgPath ? storeImgPath : "",
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

    const chooseImage = async () => {
        const result = await launchImageLibrary();
        UploadImg(result)
    }

    const UploadImg = async (result) => {
        const refrence = storage().ref(result.assets[0].fileName);
        await refrence.putFile(result.assets[0].uri);
        const url = await storage().ref(result.assets[0].fileName).getDownloadURL();
        setstoreImgPath(url)
        console.log(storeImgPath)
    }

    const renderSend = props => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity opacity={0.7} onPress={chooseImage}>
                    <Icons name="attachment" size={30} />
                </TouchableOpacity>
                <Send {...props}>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#08B29F',
                            padding: 12,
                            borderRadius: 100,
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginLeft: 5,
                            marginHorizontal: 1,
                            marginVertical: 1
                        }}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/img/send-message.png')}
                        />
                    </View>
                </Send>
            </View >
        );
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor='#008069' />
            <ImageBackground resizeMode='cover' style={{ flex: 1 }} source={require('../assets/img/chatbackground.jpg')} >
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: userId,
                        name: userName,
                    }}
                    placeholder='Message'
                    renderBubble={props => {
                        // console.log(props)
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
                                    },
                                    left: {
                                        backgroundColor: 'white'
                                    }
                                }}
                                usernameStyle={{
                                    marginTop: -40
                                }}

                            />
                        );
                    }}
                    renderUsernameOnMessage={true}
                    renderAvatarOnTop={true}
                    textInputStyle={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        paddingHorizontal: 12,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        elevation: 5,
                    }}
                    renderSend={renderSend}
                    alwaysShowSend={true}
                />
            </ImageBackground>
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