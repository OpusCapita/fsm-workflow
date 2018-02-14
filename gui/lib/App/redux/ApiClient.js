'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  var adjustedPath = path[0] !== '/' ? '/' + path : path;
  return 'http://localhost:3020' + adjustedPath;
}

var ApiClient = function () {
  function ApiClient(req) {
    var _this = this;

    _classCallCheck(this, ApiClient);

    methods.forEach(function (method) {
      return _this[method] = function (path) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            params = _ref.params,
            data = _ref.data;

        return new Promise(function (resolve, reject) {
          var request = _superagent2.default[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (data) {
            request.send(data);
          }

          request.end(function (err) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                body = _ref2.body;

            return err ? reject(body || err) : resolve(body);
          });
        });
      };
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */


  _createClass(ApiClient, [{
    key: 'empty',
    value: function empty() {}
  }]);

  return ApiClient;
}();

exports.default = ApiClient;