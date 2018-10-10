import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import MovieItem from './MovieItem'; 
import { connect } from 'react-redux';


class FilmList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        movies: []
    }

  }

  

  render() {

    if(this.props.favoriteList){
        return (
            <FlatList
                style={styles.liste}
                data={this.props.movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <MovieItem
                            movie= {item}
                            isMovieFavorite={(this.props.favoritesMovies.findIndex(movie => movie.id === item.id) !== -1 ? true : false)}
                            displayDetails={this.props.displayDetails}
                        />
                    )
                }} 
            />
        )
    } else {
        return (
            <FlatList 
                style={styles.liste}
                data={this.props.movies}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                renderItem={({item}) => (
                    <MovieItem 
                        movie={item}
                        isMovieFavorite={(this.props.favoritesMovies.findIndex(movie => movie.id === item.id) !== -1 ? true : false)}
                        displayDetails={this.props.displayDetails}
                    />
                
                )}
                onEndReached={() => {
                    if(this.props.movies.length > 0 && this.props.page < this.props.totalPage){
                        this.props.loadFilms()
                    }
                }}
            />
    );
    }
  }
}


const styles = StyleSheet.create({
    liste:{
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesMovies: state.favoritesMovies
    }
}

export default connect(mapStateToProps)(FilmList);
