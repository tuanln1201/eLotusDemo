import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppContent from '~/components/UiComponents/Content';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchContent, getSearchPage, getSearchStatus, hasMorePages } from 'store/search/selectors';
import { AppCardInfinityList } from '~/components/UiComponents/CardList';
import { b } from '~/components/UiComponents/Content/AppContent';
import { FetchStatus } from 'common/types/fetch-status';
import { setSearchPage, setSearchQuery } from 'store/search/actions';
import { getCurrentLocation } from 'store/router/selectors';

const Search = () => {
  const location = useSelector(getCurrentLocation);
  const searchResult = useSelector(getSearchContent);
  const dispatch = useDispatch();
  const history = useHistory();
  const hasMoreElements = useSelector(hasMorePages);
  const currentPage = useSelector(getSearchPage);
  const requestStatus = useSelector(getSearchStatus);

  const loadMoreCards = useCallback(() => {
    if (requestStatus !== FetchStatus.PENDING) {
      const nextPage = currentPage + 1;
      dispatch(setSearchPage(nextPage));
    }
  }, [dispatch, requestStatus, currentPage]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (location?.query?.query) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      dispatch(setSearchQuery(location.query.query));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (searchResult?.results?.length === undefined) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  return (
    <>
      <AppContent className={b({ withPaddings: true })}>
        {searchResult?.results && (
          <AppCardInfinityList
            currentPage={currentPage}
            hasMoreElements={hasMoreElements}
            movies={searchResult.results}
            onLoadHandler={loadMoreCards}
          />
        )}
      </AppContent>
    </>
  );
};

export default Search;
