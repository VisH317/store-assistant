import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableHighlight, Pressable } from 'react-native'
import colors from '../colors'
import { StoreData } from '../lib/search'
import ChatItem from '../components/ChatItem'
import storeCompletion from '../lib/openai'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import supabase from '../lib/supabase'

export default function Chat({ route, navigation }: any): JSX.Element {

    const store: StoreData = route.params.store

    const [messages, setMessages] = useState<Message[]>([])
    const [msgText, setMsgText] = useState<string>("")

    const addMessage = async () => {
        const msg: Message = {
            sender: "user",
            content: msgText
        }
        setMessages([...messages, msg])

        // const res = await storeCompletion(store.prompt, msgText)
        const { data, error } = await supabase.functions.invoke('storeChat', {
            body: msg
        })
        console.log("error: ", error)
        const resMsg: Message = {
            sender: "system",
            content: data
        }
        setMessages([...messages, resMsg])
    }

    const mapMessages = () => {
        return messages.map(m => <ChatItem isUser={m.sender==="user"} text={m.content}/>)
    }

    const returnToHome = () => {
        navigation.navigate("Search")
    }

    return (
        <View>
            <View style={styles.header}>
                <Pressable style={styles.back} onPressOut={returnToHome}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} color={colors.medium}/>
                </Pressable>
                <Text style={styles.headerText}>{store.name}</Text>
            </View>
            <ScrollView style={styles.msgs}>
                {mapMessages()}
            </ScrollView>
            <View style={styles.newMsg}>
                <View style={styles.msgField}>
                    <TextInput style={styles.input} placeholder="Send a question..." value={msgText} onChangeText={e => setMsgText(e)}/>
                </View>
                <View style={styles.sendContainer}>
                    <TouchableHighlight style={styles.send} underlayColor={colors.main} activeOpacity={0.6} onPressOut={addMessage}>
                        <FontAwesomeIcon icon={faPaperPlane} size={20} color="white"/>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "7%",
        backgroundColor: colors.light,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    back: {
        height: "100%",
        width: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 0
    },
    headerText: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    msgs: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "column"
    },
    newMsg: {
        width: "100%",
        backgroundColor: colors.light,
        height: "20%",
        display: "flex",
        flexDirection: "row"
    },
    msgField: {
        width: "75%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    input: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.verylight
    },
    sendContainer: {
        width: "25%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    send: {
        width: 28,
        height: 28,
        borderRadius: 16,
        padding: 4,
        backgroundColor: colors.main
    }
})

type Message = {
    sender: "user" | "system",
    content: string
}
