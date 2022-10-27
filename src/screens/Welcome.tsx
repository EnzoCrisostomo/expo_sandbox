import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native';
import { RootStackScreenProps } from '../types';

export default function Welcome({navigation}: RootStackScreenProps<"Welcome">){
    return(
        <SafeAreaView>
            <Text>Teste</Text>
            <Button onPress={()=>{navigation.navigate("Carousel")}} title='Carousel'></Button>
            <Button onPress={()=>{navigation.navigate("TextColor")}} title='TextColor'></Button>
        </SafeAreaView>
    )
}