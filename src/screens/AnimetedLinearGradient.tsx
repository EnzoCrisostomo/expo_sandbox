import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, StyleSheet, View, Dimensions } from "react-native";
import { RootStackScreenProps } from "../types";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    Easing,
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

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function AnimatedLinearGradient({
    navigation,
}: RootStackScreenProps<"AnimatedLinearGradient">) {
    const xOffset = width;
    const yOffset = height;
    const positionX = useSharedValue(-xOffset);
    const positionY = useSharedValue(-yOffset);
    const rotation = useSharedValue(0);

    const gradientAnimation = useAnimatedStyle(() => ({
        transform: [
            { translateX: positionX.value },
            { translateY: positionY.value },
            //{ rotateZ: `${rotation.value}deg` },
        ],
    }));

    useEffect(() => {
        positionX.value = withRepeat(
            withTiming(xOffset, { duration: 10000, easing: Easing.linear }),
            -1,
            true
        );
        positionY.value = withRepeat(
            withTiming(yOffset, { duration: 12000, easing: Easing.linear }),
            -1,
            true
        );
        rotation.value = withRepeat(
            withTiming(360, { duration: 50000, easing: Easing.linear }),
            -1
        );

        return () => {};
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedGradient
                style={[styles.gradient, gradientAnimation]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[
                    colors.blue,
                    colors.lightGreen
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
        width: height * 3,
        height: height * 3  
    },
});
