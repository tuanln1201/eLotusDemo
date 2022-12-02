import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/components/MainComponents/App';
import * as serviceWorker from './serviceWorker';

// set svg sprite
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import * as icons from './assets/img/icons';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
