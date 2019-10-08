import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jss, createUseStyles } from 'react-jss';
import { DraggableCore } from 'react-draggable';
import clsx from 'clsx';
import DefaultDragHandle from './DefaultDragHandle';

jss.setup({
  insertionPoint: document.head.firstChild
});

const useStyles = createUseStyles({
  root: {
    position: 'relative'
  },
  row: {
    display: 'flex',
    width: '100%',
    transitionProperty: 'left, top, width, height, opacity'
  },
  row_dragging: {
  },
  row_notDragging: {
    opacity: 0.45
  },
  handle: {
    margin: 'auto 0 auto auto',
    cursor: 'pointer'
  },
  handle_dragging: {
    cursor: 'grabbing'
  },
  shadow: {
    background: 'rgba(255, 0, 0, .35)',
    position: 'absolute'
  },
  contentContainer: {
    flex: '1 1 auto'
  },
  _draggableHandle: {}
});

const SortablisList = ({
  children = [],
  classes = {},
  onReorder = () => { },
  dragHandle: DragHandle = DefaultDragHandle,
  ...other
}) => {
  const c = useStyles();
  let rootRef = null;
  const rowRefs = {};
  const [refDimensions, setRefDimensions] = useState({});
  const [rootTop, setRootTop] = useState(0);
  const [dragId, setDragId] = useState(null);
  const [transitionId, setTransitionId] = useState(null);
  const [oldIndex, setOldIndex] = useState(null);
  const [shadowIndex, setShadowIndex] = useState(null);
  const [shadowStyle, setShadowStyle] = useState({ height: 0, top: 0 });
  const [componentIds, setComponentIds] = useState(
    React.Children.map(children, (child) => child.key)
  );

  const [rowData, setRowData] = useState(
    componentIds.reduce((acc, id, index) => {
      acc[id] = {
        id,
        index,
        style: {
          top: 0
          // position
          // transition
        }
      };
      return acc;
    }, {})
  );

  useEffect(() => {
    if (transitionId === null) {
      Object.keys(rowData).forEach((k) => {
        const {
          transition,
          position,
          top,
          ...style
        } = rowData[k].style;
        style.top = 0;
        rowData[k].style = style;
      });
      setRowData({ ...rowData });
    }
  }, [transitionId]);

  useEffect(() => {
    setComponentIds(React.Children.map(children, (child) => child.key));
  }, [children]);

  const onStart = useCallback(
    (event, data, id) => {
      let runningTop = 0;
      const sortedRows = Object.values(rowData).sort(
        (a, b) => a.index - b.index
      );

      const rd = sortedRows.reduce((acc, x) => {
        const { top, bottom, height } = rowRefs[x.id].getBoundingClientRect();
        acc[x.id] = { top, bottom, height };
        rowData[x.id].style.top = runningTop;
        runningTop += height;
        return acc;
      }, {});
      setRefDimensions(rd);

      requestAnimationFrame(() => {
        Object.keys(rowData).forEach((k) => {
          if (k !== id) rowData[k].style.transition = 'all .2s ease-in';
          else rowData[k].style.transition = 'none';
          rowData[k].style.position = 'absolute';
        });
      });

      const { width, height: shadowHeight } = rowRefs[
        id
      ].getBoundingClientRect();
      const index = sortedRows.findIndex((x) => x.id === id);
      setShadowIndex(index);
      setOldIndex(index);
      setShadowStyle({
        ...shadowStyle,
        width,
        top: rowData[id].style.top,
        height: shadowHeight
      });
      const { top: rt1 } = rootRef.getBoundingClientRect();
      setRootTop(rt1);
      setDragId(id);
      setRowData({ ...rowData });
    },
    [rowRefs, shadowStyle, rowData]
  );

  const onDrag = useCallback(
    (event, data) => {
      const row = rowData[dragId];
      if (!data.deltaY) return;
      const isDraggingUp = data.deltaY < 0;
      const newTop = row.style.top + data.deltaY;
      const dragRowTop = newTop + rootTop;
      const dragRowBottom = dragRowTop + refDimensions[dragId].height;
      const dragRowHeight = refDimensions[dragId].height;

      rowData[dragId].style.top = newTop;
      rowData[dragId].style.zIndex = 1;

      const sortedRows = Object.values(rowData).sort(
        (a, b) => a.index - b.index
      );
      const refKeys = sortedRows.map((x) => x.id).filter((k) => k !== dragId);
      const newShadow = { index: null, top: null };
      if (refKeys.length) {
        const {
          top: firsrRowTop,
          bottom: firstRowBottom,
          height: firstRowHeight
        } = refDimensions[refKeys[0]];
        const {
          top: lastRowTop,
          bottom: lastRowBottom,
          height: lastRowHeight
        } = refDimensions[refKeys[refKeys.length - 1]];
        const firstHeightComparison = dragRowHeight > firstRowHeight ? firstRowHeight : dragRowHeight;
        const lastHeightComparison = dragRowHeight > lastRowHeight ? lastRowHeight : dragRowHeight;

        if (isDraggingUp && dragRowBottom < firstRowBottom - firstHeightComparison / 2) {
          newShadow.index = 0;
          newShadow.top = firsrRowTop - rootTop;
        } else if (!isDraggingUp && dragRowTop >= lastRowBottom - lastHeightComparison / 2) {
          newShadow.index = Object.keys(rowRefs).length - 1;
          newShadow.top = lastRowTop - rootTop;
        }
      }

      for (let i = 0; i < refKeys.length; i += 1) {
        const refId = refKeys[i];
        const {
          top: rowTop,
          bottom: rowBottom,
          height: rowHeight
        } = refDimensions[refId];
        const heightComparison = dragRowHeight > rowHeight ? rowHeight : dragRowHeight;
        if (
          // dragging down
          !isDraggingUp
          && dragRowBottom < rowBottom
          && dragRowBottom >= rowBottom - heightComparison / 2
        ) {
          newShadow.index = rowData[refId].index;
          newShadow.top = rowBottom - rootTop - dragRowHeight;
          break;
        } else if (
          // dragging up
          isDraggingUp
          && dragRowTop >= rowTop
          && dragRowTop < rowTop + heightComparison / 2
        ) {
          newShadow.index = rowData[refId].index;
          newShadow.top = rowTop - rootTop;
          break;
        }
      }

      if (newShadow.index === null) {
        newShadow.index = rowData[dragId].index;
        const newShadow1 = Object.values(rowData).find(
          (x) => x.index === newShadow.index
        );
        newShadow.top = newShadow1.top;
      }
      if (newShadow.index === shadowIndex) return;

      const newRefDimensions = { ...refDimensions };
      const rows = Object.values(rowData).filter((x) => x.id !== dragId);
      let nextIndex = 0;
      let runningTop = 0;
      let ordered = rows.sort((a, b) => a.index - b.index);
      while (ordered.length) {
        const nextId = ordered[0].id;
        ordered = ordered.slice(1);
        const { height: nextHeight } = refDimensions[nextId];
        if (nextIndex === newShadow.index) {
          nextIndex += 1;
          runningTop += refDimensions[dragId].height;
        }
        const topDifference = runningTop - rowData[nextId].style.top;
        rowData[nextId] = {
          ...rowData[nextId],
          index: nextIndex,
          style: {
            ...rowData[nextId].style,
            top: runningTop
          }
        };
        const crd = newRefDimensions[nextId];
        newRefDimensions[nextId] = {
          ...crd,
          top: crd.top + topDifference,
          bottom: crd.bottom + topDifference
        };
        runningTop += nextHeight;
        nextIndex += 1;
      }

      rowData[dragId] = {
        ...rowData[dragId],
        index: newShadow.index
      };

      setRefDimensions(newRefDimensions);
      setShadowIndex(newShadow.index);
      setShadowStyle({
        ...shadowStyle,
        top: newShadow.top
      });
      setRowData({ ...rowData });
    },
    [dragId, rowData, shadowStyle, rootRef, rowRefs, shadowIndex, refDimensions]
  );

  const onStop = useCallback(() => {
    const newRowData = {
      ...rowData,
      [dragId]: {
        ...rowData[dragId],
        style: {
          ...rowData[dragId].style,
          top: shadowStyle.top,
          transition: 'all .2s ease-in'
        }
      }
    };
    delete newRowData[dragId].style.zIndex;
    setTransitionId(dragId);
    setRowData(newRowData);
    setDragId(null);
    setShadowIndex(null);
    setShadowStyle({ ...shadowStyle, height: 0 });
  }, [dragId, rowData, shadowStyle]);

  const onTransitionEnd = useCallback(
    (e) => {
      const newIndex = rowData[transitionId].index;
      onReorder(e.nativeEvent, {
        oldIndex,
        newIndex
      });
      setTransitionId(null);
      setOldIndex(null);
    },
    [oldIndex, onReorder, rowData, transitionId]
  );

  return (
    // eslint-disable-next-line no-return-assign
    <div className={clsx(c.root, classes.root)} ref={(ref) => (rootRef = ref)} {...other}>
      <div className={clsx(c.shadow, classes.shadow)} style={shadowStyle} />
      {React.Children.map(children, (child) => {
        const id = child.key;
        // eslint-disable-next-line react/prop-types
        const dragHandle = ({ className, ...props }) => (
          <DragHandle
            isDragging={id === dragId}
            className={clsx(
              className,
              c._draggableHandle,
              c.handle,
              id === dragId && c.handle_dragging,
              classes.handle
            )}
            {...props}
          />
        );
        const clone = React.cloneElement(child, { DragHandle: dragHandle });
        return (
          <DraggableCore
            handle={`.${c._draggableHandle}`}
            onStart={(event, data) => onStart(event, data, id)}
            onDrag={onDrag}
            onStop={onStop}
          >
            <div
              className={clsx(
                c.row,
                classes.row,
                id === dragId && c.row_dragging,
                dragId !== null && id !== dragId && c.row_notDragging
              )}
              style={rowData[id].style}
              // eslint-disable-next-line no-return-assign
              ref={(ref) => (rowRefs[id] = ref)}
              onTransitionEnd={(e) => id === transitionId && onTransitionEnd(e)}
            >
              <div className={clsx(c.contentContainer, classes.contentContainer)}>{clone}</div>
            </div>
          </DraggableCore>
        );
      })}
    </div>
  );
};

SortablisList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  classes: PropTypes.shape({}),
  onReorder: PropTypes.func,
  dragHandle: PropTypes.func
};

export default SortablisList;
