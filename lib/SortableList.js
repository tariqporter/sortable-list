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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

_reactJss.jss.setup({
  insertionPoint: document.head.firstChild
});

var useStyles = (0, _reactJss.createUseStyles)({
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
  },
  contentContainer: {
    flex: '1 1 auto'
  }
});

var DefaultDragHandle = function DefaultDragHandle(_ref) {
  var isDragging = _ref.isDragging,
      classes = _ref.classes,
      props = _objectWithoutProperties(_ref, ["isDragging", "classes"]);

  return _react["default"].createElement("button", _extends({
    type: "button"
  }, props));
};

DefaultDragHandle.propTypes = {
  isDragging: _propTypes["default"].bool.isRequired,
  classes: _propTypes["default"].string.isRequired
};

var SortablisList = function SortablisList(_ref2) {
  var _ref2$children = _ref2.children,
      children = _ref2$children === void 0 ? [] : _ref2$children,
      _ref2$classes = _ref2.classes,
      classes = _ref2$classes === void 0 ? '' : _ref2$classes,
      rowHeight = _ref2.rowHeight,
      _ref2$onReorder = _ref2.onReorder,
      onReorder = _ref2$onReorder === void 0 ? function () {} : _ref2$onReorder,
      _ref2$dragHandle = _ref2.dragHandle,
      DragHandle = _ref2$dragHandle === void 0 ? DefaultDragHandle : _ref2$dragHandle;
  var c = useStyles(); // assume all items are same width

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      containerRef = _useState2[0],
      setContainerRef = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      dragId = _useState4[0],
      setDragId = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      transitionId = _useState6[0],
      setTransitionId = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      oldIndex = _useState8[0],
      setOldIndex = _useState8[1];

  var _useState9 = (0, _react.useState)({
    height: rowHeight,
    top: 0
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      shadowStyle = _useState10[0],
      setShadowStyle = _useState10[1];

  var _useState11 = (0, _react.useState)(_react["default"].Children.map(children, function (child) {
    return child.key;
  })),
      _useState12 = _slicedToArray(_useState11, 1),
      componentIds = _useState12[0];

  var _useState13 = (0, _react.useState)(componentIds.reduce(function (acc, id, index) {
    acc[id] = {
      id: id,
      index: index,
      dropIndex: index,
      top: index * rowHeight,
      dropTop: index * rowHeight
    };
    return acc;
  }, {})),
      _useState14 = _slicedToArray(_useState13, 2),
      rowData = _useState14[0],
      setRowData = _useState14[1];

  var updateRow = (0, _react.useCallback)(function (id, row) {
    setRowData(_objectSpread({}, rowData, _defineProperty({}, id, row)));
  }, [rowData]);

  var _onStart = (0, _react.useCallback)(function (event, data, id) {
    var row = _objectSpread({}, rowData[id]);

    var index = Object.keys(rowData).findIndex(function (k) {
      return k === id;
    });
    row.dropIndex = index;
    setDragId(id);
    updateRow(id, row);

    var _containerRef$getBoun = containerRef.getBoundingClientRect(),
        width = _containerRef$getBoun.width;

    setShadowStyle(_objectSpread({}, shadowStyle, {
      width: width,
      top: index * rowHeight,
      height: rowHeight
    }));
  }, [containerRef, rowData, rowHeight, shadowStyle, updateRow]);

  var onDrag = (0, _react.useCallback)(function (event, data) {
    var row = rowData[dragId];
    var top = row.top + data.deltaY;
    var newIndex = Math.round(top / rowHeight);

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > componentIds.length - 1) {
      newIndex = componentIds.length - 1;
    }

    rowData[dragId].top = top;
    rowData[dragId].zIndex = 1;

    if (newIndex !== row.dropIndex) {
      (function () {
        rowData[dragId].dropIndex = newIndex;
        var nextIndex = 0;
        var remainingRows = Object.values(rowData).filter(function (x) {
          return x.id !== row.id;
        });
        var changedIds = [];

        while (nextIndex < remainingRows.length) {
          var ordered = remainingRows.filter(function (x) {
            return !changedIds.includes(x.id);
          }).sort(function (a, b) {
            return a.index - b.index;
          });
          if (!ordered.length) break;
          var lowestId = ordered[0].id;
          if (nextIndex === newIndex) nextIndex += 1;
          rowData[lowestId] = _objectSpread({}, rowData[lowestId], {
            index: nextIndex,
            top: nextIndex * rowHeight
          });
          changedIds.push(lowestId);
          nextIndex += 1;
        }

        setShadowStyle(_objectSpread({}, shadowStyle, {
          top: newIndex * rowHeight
        }));
        setRowData(_objectSpread({}, rowData));
      })();
    }
  }, [componentIds.length, dragId, rowData, rowHeight, shadowStyle]);
  var onStop = (0, _react.useCallback)(function () {
    var row = _objectSpread({}, rowData[dragId]);

    setOldIndex(row.index);
    row.index = row.dropIndex;
    row.top = row.index * rowHeight;
    delete row.zIndex;
    updateRow(dragId, row);
    setTransitionId(dragId);
    setDragId(null);
    setShadowStyle(_objectSpread({}, shadowStyle, {
      height: 0
    }));
  }, [dragId, rowData, rowHeight, updateRow]);

  var _onTransitionEnd = (0, _react.useCallback)(function (e) {
    onReorder(e.nativeEvent, {
      oldIndex: oldIndex,
      newIndex: rowData[transitionId].index
    });
    setTransitionId(null);
    setOldIndex(null);
  }, [oldIndex, onReorder, rowData, transitionId]);

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: (0, _clsx["default"])(c.shadow, classes.shadow),
    style: shadowStyle
  }), _react["default"].Children.map(children, function (child) {
    var id = child.key;
    return _react["default"].createElement(_reactDraggable.DraggableCore, {
      handle: ".draggable_handle",
      onStart: function onStart(event, data) {
        return _onStart(event, data, id);
      },
      onDrag: onDrag,
      onStop: onStop
    }, _react["default"].createElement("div", {
      className: (0, _clsx["default"])(c.root, classes.root, id === dragId && c.root_dragging, dragId !== null && id !== dragId && c.root_notDragging),
      style: rowData[id],
      ref: setContainerRef,
      onTransitionEnd: function onTransitionEnd(e) {
        return id === transitionId && _onTransitionEnd(e);
      }
    }, _react["default"].createElement("div", {
      className: c.contentContainer
    }, child), _react["default"].createElement(DragHandle, {
      classes: (0, _clsx["default"])('draggable_handle', classes.handle),
      isDragging: id === dragId,
      className: (0, _clsx["default"])('draggable_handle', (0, _clsx["default"])(c.handle, classes.handle, id === dragId && c.handle_dragging))
    })));
  }));
};

SortablisList.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  classes: _propTypes["default"].shape({}),
  rowHeight: _propTypes["default"].number.isRequired,
  onReorder: _propTypes["default"].func,
  dragHandle: _propTypes["default"].func
};
var _default = SortablisList;
exports["default"] = _default;