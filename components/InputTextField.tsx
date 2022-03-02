import React from "react";
import { StyleSheet, View, Text, TextInput, StyleProp, ViewStyle } from "react-native";

type Props = {
    title: string;
    onChangeText: (text: string) => void;
    placeholderText: string;
    isSecure: boolean;
    value: string;
    style: StyleProp<ViewStyle>;
}

const InputTextField: React.FC<Props> = props => {

return (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.title}</Text>
        <TextInput
            onChangeText={text => props.onChangeText(text)}
            placeholder={props.placeholderText}
            secureTextEntry={props.isSecure}
            style={styles.input}
            value={props.value}
        />
        <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1 }} />
    </View>
);
}

const styles = StyleSheet.create({
    inputTitle: {
        color: "#ABB4BD",
        fontSize: 14
    },
    input: {
        paddingVertical: 12,
        color: "#1D2029",
        fontSize: 14,
        fontFamily: "Avenir Next"
    }
});

export default InputTextField;