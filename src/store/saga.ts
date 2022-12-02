import { all } from 'redux-saga/effects';

import searchSaga from 'store/search/saga';
import nowPlayingMoviesSaga from 'store/movie/now-playing/saga';
import topRatedMoviesSaga from 'store/movie/top-rated/saga';
import movieDetailsSaga from 'store/movie/details/saga';
import movieImagesSaga from 'store/movie/images/saga';

export default function* rootSaga() {
  yield all([searchSaga(), movieDetailsSaga(), nowPlayingMoviesSaga(), topRatedMoviesSaga(), movieImagesSaga()]);
}
