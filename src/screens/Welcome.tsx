import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types';

export default function Welcome({navigation}: RootStackScreenProps<"Welcome">){
    return(
        <SafeAreaView>
            <Button onPress={()=>{navigation.navigate("Carousel")}} title='Carousel'></Button>
            <View style={styles.spacer}/>
            <Button onPress={()=>{navigation.navigate("TextColor")}} title='TextColor'></Button>
            <View style={styles.spacer}/>
            <Button onPress={()=>{navigation.navigate("AnimatedLinearGradient")}} title='AnimatedLinearGradient'></Button>
            <View style={styles.spacer}/>
            <Button onPress={()=>{navigation.navigate("AnimatedFont")}} title='AnimatedFont'></Button>
            <View style={styles.spacer}/>
            <Button onPress={()=>{navigation.navigate("Chart")}} title='Chart'></Button>
            <View style={styles.spacer}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    spacer: {
        marginVertical: 5,
    }
});