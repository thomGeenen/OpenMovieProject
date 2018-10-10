import React, {Component} from 'react';
import { View, Button, Text, Platform, Share, Alert, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import { connect } from 'react-redux';

import { searchFilmById, getImage } from '../api/tmdb';
import moment from 'moment';
import numeral from 'numeral';

class MovieDetails extends React.Component {

    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
        
        if(params.movie != undefined && Platform.OS === "ios") {
            return {
                headerRight: <TouchableOpacity
                                style={styles.share_button_ios}
                                onPress={() => params.shareMovies()} >
                                
                                <Image 
                                    style={styles.share_image}
                                    source={require('../assets/send.ios.png')} />
                            </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props);

        this._shareMovies = this._shareMovies.bind(this);

        this.state = {
            isLoading: true,
            movie: undefined
        }
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.movie};
        this.props.dispatch(action);
    }

    _displayShareButton() {
        const { movie } = this.state;
        if(movie !== undefined && Platform.OS === "android") {
            return (
                <TouchableOpacity
                    style={styles.share_button}
                    onPress={() => this._shareMovies()}>
                    <Image 
                        style={styles.image}
                        source={require('../assets/send.android.png')}/>
                </TouchableOpacity>
            )
        }
    }

    _displayLoading() {
        if(this.state.isLoading){
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _displayFavoriteImage() {
        var imageSource = require('../assets/empy_heart.png');
        if(this.props.favoritesMovies.findIndex(item => item.id === this.state.movie.id) !== -1){
            imageSource = require('../assets/fullfiled_heart.png');
        }

        return (
            <Image source={imageSource} style={styles.favorite_image} />
        )
    }

    _displayFilm() {
        const movie = this.state.movie
        if(movie !== undefined) {
            return (
            
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImage(movie.backdrop_path)}}/>
                    <Text style={styles.title_text}>{movie.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity> 
                    <Text style={styles.description_text}>{movie.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(movie.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {movie.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {movie.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(movie.budget).format('0,0[.]00 $')}</Text>

                </ScrollView>
            
            )
        }
    }

    _shareMovies(){
        const { movie } = this.state
        Share.share({title: movie.title, message: movie.overview})
        .then( Alert.alert("Succès", "Film partagé !", [{text: "OK", onPress: () => {}}]))
        .catch(err => {
            Alert.alert("Echec", "Film non partagé.", [{text: "OK", onPress: () => {}}])
        })
    }

    componentDidMount() {
        const favoritesMoviesIndex = this.props.favoritesMovies.findIndex(movie => movie.id === this.props.navigation.state.params.id);
        
        if(favoritesMoviesIndex !== -1) {
            this.setState({
                movie: this.props.favoritesMovies[favoritesMoviesIndex]
            }, () => {
                this._updateNavigationParams();
            })
            return;
        }

        this.setState({isLoading: true});
        searchFilmById(this.props.navigation.state.params.id).then(movie => {
            this.setState({
                isLoading: false,
                movie: movie
            }, () => {
                this._updateNavigationParams();
            });
        })
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareMovies: this._shareMovies,
            movie: this.state.movie
        })
    }

    render(){
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayShareButton()}
                {this._displayFilm()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    share_button: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_button_ios: {
        marginRight: 8
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesMovies: state.favoritesMovies
    }
}

export default connect(mapStateToProps)(MovieDetails);