import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';

import { Link } from 'react-router-dom';
import AppLazyImage from '~/components/UiComponents/LazyImage';

import './Card.sass';
import { IMovie } from 'common/types/movie';
import { buildImagePath } from 'utils/buildImagePath';
import { PosterSizes } from 'common/types/images-sizes';
const b = cn('Card');

interface IProps {
  title: IMovie['title'];
  poster_path: IMovie['poster_path'];
  id: IMovie['id'];
}

// eslint-disable-next-line @typescript-eslint/camelcase
const AppCard: FunctionComponent<IProps> = ({ title, poster_path, id }) => {
  return (
    <article className={b()}>
      <Link
        to={`/movie/${id}`}
        className={b('Link')}
        aria-label={`Open ${title} movie`}
        // target={shouldOpenInNewTab ? '_blank' : '_self'}
      >
        <figure className={b('Figure')}>
          <picture className={b('Picture')}>
            <AppLazyImage
              image={buildImagePath(poster_path, PosterSizes.w342)}
              className={b('Img')}
              width={240}
              height={360}
              alt={title}
            />
          </picture>
        </figure>
        <h2 className={b('Name')}>{title}</h2>
      </Link>
    </article>
  );
};

export default AppCard;
