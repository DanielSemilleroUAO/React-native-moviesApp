import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({onClose, navigation}) => {
  return (
    <VideoPlayer
      onBack={() => {
        onClose();
      }}
      fullscreenOrientation='all'
      onEnd={() => onClose}
      navigation={navigation}
      source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
    />
  );
};


export default Video;