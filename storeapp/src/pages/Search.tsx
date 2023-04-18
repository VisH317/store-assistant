import React from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import colors from '../colors'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import search from '../lib/search'

export default function Search({ navigation }: any): JSX.Element {

    const returnToHome = () => {
        navigation.navigate("Home")
    }

    const getStores = (name: string) => {

    }

    return (
        <View>
            <View style={styles.header}>
                <Pressable style={styles.back} onPressOut={returnToHome}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} color={colors.medium}/>
                </Pressable>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.search} placeholder="Search..."></TextInput>
                    <Pressable style={styles.searchbtn}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color={colors.medium}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}   

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: colors.light,
        height: 60,
        display: "flex",
        flexDirection: "row"
    },
    back: {
        height: "100%",
        width: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        height: "100%",
        width: "95%",
        padding: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center"
    },
    search: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        height: 40,
        padding: 5,
        backgroundColor: "white",
        width: 270,
        paddingLeft: 20
    },
    searchbtn: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        height: 40,
        padding: 5,
        backgroundColor: colors.dark,
        width: 50,
        paddingRight: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})
