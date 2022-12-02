import React from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@bem-react/classname';

import { Link } from 'react-router-dom';

import './AppNav.sass';
import { getCurrentLocation } from 'store/router/selectors';

const b = cn('MainNav');

const AppNav = () => {
  const pathname = useSelector(getCurrentLocation)?.pathname;

  return (
    <nav className={b()}>
      <ul className={b('List')}>
        <li className={b('Item')}>
          <Link to={'/'} className={b('Link', { active: pathname === '/' })} title={'Home'}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <g
                fill='white'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-miterlimit='10'
                stroke-linejoin='round'
                data-v-7b357a42=''>
                <path d='M8.5 23.2H1.3V9L12 .8 22.7 9v14.2h-7.2v-5c0-1.9-1.6-3.4-3.5-3.4s-3.5 1.5-3.5 3.4v5z'></path>
              </g>
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
