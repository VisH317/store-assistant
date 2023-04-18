import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'
import colors from '../colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAtom } from 'jotai'
import location, { Location } from '../lib/location';

const data = [
    { label: "United States", value: "US" },
    { label: "China", value: "CH" },
    { label: "Canada", value: "CA" },
    { label: "India", value: "IN" },
    { label: "Japan", value: "JP" },
]

export default function Location({ navigation }: any) {
    const [value, setValue] = useState<string>();
    const [isFocus, setIsFocus] = useState(false);

    const [state, setState] = useState<string>("")
    const [city, setCity] = useState<string>("")


    const [pressed, setPressed] = useState<boolean>(false)

    // atoms
    const [loc, setLoc] = useAtom(location)

    const navigateToSearch = () => {
        if(state.length===0 || city.length===0 || value?.length===0) return
        const loc: Location = {
            country: value,
            state,
            city
        }
        setLoc(loc)
        navigation.navigate("Search")
    }

    const navigateBack = () => {
        navigation.navigate("Home")
    }

    return (
        <View style={styles.screen}>
            <Pressable style={styles.back} onPressOut={navigateBack}>
                <FontAwesomeIcon icon={faArrowLeft} size={32} color={colors.medium}/>
            </Pressable>
            <Text style={styles.title}>Enter Location:</Text>
            <View style={{height: 20}}/>
            <Dropdown style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
            <View style={{height: 32}}/>
            <TextInput style={styles.input} value={state} onChangeText={e => setState(e)} placeholder="State: "/>
            <View style={{height: 32}}/>
            <TextInput style={styles.input} value={city} onChangeText={e => setCity(e)} placeholder="City: "/>
            <View style={{height: 16}}/>
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
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Raleway', sans-serif",    
    },
    title: {
        fontSize: 35,
        marginBottom: 10
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 200,
        fontFamily: "'Raleway', sans-serif",    
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 200
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: "'Raleway', sans-serif",    
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: "'Raleway', sans-serif",    
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: "'Raleway', sans-serif",    
    },
    btnContainer: {
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
    },
    back: {
        position: "absolute",
        top: 10,
        left: 10
    }
})