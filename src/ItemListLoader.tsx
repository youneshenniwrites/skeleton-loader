import { View, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';
import { backgroundColor, highlightColor } from './constants';

const ItemListLoader = () => {
  return (
    // * SkeletonLoader handles making animation for any type of View
    <SkeletonLoader
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
    >
      <View style={styles.container}>
        {new Array(10).fill(null).map((_, index) => (
          <Item key={index} />
        ))}
      </View>
    </SkeletonLoader>
  );
};

const Item = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.row}>
      <View style={styles.image} />
      <View>
        <View style={[styles.line, { width: width * 0.6 }]} />
        <View style={[styles.line, { width: width * 0.4 }]} />
        <View style={[styles.line, { width: width * 0.2 }]} />
      </View>
    </View>
  );
};

export default ItemListLoader;

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: 'row', marginBottom: 40 },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
    backgroundColor: backgroundColor,
  },
  line: { height: 20, marginBottom: 10, backgroundColor: backgroundColor },
});
