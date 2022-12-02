import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { cn } from '@bem-react/classname';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, history } from 'store/store';
import '@/assets/sass/main.sass';
import AppNav from '~/components/MainComponents/AppNav';
import AppSearch from '~/components/MainComponents/AppSearch';

import ErrorBoundary from '~/components/MainComponents/AppErrorBoundary';
import AppNotifications from '~/components/MainComponents/AppNotifications/AppNotifications';

const Home = lazy(() => import('pages/Home'));
const Movie = lazy(() => import('pages/Movie'));
const Error404 = lazy(() => import('pages/Error404'));
const Search = lazy(() => import('pages/Search'));
const NowPlayingMovies = lazy(() => import('pages/NowPlayingMovies'));
const TopRatedMovies = lazy(() => import('pages/TopRatedMovies'));

const b = cn('App');
const w = cn('Wrapper');

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary className={b()}>
          <AppNotifications />
          <ConnectedRouter history={history}>
            <div className={w()}>
              <AppNav />
              <AppSearch />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path='/' exact render={() => <Home />} />
                  <Route path='/movie/:id' exact render={() => <Movie />} />
                  <Route path='/search' exact render={() => <Search />} />
                  <Route path='/now-playing' exact render={() => <NowPlayingMovies />} />
                  <Route path='/top-rated' exact render={() => <TopRatedMovies />} />
                  <Route component={Error404} />
                </Switch>
              </Suspense>
            </div>
          </ConnectedRouter>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
