/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import { Link } from 'react-router-dom';
import AppLazyImage from '~/components/UiComponents/LazyImage';
import { buildImagePath } from 'utils/buildImagePath';
import { BackdropSizes } from 'common/types/images-sizes';
import { FetchStatus } from 'common/types/fetch-status';
import defaultBackdrop from 'src/assets/img/default-backdrop.jpg';

import './AppIntro.sass';

const b = cn('Intro');

interface IProps {
  id: number | undefined;
  original_title: string | undefined;
  release_date: Date | undefined;
  runtime: number | undefined;
  overview: string | undefined;
  backdrop_path: string | undefined;
  fetchStatus: FetchStatus | null;
}

const AppIntro: FunctionComponent<IProps> = ({
  id,
  original_title,
  release_date,
  runtime,
  overview,
  backdrop_path,
  fetchStatus,
}) => {
  return (
    <div className={b()}>
      <div className={b('Inner')}>
        {id && original_title && (
          <h1 className={classnames(b('Title'), 'Title')}>
            <Link to={`/movie/${id}`}>{original_title}</Link>
          </h1>
        )}

        <div className={b('Info')}>
          <div className={b('MetaInfo')}>
            {release_date ? (
              <span className={classnames(b('Year'), b('Meta'))}>{new Date(release_date).getUTCFullYear()}</span>
            ) : null}
          </div>
        </div>
      </div>
      {fetchStatus === FetchStatus.SUCCESS && (
        <figure className={b('Figure', { default: !backdrop_path })}>
          <picture className={b('Pic')}>
            <AppLazyImage
              image={backdrop_path ? `${buildImagePath(backdrop_path, BackdropSizes.w1280)}` : defaultBackdrop}
              className={b('Img', { default: !backdrop_path })}
            />
          </picture>
        </figure>
      )}
    </div>
  );
};

export default AppIntro;
