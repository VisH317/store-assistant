import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, TouchableHighlight } from 'react-native'
import colors from '../colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function Home({ navigation }: any): JSX.Element {

    const [pressed, setPressed] = useState<boolean>(false)

    const navigateToSearch = () => {
        navigation.navigate("Search")
    }

    return (
        <View style={styles.container}>
            <View style={{height: 64}}/>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/shopping.png")} style={{ width: 200, height: 200 }}/>
            </View>
            <View style={{height: 64}}/>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Store<Text style={styles.highlight}>GPT</Text></Text>
                <Text style={styles.desc}>Your personal shopping assistant powered by AI tools</Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableHighlight style={pressed ? styles.btnActive : styles.btn} underlayColor={colors.main} activeOpacity={0.8} onPressOut={navigateToSearch}>
                    <View style={styles.btnInside}>
                        <Text style={styles.btnText}>Find a Store</Text>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginLeft: 21}}>
                            <FontAwesomeIcon icon={faArrowRight} size={30} color="white"/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{height: 32}}/>
            <View style={styles.tiltedRect}/>
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
        height: "100%",
        backgroundColor: "white"
    },
    tiltedRect: {
        position: "absolute",
        width: 700, 
        height: 1000,
        backgroundColor: colors.verylight,
        transform: [{ rotate: '-10deg' }],
        zIndex: -2,
        left: -100,
        top: 310
    },
    imageContainer: {
        paddingVertical: 10,
        paddingHorizontal: 3,
        flexGrow: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
        width: 175,
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
        fontSize: 20
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
    }
})
