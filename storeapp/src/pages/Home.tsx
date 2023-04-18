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
                    {/* <FontAwesomeIcon icon={faArrowRight} size="lg" color="white"/> */}
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
        fontFamily: "'Raleway', sans-serif",
        justifyContent: "center",
        height: "100%"
    },
    imageContainer: {
        paddingVertical: 10,
        paddingHorizontal: 3,
        flexGrow: 0
    },
    textContainer: {
        flexGrow: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
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
        textAlign: "center",
        width: "80%"
    },
    btnContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    btn: {
        color: "white",
        backgroundColor: colors.dark,
        display: "flex",
        flexDirection: "row",
        width: 170,
        height: 50,
        padding: 10
    },
    btnText: {
        color: "white",
        borderRightWidth: 2,
        borderRightColor: colors.medium,
        paddingRight: 10,
        fontSize: 20
    }
})
