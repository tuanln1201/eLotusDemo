import { ISearch } from 'common/types/search';
import { IMovie } from 'common/types/movie';
import { IMovieDetails } from 'common/types/movie-details';
import { IImages } from 'common/types/images';

const fetchJSON = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, received ${response.status} error`);
  }

  return response.json();
};

export const getContentBySearchQuery = async (query: string, page = 1) => {
  return fetchJSON(
    `${process.env.REACT_APP_API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${process.env.REACT_APP_API_LANGUAGE}&query=${query}&page=${page}&include_adult=false`
  );
};

export const getMovieDetails = async (id: number): Promise<IMovieDetails> => {
  return fetchJSON(
    `${process.env.REACT_APP_API_URL}movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${process.env.REACT_APP_API_LANGUAGE}`
  );
};

export const getMovieImages = async (id: number): Promise<IImages> => {
  return fetchJSON(`${process.env.REACT_APP_API_URL}movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`);
};

export const getNowPlayingMovies = async (page = 1): Promise<ISearch<IMovie>> => {
  return fetchJSON(
    `${process.env.REACT_APP_API_URL}movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=${process.env.REACT_APP_API_LANGUAGE}&page=${page}`
  );
};

export const getTopRatedMovies = async (page = 1): Promise<ISearch<IMovie>> => {
  return fetchJSON(
    `${process.env.REACT_APP_API_URL}movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=${process.env.REACT_APP_API_LANGUAGE}&page=${page}`
  );
};
