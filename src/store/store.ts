import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { StateType } from 'typesafe-actions';
import { createBrowserHistory } from 'history';
import { reducer as notifications } from 'react-notification-system-redux';

import { sagaMiddleware, connectedRouterMiddleware } from 'store/middlewares';
import rootSaga from 'store/saga';
import { IS_DEV } from 'utils/env';

import searchReducer from 'store/search/reducer';

import movieDetailsReducer from 'store/movie/details/reducer';
import nowPlayingMoviesReducer from 'store/movie/now-playing/reducer';
import topRatedMoviesReducer from 'store/movie/top-rated/reducer';
import movieImagesReducer from 'store/movie/images/reducer';

const movieReducers = combineReducers({
  movieDetails: movieDetailsReducer,
  movieImages: movieImagesReducer,
  nowPlayingMovies: nowPlayingMoviesReducer,
  topRatedMovies: topRatedMoviesReducer,
});

export const history = createBrowserHistory();

const rootReducers = combineReducers({
  router: connectRouter(history),
  search: searchReducer,
  movies: movieReducers,
  notifications: notifications,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favoriteMovies'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middlewares = [sagaMiddleware, connectedRouterMiddleware(history)];

export function configureStore(initialState = {}) {
  const enhancer = (IS_DEV ? composeWithDevTools : compose) as typeof compose;
  const composeMiddlewares = enhancer(applyMiddleware(...middlewares));
  const store = createStore(persistedReducer, initialState, composeMiddlewares);

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  return { store, persistor };
}

export type ApplicationState = StateType<typeof rootReducers>;
