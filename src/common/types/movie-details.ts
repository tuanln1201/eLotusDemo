import { IMovie } from 'common/types/movie';

export interface IMovieDetails extends IMovie {
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}
