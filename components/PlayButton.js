import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const { handlePress } = this.props;
    return (
      <Pressable onPress={()=> handlePress()} style={styles.playButton}>
        <Icon name={'caret-forward-outline'} size={30} color={'white'}></Icon>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  playButton: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: 'blue',
  },
});

export default PlayButton;
