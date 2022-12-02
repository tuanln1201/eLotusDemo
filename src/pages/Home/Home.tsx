import React, { useEffect, useState } from 'react';
import AppSpin from '~/components/UiComponents/Spin/AppSpin';
import { useDispatch, useSelector } from 'react-redux';
import { getNowPlayingMovies } from 'store/movie/now-playing/selectors';
import { fetchNowPlayingMoviesStart } from 'store/movie/now-playing/actions';
import { getTopRatedMovies } from 'store/movie/top-rated/selectors';
import { fetchTopRatedMoviesStart } from 'store/movie/top-rated/actions';
import SelectorButton from '~/components/UiComponents/SelectorButton/SelectorButton';
import NowPlayingMovies from '../NowPlayingMovies';
import TopRatedMovies from '../TopRatedMovies';

const Home = () => {
  const [typeFilm, setTypeFilm] = useState('theaters');
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(getNowPlayingMovies);
  const topRatedMovies = useSelector(getTopRatedMovies);

  useEffect(() => {
    if (typeFilm === 'top') {
      dispatch(fetchTopRatedMoviesStart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilm]);

  useEffect(() => {
    dispatch(fetchNowPlayingMoviesStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleHandler = () => {
    if (typeFilm === 'theaters') {
      setTypeFilm('top');
    } else if (typeFilm === 'top') {
      setTypeFilm('theaters');
    }
  };

  return (
    <React.Fragment>
      <SelectorButton type={typeFilm} handleType={toggleHandler} />
      {nowPlayingMovies && typeFilm === 'theaters' && <NowPlayingMovies />}
      {topRatedMovies && typeFilm === 'top' && <TopRatedMovies />}
      {nowPlayingMovies === undefined && topRatedMovies === undefined && <AppSpin minHeight={500} />}
    </React.Fragment>
  );
};

export default Home;
