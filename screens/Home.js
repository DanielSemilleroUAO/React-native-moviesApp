import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { getFamilyMovies, getPopularMovies, getPopularTV, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {

    const [moviesImages, setMoviesImages] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTV, setPopularTV] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getFamilyMovies(),
            getPopularTV(),
        ])
    };

    useEffect(() => {

        getData().then(
            ([
                upcomingMoviesData,
                popularMoviesData,
                familyMoviesData,
                popularTVData
            ]) => {

                const moviesImagesArray = [];
                upcomingMoviesData.forEach(movie => {
                    moviesImagesArray.push('https://image.tmdb.org/t/p/w500/' + movie.poster_path);
                });
                setMoviesImages(moviesImagesArray);
                setPopularMovies(popularMoviesData);
                setPopularTV(popularTVData);
                setFamilyMovies(familyMoviesData);


            })
            .catch(err => setError(true))
            .finally(() => {
                setLoaded(true);
            });

    }, []);

    return (
        <>
            {loaded && !error && (
                <ScrollView>
                    {moviesImages && (
                        <View style={styles.sliderContainer}>
                            <SliderBox
                                images={moviesImages}
                                dotStyle={styles.sliderStyle}
                                sliderBoxHeight={dimensions.height / 2.0}
                                autoplay={true}
                                circleLopp={true}
                            />
                        </View>
                    )}

                    {popularMovies && (
                        <View style={styles.carousel}>
                            <List
                                title={"Popular Movies"}
                                content={popularMovies}
                                navigation={navigation}
                            />
                        </View>
                    )}

                    {popularTV && (
                        <View style={styles.carousel}>
                            <List
                                title={"Popular TV Shows"}
                                content={popularTV}
                                navigation={navigation}
                            />
                        </View>
                    )}

                    {familyMovies && (
                        <View style={styles.carousel}>
                            <List
                                title={"Family Movies"}
                                content={familyMovies}
                                navigation={navigation}
                            />
                        </View>
                    )}

                </ScrollView>
            )}
            {!loaded && <ActivityIndicator size={'large'} />}
            {error && <Error />}

        </>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderStyle: {
        height: 0
    },
    carousel: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20
    }
});

export default Home;