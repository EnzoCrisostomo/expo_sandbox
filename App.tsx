import * as React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Carousel from "./src/screens/Carousel";
import Welcome from "./src/screens/Welcome";
import { RootStackParamList } from "./src/types";
import TextColor from "./src/screens/TextColor";
import { StatusBar } from "expo-status-bar";
import AnimatedLinearGradient from "./src/screens/AnimatedLinearGradient";
import AnimatedFont from "./src/screens/AnimatedFont";
import Graph from "./src/screens/Chart/Graph";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer theme={DarkTheme}>
                <StatusBar style="light" />
                <Stack.Navigator initialRouteName="Welcome" screenOptions={{ animation: "fade_from_bottom" }}>
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Carousel" component={Carousel} options={{ headerShown: false }} />
                    <Stack.Screen name="TextColor" component={TextColor} options={{ headerShown: true }} />
                    <Stack.Screen name="AnimatedLinearGradient" component={AnimatedLinearGradient} options={{ headerShown: true }} />
                    <Stack.Screen name="AnimatedFont" component={AnimatedFont} options={{ headerShown: true }} />
                    <Stack.Screen name="Graph" component={Graph} options={{ headerShown: true }} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
