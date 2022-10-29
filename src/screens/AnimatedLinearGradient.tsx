import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, StyleSheet, View, Dimensions } from "react-native";
import { RootStackScreenProps } from "../types";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const colors = {
    lightBlue: "#9CC9D3",
    blue: "#276175",
    lightGreen: "#81C579",
    green: "#53AD82",
    darkGreen: "#368F57",
    white: "#FFFFFF",
    black: "#000000",
    lightGrey: "#F0F0F0",
    grey: "#C0C0C0",
    darkGrey: "#959595",
    red: "#FF312D",
    yellow: "#F29D00",
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AnimatedLinearGradient({
    navigation,
}: RootStackScreenProps<"AnimatedLinearGradient">) {
    const xOffset = width * 2.5;
    const yOffset = height * 2.5;
    const positionX = useSharedValue(xOffset);
    const positionY = useSharedValue(yOffset);

    const gradientAnimation = useAnimatedStyle(() => ({
        transform: [
            { translateX: positionX.value },
            { translateY: positionY.value },
        ],
    }));

    useEffect(() => {
        positionX.value = withRepeat(
            withTiming(-xOffset, { duration: 8000 }),
            -1
        );
        positionY.value = withRepeat(
            withTiming(-yOffset, { duration: 8000 }),
            -1
        );
        return () => { };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedGradient
                style={[styles.gradient, gradientAnimation]}
                start={{ x: 0.20, y: 0.20 }}
                end={{ x: 0.80, y: 0.80 }}
                locations={[0, 0.3, 0.6, 1]}
                colors={[
                    colors.blue,
                    "#488576",
                    "#488576",
                    colors.blue
                ]}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        width: width * 6,
        height: height * 6,
        transform: [/* {translateX: -width * 2.5}, {translateY: -height* 2.5}, */ { scale: 0.15 }]
    },
});
