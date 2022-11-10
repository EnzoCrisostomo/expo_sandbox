import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import * as shape from "d3";
import Svg, { Path } from "react-native-svg";
import { scaleLinear } from "d3";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Prices, DataPoints, WINDOW_WIDTH } from "./Model";
import Header from "./Header";
import Cursor from "./Cursor";
import data from "./data.json";
import Animated, { useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { parse, serialize } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const values = data.data.prices as Prices;
const POINTS = 60;

const buildGraph = (datapoints: DataPoints, label: string) => {
  const priceList = datapoints.prices.slice(0, POINTS);
  const formattedValues = priceList.map(
    (price) => [parseFloat(price[0]), price[1]] as [number, number]
  );
  const prices = formattedValues.map((value) => value[0]);
  const dates = formattedValues.map((value) => value[1]);
  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, WINDOW_WIDTH]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([WINDOW_WIDTH, 0]);
  return {
    label,
    minPrice,
    maxPrice,
    percentChange: datapoints.percent_change,
    path: parse(shape
      .line()
      .x(([, x]) => scaleX(x) as number)
      .y(([y]) => scaleY(y) as number)
      .curve(shape.curveBasis)(formattedValues) as string
    ),
  };
};

const graphs = [
  {
    label: "1H",
    value: 0,
    data: buildGraph(values.hour, "Last Hour"),
  },
  {
    label: "1D",
    value: 1,
    data: buildGraph(values.day, "Today"),
  },
  {
    label: "1M",
    value: 2,
    data: buildGraph(values.month, "Last Month"),
  },
  {
    label: "1Y",
    value: 3,
    data: buildGraph(values.year, "This Year"),
  },
  {
    label: "all",
    value: 4,
    data: buildGraph(values.all, "All time"),
  },
];

const SELECTION_WIDTH = width - 32;
const BUTTON_WIDTH = (width - 32) / graphs.length;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundSelection: {
    backgroundColor: "#f3f3f3",
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },
  selection: {
    flexDirection: "row",
    width: SELECTION_WIDTH,
    alignSelf: "center",
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Graph = () => {
  const selected = useSharedValue(0);
  const transition = useSharedValue(1);
  const [current, setCurrent] = useState(graphs[0].data);
  const [current2, setCurrent2] = useState(graphs[1].data);

  const animatedProps = useAnimatedProps(() => ({
    opacity: transition.value
  }));

  const selectedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: BUTTON_WIDTH * selected.value }]
  }));

  const active = useSharedValue(false);
  const x = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      active.value = true;
    },
    onActive: (event) => {
      x.value = event.x;
    },
    onEnd: () => {
      active.value = false;
    }
  });

  return (
    <View style={styles.container}>
      <Header data={current} />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          <Svg width={WINDOW_WIDTH} height={WINDOW_WIDTH}>
            <AnimatedPath
              animatedProps={animatedProps}
              d={serialize(current.path)}
              fill="transparent"
              stroke="black"
              strokeWidth={3}
            />
            <AnimatedPath
              animatedProps={animatedProps}
              d={serialize(current2.path)}
              fill="transparent"
              stroke="red"
              strokeWidth={3}
            />
          </Svg>
          <Cursor data={current2} x={x} />
          <Cursor data={current} x={x}/>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.backgroundSelection,
              selectedStyle,
            ]}
          />
        </View>
        {graphs.map((graph, index) => {
          return (
            <Pressable
              key={graph.label}
              onPress={() => {
                setCurrent(graphs[index].data);
                selected.value = withTiming(index);
                transition.value = 0;
                transition.value = withTiming(1);
              }}
            >
              <View style={[styles.labelContainer]}>
                <Text style={styles.label}>{graph.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Graph;
