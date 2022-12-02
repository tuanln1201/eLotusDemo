import React, { FunctionComponent, useCallback } from 'react';
import { cn } from '@bem-react/classname';

import AppCard from '~/components/UiComponents/Card';
import InfiniteScroll from 'react-infinite-scroller';
import { IMovie } from 'common/types/movie';

import './CardList.sass';

const b = cn('CardList');

interface IMovieList extends IProps {
  movies: IMovie[];
}

interface IProps {
  onLoadHandler: () => void;
  currentPage: number;
  hasMoreElements: boolean;
}

export const AppCardInfinityList: FunctionComponent<IMovieList> = ({
  movies,
  onLoadHandler,
  currentPage,
  hasMoreElements,
}) => {
  const loadMoreCards = useCallback(() => {
    onLoadHandler();
  }, [onLoadHandler]);

  return (
    <div className={b()}>
      <div className={b('Content')}>
        <InfiniteScroll
          element='ul'
          pageStart={currentPage}
          hasMore={hasMoreElements}
          initialLoad={false}
          loadMore={loadMoreCards}
          className={b('List', { '6items': Boolean(movies) })}>
          {movies &&
            movies.map((movie) => {
              return (
                <li className={b('Item')} key={movie.id}>
                  <AppCard title={movie.title} poster_path={movie.poster_path} id={movie.id} />
                </li>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AppCardInfinityList;
