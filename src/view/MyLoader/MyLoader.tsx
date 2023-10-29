import './MyLoader.scss';
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class MyLoader extends React.Component {
  render() {
    return (
      <div className="loader__container">
        <p className="loader__title">Loading . . .</p>
        <div className="loader__items">
          <div className="loader-item-1" />
          <div className="loader-item-2" />
          <div className="loader-item-3" />
        </div>
      </div>
    );
  }
}

export default MyLoader;
