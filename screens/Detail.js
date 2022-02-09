import React, { useState, useEffect } from 'react';
import {
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    View
} from 'react-native';
import { getMovieDetail } from '../services/services';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {

    const movieId = route.params.movieDetail.id;
    const [detail, setDetail] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getMovieDetail(movieId)
            .then(movieData => {
                setDetail(movieData);
                setLoaded(true);
            });
    }, [movieId]);

    return (
        <>
            {loaded && (
                <ScrollView>
                    <Image
                        style={styles.image}
                        source={
                            detail.poster_path ?
                                { uri: 'https://image.tmdb.org/t/p/w500/' + detail.poster_path }
                                : placeholderImage}>

                    </Image>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.movieTitle}>{detail.title}</Text>
                    </View>
                </ScrollView>
            )}
            {!loaded && <ActivityIndicator size={'large'} />}
        </>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: height / 2,
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    }

});

export default Detail;