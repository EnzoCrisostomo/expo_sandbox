import React, { useRef, useState } from "react";
import { Path } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { interpolate } from "react-native-reanimated";

interface Props {
    d: string;
    strokeWidth: number;
    stroke: string;
    fill: string;
    progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function AnimatedStoke(props: Props) {
    const [length, setLength] = useState(0);
    const { progress } = props;
    const ref = useRef<typeof AnimatedPath>(null);

    const strokeAnimation = useAnimatedProps(() => ({
        strokeDashoffset: length - length * progress.value,
        fillOpacity: interpolate(progress.value, [0, 0.8, 1], [0, 0, 1]),
        strokeOpacity: interpolate(progress.value, [0, 0.8, 1], [1, 1, 0]),
    }));

    const bgStrokeAnimation = useAnimatedProps(() => ({
        strokeDashoffset: length - length * progress.value,
        fillOpacity: interpolate(progress.value, [0, 0.8, 1], [0, 0, 1]),
        strokeOpacity: interpolate(progress.value, [0, 0.8, 1], [1, 1, 0]),
    }));
    

    return (
        <>
            {/* <AnimatedPath
                animatedProps={bgStrokeAnimation}
                strokeDasharray={length}
                stroke={colors.preto}
                {...props}
            /> */}
            <AnimatedPath
                animatedProps={strokeAnimation}
                //@ts-ignore
                ref={ref}
                //@ts-ignore
                onLayout={() => setLength(ref.current?.getTotalLength())}
                strokeDasharray={length}
                {...props}
            />
        </>
    );
}
