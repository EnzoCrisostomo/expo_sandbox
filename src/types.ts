import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    Carousel: undefined;
    TextColor: undefined;
    AnimatedLinearGradient: undefined;
    AnimatedFont: undefined;
    Graph: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;