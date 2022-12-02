import React, { useCallback, useEffect } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

import AppContent from '~/components/UiComponents/Content';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from 'common/types/fetch-status';
import { b } from '~/components/UiComponents/Content/AppContent';
import { AppCardInfinityList } from '~/components/UiComponents/CardList';
import {
  getCurrentPageNowPlayingMovies,
  getNowPlayingFetchStatus,
  getNowPlayingMovies,
  hasMorePagesWithNowPlayingMovies,
} from 'store/movie/now-playing/selectors';
import { fetchNowPlayingMoviesStart, setNowPlayingSearchPage } from 'store/movie/now-playing/actions';

const NowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(getNowPlayingMovies);
  const hasMoreElements = useSelector(hasMorePagesWithNowPlayingMovies);
  const currentPage = useSelector(getCurrentPageNowPlayingMovies);
  const requestStatus = useSelector(getNowPlayingFetchStatus);
  useEffect(() => {
    dispatch(fetchNowPlayingMoviesStart());
  }, [dispatch]);
  const handleRefresh = () => {
    dispatch(fetchNowPlayingMoviesStart());
  };

  const loadMoreCards = useCallback(() => {
    if (requestStatus !== FetchStatus.PENDING) {
      const nextPage = currentPage + 1;
      dispatch(setNowPlayingSearchPage(nextPage));
    }
  }, [dispatch, requestStatus, currentPage]);

  return (
    <>
      <AppContent className={b({ withPaddings: true })}>
        {nowPlayingMovies?.results && (
          <PullToRefresh onRefresh={async () => handleRefresh()}>
            <AppCardInfinityList
              currentPage={currentPage}
              hasMoreElements={hasMoreElements}
              movies={nowPlayingMovies.results}
              onLoadHandler={loadMoreCards}
            />
          </PullToRefresh>
        )}
      </AppContent>
    </>
  );
};

export default NowPlayingMovies;
