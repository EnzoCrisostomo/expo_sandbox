import React from "react";
import { StyleSheet, View } from "react-native";

import Graph from "./Graph";
import Footer from "./components/Footer";
import { RootStackScreenProps } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
});

export default function Chart({ navigation }: RootStackScreenProps<"Chart">) {
    return (
        <View style={styles.container}>
            <Graph />
            <Footer />
        </View>
    );
}
