import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'react/components/Spinner';
import 'icons/warning.svg';
import './Card.scss';

const CardError = ({ message }) => {
  if (message) {
    return (
      <div className="Card__error">
        <img src="/assets/images/warning.svg" />
        {message}
      </div>
    );
  } else {
    return null;
  }
};
CardError.propTypes = {
  message: PropTypes.string
};

const Card = ({ children, title, loading, error, className }) => {
  const classNames = ['Card', className].join(' ');
  return (
    <div className={classNames}>
      <div className="Card__title">
        <h2>{title}</h2>
      </div>
      <div className="Card__body">
        { loading
          ? <Spinner />
          : <CardError {...error} />
        }

        { !loading && !error && children }
      </div>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default Card;
