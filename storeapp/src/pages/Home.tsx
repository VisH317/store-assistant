import React from 'react'
import { View, Text, StyleSheet, Image, Pressable, TouchableWithoutFeedback } from 'react-native'
import colors from '../colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function Home({ navigation }: any): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/undraw_shopping_app_flsj 1.png")}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Store<Text style={styles.highlight}>GPT</Text></Text>
                <Text style={styles.desc}>Your personal shopping assistant powered by AI tools</Text>
            </View>
            <View style={styles.btnContainer}>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Find a Store</Text>
                    <FontAwesomeIcon icon={faArrowRight} size="lg" color="white"/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        fontFamily: "'Raleway', sans-serif"
    },
    imageContainer: {
        paddingVertical: 10,
        paddingHorizontal: 3,
        flexGrow: 0
    },
    textContainer: {
        flexGrow: 0
    },
    titleText: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 50,
        textAlign: "center",
        color: colors.dark
    },
    highlight: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 50,
        textAlign: "center",
        color: colors.main
    },
    desc: {
        fontWeight: "300",
        fontSize: 20,
        textAlign: "center"
    },
    btnContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        color: "white",
        backgroundColor: colors.dark,
        display: "flex",
        flexDirection: "row",
        width: 100,
        height: 40
    },
    btnText: {
        color: "white",
        borderRightWidth: 4,
        borderRightColor: colors.medium,
    }
})
