import React from 'react';
import { cn } from '@bem-react/classname';

import './404.sass';

const b = cn('Error404');

const App404 = () => {
  return (
    <section className={b()}>
      <h1 className={b('Title')}>404 Not Found</h1>
    </section>
  );
};

export default App404;
