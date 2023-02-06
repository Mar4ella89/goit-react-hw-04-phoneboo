import React from 'react';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({value, onChange}) => {
  return (
    <label className={css.labelFind}>
      Find contacts by name
      <input
        type="text"
        className={css.inputFind}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
