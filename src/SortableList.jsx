import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { DraggableCore } from 'react-draggable';
import clsx from 'clsx';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    position: 'absolute',
    transition: 'all .2s ease-in',
    transitionProperty: 'left, top, width, height, opacity'
  },
  root_dragging: {
    transition: 'none'
  },
  root_notDragging: {
    opacity: 0.45
  },
  handle: {
    border: 'none',
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
  handle_dragging: {
    cursor: 'grabbing',
    color: '#1c1c1c'
  },
  shadow: {
    background: 'rgba(255, 0, 0, .35)',
    position: 'absolute'
  }
});

const DefaultDragHandle = ({ isDragging, classes, ...props }) => (
  <button type="button" {...props} />
);

DefaultDragHandle.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  classes: PropTypes.string.isRequired
};

const SortablisList = ({
  children = [],
  classes = '',
  rowHeight,
  onReorder = () => { },
  dragHandle: DragHandle = DefaultDragHandle
}) => {
  const c = useStyles();
  // assume all items are same width
  const [containerRef, setContainerRef] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [transitionId, setTransitionId] = useState(null);
  const [oldIndex, setOldIndex] = useState(null);
  const [shadowStyle, setShadowStyle] = useState({ height: rowHeight, top: 0 });
  const [componentIds] = useState(
    React.Children.toArray(children).map((child) => child.props.id)
  );
  const [rowData, setRowData] = useState(
    componentIds.reduce((acc, id, index) => {
      acc[id] = {
        id,
        index,
        dropIndex: index,
        top: index * rowHeight,
        dropTop: index * rowHeight
      };
      return acc;
    }, {})
  );

  const updateRow = useCallback(
    (id, row) => {
      setRowData({ ...rowData, [id]: row });
    },
    [rowData]
  );

  const onStart = useCallback(
    (event, data, id) => {
      const row = { ...rowData[id] };
      const index = Object.keys(rowData).findIndex((k) => k === id);
      row.dropIndex = index;
      setDragId(id);
      updateRow(id, row);
      const { width } = containerRef.getBoundingClientRect();
      setShadowStyle({ ...shadowStyle, width, top: index * rowHeight });
    },
    [containerRef, rowData, rowHeight, shadowStyle, updateRow]
  );

  const onDrag = useCallback(
    (event, data) => {
      const row = rowData[dragId];
      const top = row.top + data.deltaY;
      let newIndex = Math.round(top / rowHeight);
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex > componentIds.length - 1) {
        newIndex = componentIds.length - 1;
      }

      rowData[dragId].top = top;
      rowData[dragId].zIndex = 1;

      if (newIndex !== row.dropIndex) {
        rowData[dragId].dropIndex = newIndex;
        let nextIndex = 0;
        const remainingRows = Object.values(rowData).filter(
          (x) => x.id !== row.id
        );
        const changedIds = [];
        while (nextIndex < remainingRows.length) {
          const ordered = remainingRows
            .filter((x) => !changedIds.includes(x.id))
            .sort((a, b) => a.index - b.index);
          if (!ordered.length) break;
          const lowestId = ordered[0].id;
          if (nextIndex === newIndex) nextIndex += 1;
          rowData[lowestId] = {
            ...rowData[lowestId],
            index: nextIndex,
            top: nextIndex * rowHeight
          };
          changedIds.push(lowestId);
          nextIndex += 1;
        }
        setShadowStyle({ ...shadowStyle, top: newIndex * rowHeight });
        setRowData({ ...rowData });
      }
    },
    [componentIds.length, dragId, rowData, rowHeight, shadowStyle]
  );

  const onStop = useCallback(
    () => {
      const row = { ...rowData[dragId] };
      setOldIndex(row.index);
      row.index = row.dropIndex;
      row.top = row.index * rowHeight;
      delete row.zIndex;
      updateRow(dragId, row);
      setTransitionId(dragId);
      setDragId(null);
    },
    [dragId, rowData, rowHeight, updateRow]
  );

  const onTransitionEnd = (e) => {
    onReorder(e.nativeEvent, {
      oldIndex,
      newIndex: rowData[transitionId].index
    });
    setTransitionId(null);
    setOldIndex(null);
  };

  return (
    <>
      <div className={clsx(c.shadow, classes.shadow)} style={shadowStyle} />
      {React.Children.map(children, (child) => {
        const { id } = child.props;
        return (
          <DraggableCore
            handle=".draggable_handle"
            onStart={(event, data) => onStart(event, data, id)}
            onDrag={onDrag}
            onStop={onStop}
          >
            <div
              className={clsx(
                c.root,
                classes.root,
                id === dragId && c.root_dragging,
                dragId !== null && id !== dragId && c.root_notDragging
              )}
              style={rowData[id]}
              ref={setContainerRef}
              onTransitionEnd={(e) => id === transitionId && onTransitionEnd(e)}
            >
              {child}
              <DragHandle
                classes="draggable_handle"
                isDragging={id === dragId}
                className={clsx(
                  'draggable_handle',
                  clsx(
                    c.handle,
                    classes.handle,
                    id === dragId && c.handle_dragging
                  )
                )}
              />
            </div>
          </DraggableCore>
        );
      })}
    </>
  );
};

SortablisList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  classes: PropTypes.shape({}),
  rowHeight: PropTypes.number.isRequired,
  onReorder: PropTypes.func,
  dragHandle: PropTypes.node
};

export default SortablisList;
