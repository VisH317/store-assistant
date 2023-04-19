import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../colors'
import { StoreData } from '../lib/search'
import ChatItem from '../components/chatItem'


export default function Chat({ route, navigation }: any): JSX.Element {

    const store: StoreData = route.params.store

    return (
        <View>
            <View style={styles.header}>
                <Text>{store.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 125,
        backgroundColor: colors.light
    },
})
