import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../colors'

interface ChatItemProps {
    isUser: boolean,
    text: string
}

export default function ChatItem({ isUser, text }: ChatItemProps) {
    return (
        <View style={isUser ? styles.personalChatContainer : styles.resChatContainer}>
            <View style={isUser ? styles.personalInnerChatContainer : styles.resInnerChatContainer}>
                <Text>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    personalChatContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    },
    resChatContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10
    },
    personalInnerChatContainer: {
        width: 200,
        padding: 10,
        fontSize: 15,
        color: colors.mediumdark,
        backgroundColor: colors.mediumlight,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center"
    },
    resInnerChatContainer: {
        width: 200,
        padding: 10,
        fontSize: 15,
        color: colors.mediumdark,
        backgroundColor: colors.medium,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center"
    },
})