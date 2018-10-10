import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FilmList from './FilmList'; 
import { connect } from 'react-redux';

class Favorites extends React.Component {

  constructor(props) {
    super(props);
    
    this._displayDetails = this._displayDetails.bind(this);

  }

  _displayDetails (id) {
    this.props.navigation.navigate('MovieDetails', {id: id});
  }

  render() {
    return (
      <FilmList 
        movies={this.props.favoritesMovies}
        displayDetails={this._displayDetails} 
        favoriteList={true}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    favoritesMovies: state.favoritesMovies
  }
}

export default connect(mapStateToProps)(Favorites);
