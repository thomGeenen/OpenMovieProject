'use strict';

import { createStore } from 'redux';
import toggleFavorites from './reducers/favorite.reducer';



export default createStore(toggleFavorites);