//import liraries
import React from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import MovieItem from './MovieItem';
import { searchFilm } from '../api/tmdb';
import { connect } from 'react-redux';
import FilmList  from './FilmList';

// create a component
class Search extends React.Component {

    constructor(props) {
        super(props);

        this._loadFilms = this._loadFilms.bind(this);
        this._displayDetails = this._displayDetails.bind(this);

        this.page = 0;
        this.totalPage = 0;
        this.query = "";
        this.state = {
            movies: [],
            displayActivityLoader: false,
        };
    }

    _loadFilms() {
        if(this.query.length > 0) {
            this.setState({displayActivityLoader: true});
            searchFilm(this.query, this.page + 1).then(data => {
                this.page = data.page;
                this.totalPage = data.total_pages;
                this.setState({
                    movies: this.state.movies.concat(data.results),
                    displayActivityLoader: false,
                });
            });
        }
    }


    _displayLoading(){
        if(this.state.displayActivityLoader) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _searchMovie() {
        this.page = 0;
        this.totalPage = 0;
        this.setState({
            movies: []
        }, () => {
            this._loadFilms();
        })
    }

    _updateText(query) {
        this.query = query
    }

    _displayDetails(id) {
        this.props.navigation.navigate('MovieDetails', {id: id});
    }

    

    render() {
        return (
            <View style={styles.container}>
                
                <TextInput 
                placeholder="Titre du film" 
                style={styles.textInput} 
                onChangeText={(text) => this._updateText(text)}
                onSubmitEditing={() => this._searchMovie()}
                />

                <Button title = "Rechercher" buttonStyle={styles.button} onPress = {() => { this._searchMovie()}}/>

                 <FilmList
                     movies={this.state.movies}
                     loadFilms={this._loadFilms}
                     displayDetails = {this._displayDetails}
                     page={this.page}
                     totalPage={this.totalPage} />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        width: 355,
        borderWidth: 1,
        paddingLeft: 5
    },
    button: {
        height: 45,
        width: 350,
        backgroundColor: "blue"
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesMovies: state.favoritesMovies
    }
}

//make this component available to the app
export default Search;
