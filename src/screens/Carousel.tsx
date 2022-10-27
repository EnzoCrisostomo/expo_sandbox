import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    Image,
    Animated,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const data = [
    "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/1493623/screenshots/19623039/media/95c94f13f347a0f575b294e30da68601.jpg",
    "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/userupload/3779589/file/original-a338f5c3b323a1a4539dd57ddc338d30.jpg?compress=1&resize=1600x1200",
    "https://cdn.dribbble.com/users/1834486/screenshots/19622720/media/8a8aa3858a1c6bd65be205a717495f00.jpg",
    "https://cdn.dribbble.com/userupload/2740488/file/original-60907ec0c68c5a2b008f4c3744120b1f.jpg?compress=1&resize=1905x1905",
    "https://cdn.dribbble.com/users/1834486/screenshots/3903276/media/c1563313046bcd1f8adfb930acc96cfa.png",
    "https://cdn.dribbble.com/users/1493623/screenshots/19623013/media/3cfa979efe730d753be0ee8f1cd77ce2.jpg",
    "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/1834486/screenshots/19622715/media/662f2e58aa38014897c60aeb3cdee7c8.jpg",
    "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/642793/screenshots/16488288/media/a51c798b0c826a275015d32d9c21d404.png",
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function Carousel() {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <View style={StyleSheet.absoluteFill}>
                {data.map((image, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                    });
                    return (
                        <Animated.Image
                            blurRadius={50}
                            key={`image-${index}`}
                            source={{ uri: image }}
                            style={[StyleSheet.absoluteFill, { opacity }]}
                        />
                    );
                })}
            </View>
            <Animated.FlatList
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                horizontal
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                width,
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 8,
                            }}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{
                                    height: imageH,
                                    width: imageW,
                                    resizeMode: "cover",
                                    borderRadius: 16,
                                }}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
}
