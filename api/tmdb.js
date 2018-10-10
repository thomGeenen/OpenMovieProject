'use strict';

const API_TOKEN = "857c9bc41a576799007f91f771bd1664";

export function searchFilm(data, pagination) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_TOKEN + "&language=fr&query=" + data + "&page=" + pagination;

    return fetch(url).then(res =>res.json()).catch(error => console.error(error));
}

export function getImage(path) {
    return 'https://image.tmdb.org/t/p/w300' + path;
}

export function searchFilmById(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + "?api_key=" + API_TOKEN + "&language=fr";

    return fetch(url).then(res => res.json()).catch(error => console.error(error));
}