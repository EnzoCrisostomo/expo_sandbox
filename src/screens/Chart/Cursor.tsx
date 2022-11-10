import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { SharedValue, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { getYForX, Path } from "react-native-redash";

const CURSOR = 30;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    backgroundColor: "black",
  },
});

interface CursorProps {
  data: { path: Path };
  x: SharedValue<number>;
}

const Cursor = ({ data, x }: CursorProps) => {
  const style = useAnimatedStyle(() => {
    const translateX = x.value - CURSOR / 2;
    const translateY = (getYForX(data.path, x.value) ?? 0) - CURSOR / 2;

    return ({
      //opacity: withTiming(active.value ? 1 : 0),
      transform: [{ translateX }, { translateY }],
    })
  })
  return (

    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.cursor, style]}>
        <View style={styles.cursorBody} />
      </Animated.View>
    </View>
  );
};

export default Cursor;
