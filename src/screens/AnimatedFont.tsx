import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Button,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { RootStackScreenProps } from "../types";
import Svg from "react-native-svg";
import AnimatedStoke from "../Components/AnimatedStoke";
import {
    Easing,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const stroke = 2;
const vbWidith = 359 + stroke;
const vbHeigth = 90 + stroke;
const width = (Dimensions.get("window").width - 64) / 1.5;
const height = (width * vbHeigth) / vbWidith;

const path = [
    "M4.97595 90C2.15995 90 0.751953 88.592 0.751953 85.776V4.62402C0.751953 1.80802 2.15995 0.400024 4.97595 0.400024H52.208C55.024 0.400024 56.432 1.63736 56.432 4.11203C56.432 6.5867 55.024 7.82403 52.208 7.82403H8.55995V40.336H47.984C50.8 40.336 52.208 41.616 52.208 44.176C52.208 46.736 50.8 48.016 47.984 48.016H8.55995V82.448H53.744C56.56 82.448 57.968 83.6854 57.968 86.16C57.968 88.72 56.56 90 53.744 90H4.97595Z",
    "M78.845 90C76.1996 90 74.877 88.592 74.877 85.776V4.62402C74.877 1.80802 76.413 0.400024 79.485 0.400024C81.7036 0.400024 83.3676 1.33869 84.477 3.21603L113.533 46.608L142.333 3.21603C143.016 2.10669 143.784 1.38136 144.637 1.04002C145.49 0.613358 146.557 0.400024 147.837 0.400024C150.653 0.400024 152.061 1.80802 152.061 4.62402V85.776C152.061 88.592 150.738 90 148.093 90C145.362 90 143.997 88.592 143.997 85.776V14.096L117.373 54.416C116.264 56.2934 114.984 57.232 113.533 57.232C111.997 57.232 110.674 56.2934 109.565 54.416L82.813 14.096V85.776C82.813 88.592 81.4903 90 78.845 90Z",
    "M177.851 90C175.035 90 173.627 88.592 173.627 85.776V4.62402C173.627 1.80802 175.035 0.400024 177.851 0.400024H199.611C207.035 0.400024 213.478 1.59469 218.939 3.98402C224.4 6.28802 228.88 9.53069 232.379 13.712C235.963 17.808 238.608 22.5867 240.315 28.048C242.107 33.424 243.003 39.1414 243.003 45.2C243.003 51.2587 242.107 57.0187 240.315 62.48C238.608 67.856 235.963 72.6347 232.379 76.816C228.88 80.912 224.4 84.1547 218.939 86.544C213.478 88.848 207.035 90 199.611 90H177.851ZM181.435 82.448H199.227C207.675 82.448 214.502 80.7414 219.707 77.328C224.998 73.8294 228.838 69.264 231.227 63.632C233.702 57.9147 234.939 51.7707 234.939 45.2C234.939 38.544 233.702 32.4 231.227 26.768C228.838 21.0507 224.998 16.4854 219.707 13.072C214.502 9.57336 207.675 7.82403 199.227 7.82403H181.435V82.448Z",
    "M263.72 90C261.075 90 259.752 88.592 259.752 85.776V4.62402C259.752 1.80802 261.075 0.400024 263.72 0.400024C266.28 0.400024 267.56 1.80802 267.56 4.62402V85.776C267.56 88.592 266.28 90 263.72 90Z",
    "M285.412 90C284.047 90 283.108 89.616 282.596 88.848C282.169 88.08 282.212 87.0134 282.724 85.648L315.748 3.34402C316.345 1.38136 317.753 0.400024 319.972 0.400024H320.612C322.831 0.400024 324.239 1.38136 324.836 3.34402L357.988 85.648C358.927 88.5494 358.031 90 355.3 90H354.02C351.972 90 350.564 89.0187 349.796 87.056L340.324 62.992H300.26L290.66 87.056C289.977 89.0187 288.569 90 286.436 90H285.412ZM302.948 55.44H337.508L320.356 11.536L302.948 55.44Z",
];

const logo_stroke = 2;
const logo_vbWidith = 370 + stroke;
const logo_vbHeigth = 370 + stroke;
const logo_width = Dimensions.get("window").width - 64;
const logo_height = (logo_width * vbHeigth) / vbWidith;

const emdia = [
    "M123.5 144L46 66C46 66 24 91.5 16 113.5C11.5 126 7.25 136.7 5 147.5C2.2 161 1 170 1 186C1 202 1.8 210 5 224.5C7.5 236 14 253.5 14 253.5L123.5 144Z",
    "M25.5 277.5L141 162L211 232L96 347C96 347 69.1836 330.204 55 316C41.6161 302.597 25.5 277.5 25.5 277.5Z",
    "M118 356.5C118 356.5 129.2 361.2 143.5 364.5C155.5 367.3 170 368.8 179 369C200.5 369.5 230.7 365.5 253.5 356C283.5 343.5 304 325 304 325L227 247.5L118 356.5Z",
    "M63 48.4999L322 307.5C386.709 238.869 386.259 131.559 320.977 63.4726L313.652 55.8337C246.531 -14.17 134.674 -16.8341 63 48.4999Z",
];

const colors = {
    azul: "#3A6FA5",
    branco: "white",
    preto: "black",
};

export default function AnimatedFont({
    navigation,
}: RootStackScreenProps<"AnimatedFont">) {
    const progress = useSharedValue(0);
    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration: 3000,
                easing: Easing.bezier(0.2, 0.9, 0.3, 0.95),
            }),
            -1,
            true
        );

        return () => {};
    }, [progress]);

    return (
        <SafeAreaView style={styles.container}>
            <Svg
                width={logo_width * 2}
                height={logo_height * 2}
                viewBox={[
                    -logo_stroke / 2,
                    -logo_stroke / 2,
                    logo_vbWidith + logo_stroke / 2,
                    logo_vbHeigth + logo_stroke / 2,
                ].join(" ")}
            >
                {emdia.map((d, key) => (
                    <AnimatedStoke
                        progress={progress}
                        d={d}
                        strokeWidth={logo_stroke}
                        key={key}
                        stroke={colors.azul}
                        fill={colors.azul}
                    ></AnimatedStoke>
                ))}
            </Svg>
            <View style={{ height: 30 }} />
            <Svg
                width={width}
                height={height}
                viewBox={[
                    -stroke / 2,
                    -stroke / 2,
                    vbWidith + stroke / 2,
                    vbHeigth + stroke / 2,
                ].join(" ")}
            >
                {path.map((d, key) => (
                    <AnimatedStoke
                        progress={progress}
                        d={d}
                        strokeWidth={stroke}
                        key={key}
                        stroke={colors.preto}
                        fill={colors.preto}
                    ></AnimatedStoke>
                ))}
            </Svg>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
});
