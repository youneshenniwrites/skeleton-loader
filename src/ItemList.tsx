import { FlatList, Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';

import { data } from './data';

export const ItemList = () => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text} numberOfLines={2}>
              {item.details}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default ItemList;

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: 'row', marginBottom: 40 },
  image: { height: 100, width: 100, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 20, paddingBottom: 8, fontWeight: 'bold' },
  text: { fontSize: 13, flex: 1 },
});
