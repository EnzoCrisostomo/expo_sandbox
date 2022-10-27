import * as React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Carousel from "./src/screens/Carousel";
import Welcome from "./src/screens/Welcome";
import { RootStackParamList } from "./src/types";
import TextColor from "./src/screens/TextColor";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer theme={DarkTheme}>
          <StatusBar style="light"/>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{animation: "fade_from_bottom"}}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Carousel" component={Carousel} options={{headerShown: false}} />
                <Stack.Screen name="TextColor" component={TextColor} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
