import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './AppErrorIndicator.sass';

interface IProps {
  className?: string;
}

const b = cn('ErrorIndicator');

const AppErrorIndicator: FunctionComponent<IProps> = ({ className }) => {
  return (
    <div className={classnames(b(), className)}>
      <h2 className={b('Title')}>Whoops!</h2>
      <h3 className={b('Subtitle')}>Something went wrong.</h3>
    </div>
  );
};

export default AppErrorIndicator;
