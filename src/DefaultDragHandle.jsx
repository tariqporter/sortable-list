import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles({
  root: {
    border: 'none',
    margin: 'auto 0 auto auto',
    outline: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#7a7a7a',
    '&:after': {
      content: "'☰'"
    },
    '&:hover': {
      color: '#1c1c1c'
    }
  },
  root_dragging: {
    cursor: 'grabbing',
    color: '#1c1c1c'
  }
});

const DefaultDragHandle = ({ isDragging, className, ...props }) => {
  const c = useStyles();
  return (
    <button
      type="button"
      className={clsx(c.root, isDragging && c.root_dragging, className)}
      {...props}
    />
  );
};

DefaultDragHandle.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired
};

export default DefaultDragHandle;
