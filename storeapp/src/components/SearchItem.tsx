import React, { useState } from 'react'
import { StoreData } from '../lib/search'
import { View, Pressable, Text, StyleSheet, TouchableHighlight } from 'react-native'
import colors from '../colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface SearchItemProps {
    store: StoreData,
    sendPress: (key: number) => void,
    key: number,
    isPressed: boolean,
    navigateChat: (store: StoreData) => void
}

export default function SearchItem({ store, sendPress, key, isPressed, navigateChat }: SearchItemProps) {
    

    return (
        <Pressable style={styles.container} onPressOut={() => sendPress(key)}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{store.name}</Text>
                <Text style={styles.desc}>{store.location}</Text>
                <Text style={styles.desc}>{isPressed ? store.description : ""}</Text>
            </View>
            <View style={styles.action}>
                <TouchableHighlight style={styles.btn} underlayColor={colors.main} activeOpacity={0.8} onPressOut={() => navigateChat(store)}>
                    <View style={styles.btnInside}>
                        <Text style={styles.btnText}>Open</Text>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginLeft: 21}}>
                            <FontAwesomeIcon icon={faArrowRight} size={30} color="white"/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: colors.mediumlight,
        display: "flex",
        flexDirection: "row"
    },
    btnContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    title: {
        fontSize: 30,
        color: colors.mediumdark
    },
    desc: {
        fontSize: 17,
        color: colors.mediumlight
    },
    action: {
        width: "25%",
        display: "flex",
        justifyContent: "center",
        alignitems: "center"
    },
    textContainer: {
        width: "65%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 25 
    },
    btn: {
        color: "white",
        backgroundColor: colors.dark,
        display: "flex",
        flexDirection: "row",
        width: 125,
        height: 50,
        padding: 10
    },
    btnActive: {
        color: "white",
        backgroundColor: colors.main,
        display: "flex",
        flexDirection: "row",
        width: 175,
        height: 50,
        padding: 10
    },
    btnText: {
        color: "white",
        borderRightWidth: 2,
        borderRightColor: colors.medium,
        paddingRight: 10,
        fontSize: 20,
        width: "70%",
        textAlign: "center"
    },
    btnInside: {
        display: "flex",
        flexDirection: "row",
    },
    btnHover: {
        color: "white",
        backgroundColor: colors.dark,
        display: "flex",
        flexDirection: "row",
        width: 170,
        height: 50,
        padding: 10
    },
})