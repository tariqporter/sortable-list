"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactJss = require("react-jss");

var _clsx = _interopRequireDefault(require("clsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _reactJss.createUseStyles)({
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

var DefaultDragHandle = function DefaultDragHandle(_ref) {
  var isDragging = _ref.isDragging,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["isDragging", "className"]);

  var c = useStyles();
  return _react["default"].createElement("button", _extends({
    type: "button",
    className: (0, _clsx["default"])(c.root, isDragging && c.root_dragging, className)
  }, props));
};

DefaultDragHandle.propTypes = {
  isDragging: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string.isRequired
};
var _default = DefaultDragHandle;
exports["default"] = _default;