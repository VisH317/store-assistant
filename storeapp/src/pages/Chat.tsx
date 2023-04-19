import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function Chat({ route, navigation }: any): JSX.Element {
    return (
        <View>
            <Text>James is a stupid dumdum</Text>
            <Text>{route.params.store.name}</Text>
        </View>
    )
}


