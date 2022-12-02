import React, { FunctionComponent, useCallback, useEffect } from 'react';

import AppContent from '~/components/UiComponents/Content';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from 'common/types/fetch-status';
import { b } from '~/components/UiComponents/Content/AppContent';
import { AppCardInfinityList } from '~/components/UiComponents/CardList';
import {
  getCurrentPageTopRatedMovies,
  getTopRatedFetchStatus,
  getTopRatedMovies,
  hasMorePagesWithTopRatedMovies,
} from 'store/movie/top-rated/selectors';
import { fetchTopRatedMoviesStart, setTopRatedSearchPage } from 'store/movie/top-rated/actions';

const TopRatedMovies: FunctionComponent = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(getTopRatedMovies);
  const hasMoreElements = useSelector(hasMorePagesWithTopRatedMovies);
  const currentPage = useSelector(getCurrentPageTopRatedMovies);
  const requestStatus = useSelector(getTopRatedFetchStatus);

  useEffect(() => {
    dispatch(fetchTopRatedMoviesStart());
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Top rated movies 🌟';
  }, []);

  const loadMoreCards = useCallback(() => {
    if (requestStatus !== FetchStatus.PENDING) {
      const nextPage = currentPage + 1;
      dispatch(setTopRatedSearchPage(nextPage));
    }
  }, [dispatch, requestStatus, currentPage]);

  return (
    <>
      <AppContent className={b({ withPaddings: true })}>
        {topRatedMovies?.results && (
          <AppCardInfinityList
            currentPage={currentPage}
            hasMoreElements={hasMoreElements}
            movies={topRatedMovies.results}
            onLoadHandler={loadMoreCards}
          />
        )}
      </AppContent>
    </>
  );
};

export default TopRatedMovies;
