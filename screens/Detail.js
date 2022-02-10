import StarRating from 'react-native-star-rating';
import React, { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';
import { getMovieDetail } from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {
  const movieId = route.params.movieDetail.id;
  const [detail, setDetail] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovieDetail(movieId).then(movieData => {
      setDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShow = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              source={
                detail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' + detail.poster_path,
                    }
                  : placeholderImage
              }></Image>
            <View style={styles.sliderContainer}>
              <View style={styles.playButton}>
                <PlayButton handlePress={() => videoShow()}></PlayButton>
              </View>
              <Text style={styles.movieTitle}>{detail.title}</Text>
              {detail.genres && (
                <View style={styles.genresContainer}>
                  {detail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={detail.vote_average}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{detail.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release date: ' +
                  dateFormat(detail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShow} navigation={navigation} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size={'large'} />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -20,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
