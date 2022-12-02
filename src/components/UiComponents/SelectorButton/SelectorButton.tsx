import React, { FunctionComponent } from 'react';
import './SelectorButton.sass';

interface IProps {
  type: string;
  handleType: () => void;
}
const SelectorButton: FunctionComponent<IProps> = ({ type, handleType }) => {
  const classTheaters = type === 'theaters' ? 'selector active' : 'selector';
  const classTop = type === 'top' ? 'selector active' : 'selector';
  return (
    <button className='button_selector' onClick={handleType}>
      <div className={classTheaters}>
        <h5>Theaters</h5>
      </div>
      <div className={classTop}>
        <h5>Top Rated</h5>
      </div>
    </button>
  );
};

export default SelectorButton;
