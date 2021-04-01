'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarLoadButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require('react-icons/fa');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

var _ = require('./assets/img/007.svg');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarLoadButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    (0, _browser.browserUpload)().then(function (data) {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t("Load project"), onClick: loadProjectFromFile },
    _react2.default.createElement('img', { src: _2.default })
  );
}

ToolbarLoadButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarLoadButton.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};