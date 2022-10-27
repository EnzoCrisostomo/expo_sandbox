import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../types";

export default function TextColor({
    navigation,
}: RootStackScreenProps<"TextColor">) {
    const [backgroundColor, setBackgroundColor] = useState("");
    const [color, setColor] = useState("white");
    const [colors, setColors] = useState({ r: 0, g: 0, b: 0 });

    function rand255(): number {
        return Math.round(Math.random() * 255);
    }

    function randomizeColor() {
        const r = rand255();
        const g = rand255();
        const b = rand255();
        setColors({ r, g, b });
        setColor((r + g + b) / 3 < 127 ? "white" : "black");
        setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
    }
    return (
        <SafeAreaView style={[{ backgroundColor }, styles.container]}>
            <View>
                <Text style={[styles.text, { color }]}>Teste de visibilidade de texto</Text>
                <Text
                    style={[styles.text, { color }]}
                >{`r:${colors.r} g:${colors.g} b:${colors.b}`}</Text>
                <Text style={[styles.text, { color, fontWeight: "400" }]}>400</Text>
                <Text style={[styles.text, { color, fontWeight: "300" }]}>300</Text>
                <Text style={[styles.text, { color, fontWeight: "200" }]}>200</Text>
                <Text style={[styles.text, { color, fontWeight: "100" }]}>100</Text>
            </View>
            <Button onPress={randomizeColor} title="Nova Cor"></Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 30,
    },
});
