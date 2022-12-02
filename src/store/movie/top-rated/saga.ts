import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes, IFetchTopRatedMoviesStartAction, ISetTopRatedSearchPage } from 'store/movie/top-rated/types';
import { getTopRatedMovies } from '~/services/functions';
import { fetchTopRatedMoviesFailure, fetchTopRatedMoviesSuccess } from 'store/movie/top-rated/actions';
import Notifications from 'react-notification-system-redux';

function* saveTopRatedMovies(page = 1, shouldConcat = false) {
  try {
    const topRatedMovies = yield call(getTopRatedMovies, page);
    yield put(
      fetchTopRatedMoviesSuccess({
        movies: topRatedMovies,
        shouldConcat,
      })
    );
  } catch (error) {
    yield put(fetchTopRatedMoviesFailure());
    yield put(
      Notifications.error({
        title: 'Top rated movies',
        message: 'Error during request, please reload page',
        autoDismiss: 3,
      })
    );
  }
}

function* fetchTopRatedMoviesSaga(action: IFetchTopRatedMoviesStartAction) {
  yield saveTopRatedMovies(1, false);
}

function* fetchTopRatedMoviesWithPageSaga(action: ISetTopRatedSearchPage) {
  const page = action.payload;

  yield saveTopRatedMovies(page, true);
}

export default function* () {
  yield all([
    debounce(150, ActionTypes.SET_TOP_RATED_SEARCH_PAGE, fetchTopRatedMoviesWithPageSaga),
    takeLatest(ActionTypes.FETCH_TOP_RATED_MOVIES_START, fetchTopRatedMoviesSaga),
  ]);
}
