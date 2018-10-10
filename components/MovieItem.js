import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getImage } from '../api/tmdb';


class MovieItem extends React.Component {

    constructor(props){
        super(props);
    }
    
    _displayFavorite() {
        if (this.props.isMovieFavorite) {
            var sourceImage = require('../assets/fullfiled_heart.png');
            return(
                <Image 
                    source={sourceImage} 
                    style={styles.favorite_image}
                />
            )
        } 
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.movie};
        this.props.dispatch(action);
    }

    // _displayDetails(id){
    //     this.props.navigation('MovieDetails', {id: id});
    // }

    render(){
        const { movie, displayDetails } = this.props;
        return (
            <TouchableOpacity 
                style={styles.main_container} 
                onPress={() => { displayDetails(movie.id) }} >

                <Image 
                    source={{uri: getImage(movie.poster_path)}} 
                    style={styles.image} />

                <View style={styles.info_container}>

                    <View style={styles.header_container}>
                        {this._displayFavorite()}
                        <Text style={styles.title_text}>{movie.title}</Text>
                        <Text style={styles.vote_text}>{movie.vote_average}</Text>
                    </View>

                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{movie.overview}</Text>
                    </View>

                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>{movie.release_date}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        height: 190,
    }, 
    image: {
        width: 120,
        height: 180,
        margin: 5,
    },
    info_container: {
        flex: 1,
        margin:5
    },
    header_container: {
        flex:3,
        flexDirection: "row",
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex:7
    },
    description_text: {
        fontStyle: "italic",
        color: "#666666"
    },
    date_container: {
        flex:1
    },
    date_text: {
        textAlign: "right",
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25
    },
    favorite_container: {
        alignItems: 'center'
    },

});

const mapStateToProps = (state) => {
    return {
        favoritesMovies: state.favoritesMovies
    }
}

export default MovieItem;