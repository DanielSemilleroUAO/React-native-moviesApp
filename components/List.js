import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const { navigation, title, content } = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <Text>
            <FlatList
              data={content}
              renderItem={({ item }) => <Card navigation={navigation} item={item} />}
              horizontal={true}></FlatList>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  list: {
    marginTop: 25,
  },
});

List.prototypes = propTypes;

export default List;
