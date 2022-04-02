import { View, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';
import { BACKGROUND_COLOR, HIGHLIGHT_COLOR, SPEED } from './constants';

// * SkeletonLoader handles making animation for any type of View
export const SkeletonLoader: FC = ({
  children,
  backgroundColor,
  highlightColor,
}) => {
  const [layout, setLayout] = useState();
  const shared = useSharedValue(0);

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: SPEED }), Infinity);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [layout ? -layout.width : 0, layout ? layout.width : 0]
        ),
      },
    ],
  }));

  {
    /* know the size of the view once it is rendered */
  }
  if (!layout?.width && !layout?.height) {
    return (
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }
  return (
    <MaskedView
      style={{ width: layout.width, height: layout.height }}
      maskElement={<View>{children}</View>}
    >
      <View
        style={[
          styles.background,
          { backgroundColor: backgroundColor || BACKGROUND_COLOR },
        ]}
      />
      <Reanimated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={['transparent', 'black', 'transparent']}
            />
          }
        >
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: highlightColor || HIGHLIGHT_COLOR },
            ]}
          />
        </MaskedView>
      </Reanimated.View>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  background: { flexGrow: 1, overflow: 'hidden' },
});
