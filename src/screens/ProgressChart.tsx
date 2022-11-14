import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedProps,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
	progress: SharedValue<number>;
	size: number;
	strokeWidth: number;
	primaryColor: string;
	secondaryColor: string;
	showText: boolean;
	fontSize: number;
}

export default function ProgressChart({
	progress,
	size,
	strokeWidth = 40,
	primaryColor = "#553772",
	secondaryColor = "#c7417b",
	showText = true,
	fontSize = 55,
}: Props) {
	if (!progress) progress = useSharedValue(0);
	if (!size) size = Dimensions.get("window").width * 0.6;
	const R = size * 0.4;
	const CIRCLE_LENGTH = 2 * Math.PI * R; // 2PI*R

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
	}));

	const percentageText = useDerivedValue(() => `${Math.floor(progress.value * 100)}%`);

	const onPress = () => {
		progress.value = withTiming(Math.random(), { duration: 1500 });
	};

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<Svg width={size} height={size}>
					<Circle cx={size / 2} cy={size / 2} r={R} stroke={secondaryColor} strokeWidth={strokeWidth} />
					<AnimatedCircle
						cx={size / 2}
						cy={size / 2}
						r={R}
						stroke={primaryColor}
						strokeWidth={strokeWidth * 0.9}
						strokeDasharray={CIRCLE_LENGTH}
						animatedProps={animatedProps}
						strokeLinecap={"round"}
					/>
				</Svg>
				{showText && <ReText style={[styles.percentage, { fontSize }]} text={percentageText} />}
			</View>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.buttonText}>Random</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
	},
	percentage: {
		color: "#ffffff",
		position: "absolute",
		fontWeight: "bold",
	},

	screen: {
		flex: 1,
		backgroundColor: "#1f306e",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		position: "absolute",
		bottom: 80,
		width: Dimensions.get("window").width * 0.7,
		height: 60,
		backgroundColor: "#553772",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "white",
	},
});
