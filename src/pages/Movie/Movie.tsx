import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppIntro from '~/components/UiComponents/Intro';
import AppContent from '~/components/UiComponents/Content';

import { clearMovieDetails, fetchMovieDetailsStart } from 'store/movie/details/actions';
import { getMovieDetails, getMovieDetailsFetchStatus } from 'store/movie/details/selectors';
import { fetchMovieImagesStart } from 'store/movie/images/actions';

interface IRouteParams {
  id: string;
}

const Movie = () => {
  const dispatch = useDispatch();
  const params = useParams<IRouteParams>();
  const movie = useSelector(getMovieDetails);
  const detailsFetchStatus = useSelector(getMovieDetailsFetchStatus);

  useEffect(() => {
    dispatch(fetchMovieDetailsStart(Number(params.id)));
    dispatch(fetchMovieImagesStart(Number(params.id)));
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, params]);

  return (
    <>
      <AppContent>
        <AppIntro
          overview={movie?.overview}
          backdrop_path={movie?.backdrop_path}
          id={movie?.id}
          original_title={movie?.title}
          release_date={movie?.release_date}
          runtime={movie?.runtime}
          fetchStatus={detailsFetchStatus}
        />
      </AppContent>
    </>
  );
};

export default Movie;
