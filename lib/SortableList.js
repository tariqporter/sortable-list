"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactJss = require("react-jss");

var _reactDraggable = require("react-draggable");

var _clsx = _interopRequireDefault(require("clsx"));

var _DefaultDragHandle = _interopRequireDefault(require("./DefaultDragHandle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

_reactJss.jss.setup({
  insertionPoint: document.head.firstChild
});

var useStyles = (0, _reactJss.createUseStyles)({
  root: {
    position: 'relative'
  },
  row: {
    display: 'flex',
    width: '100%',
    transitionProperty: 'left, top, width, height, opacity'
  },
  row_dragging: {},
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

var SortablisList = function SortablisList(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children,
      _ref$classes = _ref.classes,
      classes = _ref$classes === void 0 ? {} : _ref$classes,
      _ref$onReorder = _ref.onReorder,
      onReorder = _ref$onReorder === void 0 ? function () {} : _ref$onReorder,
      _ref$dragHandle = _ref.dragHandle,
      DragHandle = _ref$dragHandle === void 0 ? _DefaultDragHandle["default"] : _ref$dragHandle,
      other = _objectWithoutProperties(_ref, ["children", "classes", "onReorder", "dragHandle"]);

  var c = useStyles();
  var rootRef = null;
  var rowRefs = {};

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      refDimensions = _useState2[0],
      setRefDimensions = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      rootTop = _useState4[0],
      setRootTop = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      dragId = _useState6[0],
      setDragId = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      transitionId = _useState8[0],
      setTransitionId = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      oldIndex = _useState10[0],
      setOldIndex = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      shadowIndex = _useState12[0],
      setShadowIndex = _useState12[1];

  var _useState13 = (0, _react.useState)({
    height: 0,
    top: 0
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      shadowStyle = _useState14[0],
      setShadowStyle = _useState14[1];

  var _useState15 = (0, _react.useState)(_react["default"].Children.map(children, function (child) {
    return child.key;
  })),
      _useState16 = _slicedToArray(_useState15, 2),
      componentIds = _useState16[0],
      setComponentIds = _useState16[1];

  var _useState17 = (0, _react.useState)(componentIds.reduce(function (acc, id, index) {
    acc[id] = {
      id: id,
      index: index,
      style: {// top
        // position
        // transition
      }
    };
    return acc;
  }, {})),
      _useState18 = _slicedToArray(_useState17, 2),
      rowData = _useState18[0],
      setRowData = _useState18[1];

  (0, _react.useEffect)(function () {
    setComponentIds(_react["default"].Children.map(children, function (child) {
      return child.key;
    }));
  }, [children]);

  var _onStart = (0, _react.useCallback)(function (event, data, id) {
    var runningTop = 0;
    var sortedRows = Object.values(rowData).sort(function (a, b) {
      return a.index - b.index;
    });
    var rd = sortedRows.reduce(function (acc, x) {
      var _rowRefs$x$id$getBoun = rowRefs[x.id].getBoundingClientRect(),
          top = _rowRefs$x$id$getBoun.top,
          bottom = _rowRefs$x$id$getBoun.bottom,
          height = _rowRefs$x$id$getBoun.height;

      acc[x.id] = {
        top: top,
        bottom: bottom,
        height: height
      };
      rowData[x.id].style.top = runningTop;
      rowData[x.id].style.position = 'absolute';
      runningTop += height;
      return acc;
    }, {});
    setRefDimensions(rd);
    requestAnimationFrame(function () {
      Object.keys(rowData).forEach(function (k) {
        if (k !== id) rowData[k].style.transition = 'all .2s ease-in';else rowData[k].style.transition = 'none';
      });
    });

    var _rowRefs$id$getBoundi = rowRefs[id].getBoundingClientRect(),
        width = _rowRefs$id$getBoundi.width,
        shadowHeight = _rowRefs$id$getBoundi.height;

    var index = sortedRows.findIndex(function (x) {
      return x.id === id;
    });
    setShadowIndex(index);
    setOldIndex(index);
    setShadowStyle(_objectSpread({}, shadowStyle, {
      width: width,
      top: rowData[id].style.top,
      height: shadowHeight
    }));

    var _rootRef$getBoundingC = rootRef.getBoundingClientRect(),
        rt1 = _rootRef$getBoundingC.top;

    setRootTop(rt1);
    setDragId(id);
    setRowData(_objectSpread({}, rowData));
  }, [rowRefs, shadowStyle, rowData]);

  var onDrag = (0, _react.useCallback)(function (event, data) {
    if (!data.deltaY) return;
    var isDraggingUp = data.deltaY < 0;
    var newTop = rowData[dragId].style.top + data.deltaY;
    var dragRowTop = newTop + rootTop;
    var dragRowBottom = dragRowTop + refDimensions[dragId].height;
    var dragRowHeight = refDimensions[dragId].height;
    rowData[dragId].style.top = newTop;
    rowData[dragId].style.zIndex = 1;
    var sortedRows = Object.values(rowData).sort(function (a, b) {
      return a.index - b.index;
    });
    var refKeys = sortedRows.map(function (x) {
      return x.id;
    }).filter(function (k) {
      return k !== dragId;
    });
    var newShadow = {
      index: null,
      top: null
    };

    if (refKeys.length) {
      var _refDimensions$refKey = refDimensions[refKeys[0]],
          firsrRowTop = _refDimensions$refKey.top,
          firstRowBottom = _refDimensions$refKey.bottom,
          firstRowHeight = _refDimensions$refKey.height;
      var _refDimensions$refKey2 = refDimensions[refKeys[refKeys.length - 1]],
          lastRowTop = _refDimensions$refKey2.top,
          lastRowBottom = _refDimensions$refKey2.bottom,
          lastRowHeight = _refDimensions$refKey2.height;
      var firstHeightComparison = dragRowHeight > firstRowHeight ? firstRowHeight : dragRowHeight;
      var lastHeightComparison = dragRowHeight > lastRowHeight ? lastRowHeight : dragRowHeight;

      if (isDraggingUp && dragRowBottom < firstRowBottom - firstHeightComparison / 2) {
        newShadow.index = 0;
        newShadow.top = firsrRowTop - rootTop;
      } else if (!isDraggingUp && dragRowTop >= lastRowBottom - lastHeightComparison / 2) {
        newShadow.index = Object.keys(rowRefs).length - 1;
        newShadow.top = lastRowTop - rootTop;
      }
    }

    for (var i = 0; i < refKeys.length; i += 1) {
      var refId = refKeys[i];
      var _refDimensions$refId = refDimensions[refId],
          rowTop = _refDimensions$refId.top,
          rowBottom = _refDimensions$refId.bottom,
          rowHeight = _refDimensions$refId.height;
      var heightComparison = dragRowHeight > rowHeight ? rowHeight : dragRowHeight;

      if ( // dragging down
      !isDraggingUp && dragRowBottom < rowBottom && dragRowBottom >= rowBottom - heightComparison / 2) {
        newShadow.index = rowData[refId].index;
        newShadow.top = rowBottom - rootTop - dragRowHeight;
        break;
      } else if ( // dragging up
      isDraggingUp && dragRowTop >= rowTop && dragRowTop < rowTop + heightComparison / 2) {
        newShadow.index = rowData[refId].index;
        newShadow.top = rowTop - rootTop;
        break;
      }
    }

    if (newShadow.index === null) {
      newShadow.index = rowData[dragId].index;
      var newShadow1 = Object.values(rowData).find(function (x) {
        return x.index === newShadow.index;
      });
      newShadow.top = newShadow1.top;
    }

    if (newShadow.index === shadowIndex) return;

    var newRefDimensions = _objectSpread({}, refDimensions);

    var rows = Object.values(rowData).filter(function (x) {
      return x.id !== dragId;
    });
    var nextIndex = 0;
    var runningTop = 0;
    var ordered = rows.sort(function (a, b) {
      return a.index - b.index;
    });

    while (ordered.length) {
      var nextId = ordered[0].id;
      ordered = ordered.slice(1);
      var nextHeight = refDimensions[nextId].height;

      if (nextIndex === newShadow.index) {
        nextIndex += 1;
        runningTop += refDimensions[dragId].height;
      }

      var topDifference = runningTop - rowData[nextId].style.top;
      rowData[nextId] = _objectSpread({}, rowData[nextId], {
        index: nextIndex,
        style: _objectSpread({}, rowData[nextId].style, {
          top: runningTop
        })
      });
      var crd = newRefDimensions[nextId];
      newRefDimensions[nextId] = _objectSpread({}, crd, {
        top: crd.top + topDifference,
        bottom: crd.bottom + topDifference
      });
      runningTop += nextHeight;
      nextIndex += 1;
    }

    rowData[dragId] = _objectSpread({}, rowData[dragId], {
      index: newShadow.index
    });
    setRefDimensions(newRefDimensions);
    setShadowIndex(newShadow.index);
    setShadowStyle(_objectSpread({}, shadowStyle, {
      top: newShadow.top
    }));
    setRowData(_objectSpread({}, rowData));
  }, [dragId, rowData, shadowStyle, rootRef, rowRefs, shadowIndex, refDimensions]);
  var onStop = (0, _react.useCallback)(function () {
    var newRowData = _objectSpread({}, rowData);

    newRowData[dragId] = _objectSpread({}, newRowData[dragId], {
      style: _objectSpread({}, newRowData[dragId].style, {
        top: shadowStyle.top,
        transition: 'all .2s ease-in'
      })
    });
    delete newRowData[dragId].style.zIndex;
    setTransitionId(dragId);
    setRowData(newRowData);
    setDragId(null);
    setShadowIndex(null);
    setShadowStyle(_objectSpread({}, shadowStyle, {
      height: 0
    }));
  }, [dragId, rowData, shadowStyle]);

  var _onTransitionEnd = (0, _react.useCallback)(function (e) {
    var newIndex = rowData[transitionId].index;

    var newRowData = _objectSpread({}, rowData);

    Object.keys(newRowData).forEach(function (k) {
      var _rowData$k$style = rowData[k].style,
          transition = _rowData$k$style.transition,
          position = _rowData$k$style.position,
          top = _rowData$k$style.top,
          style = _objectWithoutProperties(_rowData$k$style, ["transition", "position", "top"]);

      rowData[k].style = style;
    });
    onReorder(e.nativeEvent, {
      oldIndex: oldIndex,
      newIndex: newIndex
    });
    setRowData(newRowData);
    setTransitionId(null);
    setOldIndex(null);
  }, [oldIndex, onReorder, rowData, transitionId]);

  return (// eslint-disable-next-line no-return-assign
    _react["default"].createElement("div", _extends({
      className: (0, _clsx["default"])(c.root, classes.root),
      ref: function ref(_ref4) {
        return rootRef = _ref4;
      }
    }, other), _react["default"].createElement("div", {
      className: (0, _clsx["default"])(c.shadow, classes.shadow),
      style: shadowStyle
    }), _react["default"].Children.map(children, function (child) {
      var id = child.key; // eslint-disable-next-line react/prop-types

      var dragHandle = function dragHandle(_ref2) {
        var className = _ref2.className,
            props = _objectWithoutProperties(_ref2, ["className"]);

        return _react["default"].createElement(DragHandle, _extends({
          isDragging: id === dragId,
          className: (0, _clsx["default"])(className, c._draggableHandle, c.handle, id === dragId && c.handle_dragging, classes.handle)
        }, props));
      };

      var clone = _react["default"].cloneElement(child, {
        DragHandle: dragHandle
      });

      return _react["default"].createElement(_reactDraggable.DraggableCore, {
        handle: ".".concat(c._draggableHandle),
        onStart: function onStart(event, data) {
          return _onStart(event, data, id);
        },
        onDrag: onDrag,
        onStop: onStop
      }, _react["default"].createElement("div", {
        className: (0, _clsx["default"])(c.row, classes.row, id === dragId && c.row_dragging, dragId !== null && id !== dragId && c.row_notDragging),
        style: rowData[id].style // eslint-disable-next-line no-return-assign
        ,
        ref: function ref(_ref3) {
          return rowRefs[id] = _ref3;
        },
        onTransitionEnd: function onTransitionEnd(e) {
          return id === transitionId && _onTransitionEnd(e);
        }
      }, _react["default"].createElement("div", {
        className: (0, _clsx["default"])(c.contentContainer, classes.contentContainer)
      }, clone)));
    }))
  );
};

SortablisList.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  classes: _propTypes["default"].shape({}),
  onReorder: _propTypes["default"].func,
  dragHandle: _propTypes["default"].func
};
var _default = SortablisList;
exports["default"] = _default;