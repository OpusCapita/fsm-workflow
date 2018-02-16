(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/FormControl"), require("lodash/isEqual"), require("react-bootstrap/lib/Modal"), require("react-bootstrap/lib/FormGroup"), require("react-bootstrap/lib/Table"), require("lodash/find"), require("react-bootstrap/lib/ControlLabel"), require("react-bootstrap/lib/Glyphicon"), require("react-bootstrap/lib/Col"), require("react-bootstrap/lib/ButtonGroup"), require("react-bootstrap/lib/Row"), require("react-bootstrap/lib/Checkbox"), require("react-bootstrap/lib/Tabs"), require("react-bootstrap/lib/Tab"), require("lodash/startCase"), require("react-bootstrap/lib/Grid"), require("react-bootstrap/lib/Form"), require("react-dom"), require("react-bootstrap/lib/Label"), require("react-bootstrap/lib/Radio"), require("react-bootstrap/lib/HelpBlock"), require("kvolkovich-sc-react-codemirror"), require("codemirror/lib/codemirror.css"), require("codemirror/theme/eclipse.css"), require("codemirror/mode/javascript/javascript"), require("codemirror"), require("core-js/fn/array/from"), require("core-js/es6/symbol"), require("react-inspector"), require("@opuscapita/react-dates"), require("@opuscapita/react-select"), require("lodash/get"), require("lodash/pick"), require("viz.js"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "react-bootstrap/lib/Button", "react-bootstrap/lib/FormControl", "lodash/isEqual", "react-bootstrap/lib/Modal", "react-bootstrap/lib/FormGroup", "react-bootstrap/lib/Table", "lodash/find", "react-bootstrap/lib/ControlLabel", "react-bootstrap/lib/Glyphicon", "react-bootstrap/lib/Col", "react-bootstrap/lib/ButtonGroup", "react-bootstrap/lib/Row", "react-bootstrap/lib/Checkbox", "react-bootstrap/lib/Tabs", "react-bootstrap/lib/Tab", "lodash/startCase", "react-bootstrap/lib/Grid", "react-bootstrap/lib/Form", "react-dom", "react-bootstrap/lib/Label", "react-bootstrap/lib/Radio", "react-bootstrap/lib/HelpBlock", "kvolkovich-sc-react-codemirror", "codemirror/lib/codemirror.css", "codemirror/theme/eclipse.css", "codemirror/mode/javascript/javascript", "codemirror", "core-js/fn/array/from", "core-js/es6/symbol", "react-inspector", "@opuscapita/react-dates", "@opuscapita/react-select", "lodash/get", "lodash/pick", "viz.js"], factory);
	else if(typeof exports === 'object')
		exports["fsm-workflow-editor"] = factory(require("prop-types"), require("react"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/FormControl"), require("lodash/isEqual"), require("react-bootstrap/lib/Modal"), require("react-bootstrap/lib/FormGroup"), require("react-bootstrap/lib/Table"), require("lodash/find"), require("react-bootstrap/lib/ControlLabel"), require("react-bootstrap/lib/Glyphicon"), require("react-bootstrap/lib/Col"), require("react-bootstrap/lib/ButtonGroup"), require("react-bootstrap/lib/Row"), require("react-bootstrap/lib/Checkbox"), require("react-bootstrap/lib/Tabs"), require("react-bootstrap/lib/Tab"), require("lodash/startCase"), require("react-bootstrap/lib/Grid"), require("react-bootstrap/lib/Form"), require("react-dom"), require("react-bootstrap/lib/Label"), require("react-bootstrap/lib/Radio"), require("react-bootstrap/lib/HelpBlock"), require("kvolkovich-sc-react-codemirror"), require("codemirror/lib/codemirror.css"), require("codemirror/theme/eclipse.css"), require("codemirror/mode/javascript/javascript"), require("codemirror"), require("core-js/fn/array/from"), require("core-js/es6/symbol"), require("react-inspector"), require("@opuscapita/react-dates"), require("@opuscapita/react-select"), require("lodash/get"), require("lodash/pick"), require("viz.js"));
	else
		root["fsm-workflow-editor"] = factory(root["prop-types"], root["react"], root["react-bootstrap/lib/Button"], root["react-bootstrap/lib/FormControl"], root["lodash/isEqual"], root["react-bootstrap/lib/Modal"], root["react-bootstrap/lib/FormGroup"], root["react-bootstrap/lib/Table"], root["lodash/find"], root["react-bootstrap/lib/ControlLabel"], root["react-bootstrap/lib/Glyphicon"], root["react-bootstrap/lib/Col"], root["react-bootstrap/lib/ButtonGroup"], root["react-bootstrap/lib/Row"], root["react-bootstrap/lib/Checkbox"], root["react-bootstrap/lib/Tabs"], root["react-bootstrap/lib/Tab"], root["lodash/startCase"], root["react-bootstrap/lib/Grid"], root["react-bootstrap/lib/Form"], root["react-dom"], root["react-bootstrap/lib/Label"], root["react-bootstrap/lib/Radio"], root["react-bootstrap/lib/HelpBlock"], root["kvolkovich-sc-react-codemirror"], root["codemirror/lib/codemirror.css"], root["codemirror/theme/eclipse.css"], root["codemirror/mode/javascript/javascript"], root["codemirror"], root["core-js/fn/array/from"], root["core-js/es6/symbol"], root["react-inspector"], root["@opuscapita/react-dates"], root["@opuscapita/react-select"], root["lodash/get"], root["lodash/pick"], root["viz.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_34__, __WEBPACK_EXTERNAL_MODULE_36__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_41__, __WEBPACK_EXTERNAL_MODULE_43__, __WEBPACK_EXTERNAL_MODULE_49__, __WEBPACK_EXTERNAL_MODULE_52__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__, __WEBPACK_EXTERNAL_MODULE_55__, __WEBPACK_EXTERNAL_MODULE_57__, __WEBPACK_EXTERNAL_MODULE_59__, __WEBPACK_EXTERNAL_MODULE_60__, __WEBPACK_EXTERNAL_MODULE_61__, __WEBPACK_EXTERNAL_MODULE_69__, __WEBPACK_EXTERNAL_MODULE_78__, __WEBPACK_EXTERNAL_MODULE_86__, __WEBPACK_EXTERNAL_MODULE_90__, __WEBPACK_EXTERNAL_MODULE_94__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatArg = exports.formatLabel = exports.isDef = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _startCase = __webpack_require__(25);

var _startCase2 = _interopRequireDefault(_startCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDef = exports.isDef = function isDef(v) {
  return v !== undefined && v !== null;
};

var formatLabel = exports.formatLabel = function formatLabel(str) {
  return (0, _startCase2.default)(str);
};

var formatArg = exports.formatArg = function formatArg(_ref) {
  var i18n = _ref.i18n,
      _ref$schema = _ref.schema,
      schema = _ref$schema === undefined ? {} : _ref$schema,
      value = _ref.value;
  var type = schema.type,
      format = schema.format;

  var componentType = type === 'string' && format === 'date' ? 'date' : type;

  switch (componentType) {
    case 'number':
      return i18n.formatDecimalNumber(value);
    case 'integer':
      return i18n.formatNumber(value);
    case 'boolean':
      return isDef(value) ? String(value) : value;
    case 'date':
      return isDef(value) ? i18n.formatDate(value) : value;
    case 'array':
      return _react2.default.createElement(
        'ul',
        { style: { paddingLeft: '20px' } },
        value.map(function (v, i) {
          return _react2.default.createElement(
            'li',
            { key: i },
            formatArg({ i18n: i18n, schema: schema.items, value: v })
          );
        })
      );
    default:
      return value;
  }
};

formatArg.propTypes = {
  i18n: _propTypes2.default.object.isRequired,
  schema: _propTypes2.default.object,
  value: _propTypes2.default.any
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Button");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/FormControl");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfirmDialog = __webpack_require__(39);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ConfirmDialog2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Modal");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(72);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/FormGroup");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Table");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("lodash/find");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/ControlLabel");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Glyphicon");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Col");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/ButtonGroup");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  name: _propTypes2.default.string,
  description: _propTypes2.default.string,
  isInitial: _propTypes2.default.bool,
  isFinal: _propTypes2.default.bool
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ErrorLabel;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Label = __webpack_require__(41);

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorLabel(_ref) {
  var error = _ref.error;

  return _react2.default.createElement(
    _Label2.default,
    {
      bsStyle: 'danger',
      style: _extends({
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: '8px',
        display: 'inline-block'
      }, !error && { opacity: 0 })
    },
    error ? error : '\xA0'
  );
}

ErrorLabel.propTypes = {
  error: _propTypes2.default.string
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.oneOfType([_propTypes2.default.shape({
  expression: _propTypes2.default.string.isRequired
}), _propTypes2.default.shape({
  name: _propTypes2.default.string.isRequired,
  params: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.any
  }))
})]);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Row");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Checkbox");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  name: _propTypes2.default.string.isRequired,
  params: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.any
  }))
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Tabs");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Tab");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("lodash/startCase");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SWAP_STATE_IN_TRANSITIONS = exports.DELETE_STATE_TRANSITIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _find = __webpack_require__(12);

var _find2 = _interopRequireDefault(_find);

var _Table = __webpack_require__(11);

var _Table2 = _interopRequireDefault(_Table);

var _ButtonGroup = __webpack_require__(16);

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Glyphicon = __webpack_require__(14);

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _statePropTypes = __webpack_require__(17);

var _statePropTypes2 = _interopRequireDefault(_statePropTypes);

var _StatesEditor = __webpack_require__(38);

var _StatesEditor2 = _interopRequireDefault(_StatesEditor);

var _utils = __webpack_require__(2);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _DeleteStateDialogBody = __webpack_require__(42);

var _DeleteStateDialogBody2 = _interopRequireDefault(_DeleteStateDialogBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DELETE_STATE_TRANSITIONS = exports.DELETE_STATE_TRANSITIONS = 'deleteStateTransitions';
var SWAP_STATE_IN_TRANSITIONS = exports.SWAP_STATE_IN_TRANSITIONS = 'swapStateInTransitions';

var StatesTable = (0, _ConfirmDialog2.default)(_class = (_temp = _class2 = function (_PureComponent) {
  _inherits(StatesTable, _PureComponent);

  function StatesTable() {
    var _ref;

    _classCallCheck(this, StatesTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = StatesTable.__proto__ || Object.getPrototypeOf(StatesTable)).call.apply(_ref, [this].concat(args)));

    _initialiseProps.call(_this);

    _this.state = {
      states: _this.statesFromProps(_this.props),
      currentState: null,
      showModal: false
    };
    return _this;
  }

  _createClass(StatesTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          states = _state.states,
          currentState = _state.currentState,
          showModal = _state.showModal;


      var modal = void 0;

      if (showModal) {
        var state = void 0;

        if ((0, _utils.isDef)(currentState)) {
          state = (0, _find2.default)(states, function (_ref2) {
            var name = _ref2.name;
            return name === currentState;
          });
        }

        modal = _react2.default.createElement(_StatesEditor2.default, {
          state: state,
          existingStates: states.map(function (_ref3) {
            var name = _ref3.name;
            return name;
          }),
          onClose: this.handleClose,
          onSave: this.handleSave
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'oc-fsm-crud-editor--states-editor' },
        _react2.default.createElement(
          _Table2.default,
          { className: 'oc-fsm-crud-editor--table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Name'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Description'
              ),
              _react2.default.createElement(
                'th',
                { style: { width: '60px' }, className: 'text-center' },
                'Initial'
              ),
              _react2.default.createElement(
                'th',
                { style: { width: '60px' }, className: 'text-center' },
                'Final'
              ),
              _react2.default.createElement(
                'th',
                { className: 'text-right' },
                _react2.default.createElement(
                  _Button2.default,
                  {
                    bsSize: 'sm',
                    onClick: this.handleAdd
                  },
                  'Add'
                )
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            states.map(function (_ref4) {
              var name = _ref4.name,
                  description = _ref4.description,
                  isInitial = _ref4.isInitial,
                  isFinal = _ref4.isFinal;
              return _react2.default.createElement(
                'tr',
                { key: name },
                _react2.default.createElement(
                  'td',
                  null,
                  name
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  description
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'text-center' },
                  isInitial && _react2.default.createElement('i', { className: 'fa fa-check' })
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'text-center' },
                  isFinal && _react2.default.createElement('i', { className: 'fa fa-check' })
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'text-right' },
                  _react2.default.createElement(
                    _ButtonGroup2.default,
                    { bsStyle: 'sm' },
                    _react2.default.createElement(
                      _Button2.default,
                      {
                        onClick: _this2.handleEdit(name)
                      },
                      _react2.default.createElement(_Glyphicon2.default, { glyph: 'edit' }),
                      '\u2000',
                      'Edit'
                    ),
                    _react2.default.createElement(
                      _Button2.default,
                      {
                        onClick: _this2.handleDelete(name)
                      },
                      _react2.default.createElement(_Glyphicon2.default, { glyph: 'trash' }),
                      '\u2000',
                      'Delete'
                    )
                  )
                )
              );
            })
          )
        ),
        modal
      );
    }
  }]);

  return StatesTable;
}(_react.PureComponent), _class2.propTypes = {
  states: _propTypes2.default.arrayOf(_statePropTypes2.default),
  initialState: _propTypes2.default.string.isRequired,
  finalStates: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  onDelete: _propTypes2.default.func.isRequired,
  onEdit: _propTypes2.default.func.isRequired,
  statesInTransitions: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentWillReceiveProps = function (props) {
    return _this3.setState({ states: _this3.statesFromProps(props) });
  };

  this.statesFromProps = function (_ref5) {
    var states = _ref5.states,
        initialState = _ref5.initialState,
        finalStates = _ref5.finalStates;
    return states.map(function (state) {
      return _extends({}, state, {
        isInitial: state.name === initialState,
        isFinal: finalStates.indexOf(state.name) > -1
      });
    });
  };

  this._deleteStateSideEffect = {
    name: DELETE_STATE_TRANSITIONS
  };

  this.handleDelete = function (name) {
    var statesInTransitions = _this3.props.statesInTransitions;
    var states = _this3.state.states;


    return _this3._triggerDialog(_extends({
      confirmHandler: function confirmHandler(_) {
        return _this3.props.onDelete(_extends({
          name: name
        }, statesInTransitions.indexOf(name) > -1 && { sideEffect: _this3._deleteStateSideEffect }));
      }
    }, statesInTransitions.indexOf(name) > -1 ? {
      BodyComponent: function BodyComponent(_) {
        return _react2.default.createElement(_DeleteStateDialogBody2.default, {
          states: states,
          stateName: name,
          onSelect: function onSelect(_ref6) {
            var index = _ref6.index,
                alternative = _ref6.alternative;

            _this3._deleteStateSideEffect = {
              name: index === 0 ? DELETE_STATE_TRANSITIONS : SWAP_STATE_IN_TRANSITIONS,
              alternative: alternative
            };
          }
        });
      }
    } : {
      message: 'Do you really want to delete this state?'
    }));
  };

  this.handleEdit = function (name) {
    return function (_) {
      return _this3.setState({
        currentState: name,
        showModal: true
      });
    };
  };

  this.handleAdd = this.handleEdit();

  this.handleClose = function (_) {
    return _this3.setState({
      currentState: null,
      showModal: false
    });
  };

  this.handleSave = function () {
    var _props;

    _this3.handleClose();
    (_props = _this3.props).onEdit.apply(_props, arguments);
  };
}, _temp)) || _class;

exports.default = StatesTable;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ParamsEditor = __webpack_require__(62);

var _ParamsEditor2 = _interopRequireDefault(_ParamsEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ParamsEditor2.default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _StringInput = __webpack_require__(63);

var _StringInput2 = _interopRequireDefault(_StringInput);

var _BooleanInput = __webpack_require__(64);

var _BooleanInput2 = _interopRequireDefault(_BooleanInput);

var _IntegerInput = __webpack_require__(65);

var _IntegerInput2 = _interopRequireDefault(_IntegerInput);

var _DecimalInput = __webpack_require__(66);

var _DecimalInput2 = _interopRequireDefault(_DecimalInput);

var _EnumInput = __webpack_require__(67);

var _EnumInput2 = _interopRequireDefault(_EnumInput);

var _DateInput = __webpack_require__(68);

var _DateInput2 = _interopRequireDefault(_DateInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  string: _StringInput2.default,
  boolean: _BooleanInput2.default,
  integer: _IntegerInput2.default,
  number: _DecimalInput2.default
};

exports.default = function () {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = schema.type;


  var Component = components[type] || components.string;

  if (schema.enum) {
    Component = function Component(props) {
      return _react2.default.createElement(_EnumInput2.default, _extends({}, props, {
        options: schema.enum,
        type: type
      }));
    };
  }

  if (type === 'string' && schema.format === 'date') {
    Component = _DateInput2.default;
  }

  return Component;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParamSchema = exports.invokeAction = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = __webpack_require__(86);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var evaluateArgs = function evaluateArgs(actionArgs, commonArgs) {
  return _extends({}, actionArgs.reduce(function (customArgsObject, _ref) {
    var name = _ref.name,
        type = _ref.type,
        value = _ref.value;
    return _extends({}, customArgsObject, _defineProperty({}, name, type === 'pathExpression' ? // not implemented in editor yet
    (0, _get2.default)(commonArgs[value.variable], value.path) : value));
  }, {}), commonArgs);
};

var invokeAction = exports.invokeAction = function invokeAction(name, actionArgs, commonArgs) {
  return 'Action "' + name + '" called with parameters:\n' + JSON.stringify(evaluateArgs(actionArgs, commonArgs), null, 2);
};

var getParamSchema = exports.getParamSchema = function getParamSchema(_ref2) {
  var actions = _ref2.actions,
      action = _ref2.action,
      param = _ref2.param;
  return ((actions[action].paramsSchema || {}).properties || {})[param];
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(32);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WorkflowEditor = __webpack_require__(33);

var _WorkflowEditor2 = _interopRequireDefault(_WorkflowEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _WorkflowEditor2.default;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;
// import Ajv from 'ajv'; // removed from package.json

// TODO maybe move the following flags somewhere or get rid of them completely


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = __webpack_require__(34);

var _Grid2 = _interopRequireDefault(_Grid);

var _Row = __webpack_require__(20);

var _Row2 = _interopRequireDefault(_Row);

var _Col = __webpack_require__(15);

var _Col2 = _interopRequireDefault(_Col);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Tabs = __webpack_require__(23);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = __webpack_require__(24);

var _Tab2 = _interopRequireDefault(_Tab);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _find = __webpack_require__(12);

var _find2 = _interopRequireDefault(_find);

var _startCase = __webpack_require__(25);

var _startCase2 = _interopRequireDefault(_startCase);

var _TopForm = __webpack_require__(35);

var _TopForm2 = _interopRequireDefault(_TopForm);

var _StatesTable = __webpack_require__(37);

var _StatesTable2 = _interopRequireDefault(_StatesTable);

var _TransitionsTable = __webpack_require__(44);

var _TransitionsTable2 = _interopRequireDefault(_TransitionsTable);

var _EditorOutput = __webpack_require__(91);

var _EditorOutput2 = _interopRequireDefault(_EditorOutput);

var _utils = __webpack_require__(2);

__webpack_require__(97);

var _statePropTypes = __webpack_require__(17);

var _statePropTypes2 = _interopRequireDefault(_statePropTypes);

var _guardPropTypes = __webpack_require__(19);

var _guardPropTypes2 = _interopRequireDefault(_guardPropTypes);

var _actionPropTypes = __webpack_require__(22);

var _actionPropTypes2 = _interopRequireDefault(_actionPropTypes);

var _StatesTable3 = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkflowEditor = (_temp = _class = function (_PureComponent) {
  _inherits(WorkflowEditor, _PureComponent);

  function WorkflowEditor() {
    var _ref;

    _classCallCheck(this, WorkflowEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = WorkflowEditor.__proto__ || Object.getPrototypeOf(WorkflowEditor)).call.apply(_ref, [this].concat(args)));

    _this.stateFromProps = function (props) {
      var schema = (props.workflow || {}).schema || {};
      return { schema: schema };
    };

    _this.setNewState = function (setFunc) {
      return _this.setState(setFunc);
    };

    _this.handleNameChange = function (_ref2) {
      var name = _ref2.target.value;
      return _this.setNewState(function (prevState) {
        return {
          schema: _extends({}, prevState.schema, {
            name: name
          })
        };
      });
    };

    _this.handleInitialStateChange = function (initialState) {
      return _this.setNewState(function (prevState) {
        return {
          schema: _extends({}, prevState.schema, {
            initialState: initialState
          })
        };
      });
    };

    _this.handleFinalStatesChange = function (finalStates) {
      return _this.setNewState(function (prevState) {
        return {
          schema: _extends({}, prevState.schema, {
            finalStates: finalStates
          })
        };
      });
    };

    _this.handleEditTransition = function (_ref3) {
      var index = _ref3.index,
          rest = _objectWithoutProperties(_ref3, ['index']);

      return _this.setNewState(function (prevState) {
        return {
          schema: _extends({}, prevState.schema, {
            transitions: [].concat(_toConsumableArray((0, _utils.isDef)(index) ? prevState.schema.transitions.map(function (t, i) {
              return i === index ? _extends({}, t, rest) : t;
            }) : prevState.schema.transitions.concat(_extends({}, rest))))
          })
        };
      });
    };

    _this.handleDeleteTransition = function (index) {
      var transitions = _this.state.schema.transitions;


      _this.setNewState(function (prevState) {
        return {
          schema: _extends({}, prevState.schema, {
            transitions: [].concat(_toConsumableArray(transitions.slice(0, index)), _toConsumableArray(transitions.slice(index + 1)))
          })
        };
      });
    };

    _this.handleSaveTransitionGuards = function (index) {
      return function (guards) {
        return _this.handleEditTransition({ index: index, guards: guards });
      };
    };

    _this.handleSaveTransitionActions = function (index) {
      return function (actions) {
        return _this.handleEditTransition({ index: index, actions: actions });
      };
    };

    _this.createJsonOutput = function (_) {
      var schema = _this.state.schema;


      var transitions = schema.transitions.map(function (_ref4) {
        var guards = _ref4.guards,
            actions = _ref4.actions,
            rest = _objectWithoutProperties(_ref4, ['guards', 'actions']);

        return _extends({}, rest, guards && guards.length > 0 && { guards: guards }, actions && actions.length > 0 && { actions: actions });
      });

      return {
        schema: _extends({}, schema, {
          transitions: transitions
        })
      };
    };

    _this.handleSave = function (_) {
      return _this.props.onSave(_this.createJsonOutput());
    };

    _this.handleDeleteState = function (_ref5) {
      var stateName = _ref5.name,
          _ref5$sideEffect = _ref5.sideEffect,
          sideEffect = _ref5$sideEffect === undefined ? {} : _ref5$sideEffect;
      var sideEffectName = sideEffect.name,
          alternative = sideEffect.alternative;


      return _this.setNewState(function (prevState) {
        return {
          schema: _extends({}, prevState.schema, {
            states: prevState.schema.states.filter(function (_ref6) {
              var name = _ref6.name;
              return name !== stateName;
            })
          }, sideEffectName && {
            transitions: sideEffectName === _StatesTable3.DELETE_STATE_TRANSITIONS ? prevState.schema.transitions.filter(function (_ref7) {
              var from = _ref7.from,
                  to = _ref7.to;
              return !(from === stateName || to === stateName);
            }) : sideEffectName === _StatesTable3.SWAP_STATE_IN_TRANSITIONS ? prevState.schema.transitions.map(function (_ref8) {
              var from = _ref8.from,
                  to = _ref8.to,
                  rest = _objectWithoutProperties(_ref8, ['from', 'to']);

              return _extends({}, rest, {
                from: from === stateName ? alternative : from,
                to: to === stateName ? alternative : to
              });
            }) : prevState.schema.transitions
          }, {
            initialState: prevState.schema.initialState === stateName ? '' : prevState.schema.initialState,
            finalStates: prevState.schema.finalStates.filter(function (state) {
              return state !== stateName;
            })
          })
        };
      });
    };

    _this.handleEditState = function (_ref9) {
      var initialName = _ref9.initialName,
          name = _ref9.name,
          description = _ref9.description,
          isInitial = _ref9.isInitial,
          isFinal = _ref9.isFinal;
      return _this.setNewState(function (prevState) {
        return initialName ?
        // edited previously existed state
        {
          schema: _extends({}, prevState.schema, {
            states: prevState.schema.states.map(function (state) {
              return state.name === initialName ? { name: name, description: description } : state;
            }),
            initialState: function (initialState) {
              return isInitial ? name : initialState === initialName ? '' : initialState;
            }(prevState.schema.initialState),
            finalStates: function (fs) {
              return fs.indexOf(initialName) > -1 && isFinal === false ? fs.filter(function (state) {
                return state !== initialName;
              }) : fs.indexOf(initialName) > -1 && isFinal ? // should rename
              fs.map(function (state) {
                return state === initialName ? name : state;
              }) : isFinal ? fs.concat(name) : // state was not already final -> should add state to finalStates
              fs;
            } // nothing to do
            (prevState.schema.finalStates),
            transitions: prevState.schema.transitions.map(function (_ref10) {
              var from = _ref10.from,
                  to = _ref10.to,
                  other = _objectWithoutProperties(_ref10, ['from', 'to']);

              return _extends({}, other, {
                from: from === initialName ? name : from,
                to: to === initialName ? name : to
              });
            })
          })
        } :
        // add new state
        {
          schema: _extends({}, prevState.schema, {
            states: prevState.schema.states.concat({ name: name, description: description })
          }, isInitial && { initialState: name }, isFinal && {
            finalStates: prevState.schema.finalStates.concat(name)
          })
        };
      });
    };

    _this.getStateLabel = function (name) {
      return function () {
        var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            name = _ref11.name,
            description = _ref11.description;

        return description || (0, _startCase2.default)(name || '');
      }((0, _find2.default)(_this.state.schema.states, function (_ref12) {
        var stateName = _ref12.name;
        return name === stateName;
      }));
    };

    _this.state = _extends({}, _this.stateFromProps(_this.props));

    // // validate input schemas and objects
    // const ajv = new Ajv();

    // // validate example object
    // const { objectConfiguration } = this.props.workflow.schema;

    // const valid = ajv.
    //   addSchema(objectConfiguration.schema, 'objectSchema').
    //   validate('objectSchema', objectConfiguration.example);

    // if (!valid) {
    //   const title = `objectInfo: Example object is not valid according to its schema!\n`;
    //   const message = ajv.errorsText();
    //   console.error(`${title}${message}`)
    // }

    // //
    // // validate action invocations
    // //
    // const invocations = this.props.workflow.schema.transitions.reduce(
    //   (invs, { actions, from, to, event }) => invs.concat(
    //     (actions || []).map(({ params = [], ...rest }) => ({
    //       ...rest,
    //       transition: { from, to, event },
    //       params: params.reduce((obj, { name, value }) => ({
    //         ...obj,
    //         [name]: value
    //       }), {})
    //     }))
    //   ), []
    // )

    // invocations.forEach(({ name, params, transition: { from, to, event } }) => {
    //   const valid = ajv.
    //     addSchema(this.props.workflow.actions[name].paramsSchema, name).
    //     validate(name, params);

    //   if (!valid) {
    //     const title = `Not valid action invocation in transition from "${from}" to "${to}" on "${event}"!\n`;
    //     const message = ajv.errorsText();
    //     console.error(`${title}${message}`)
    //   }
    // })
    return _this;
  }

  _createClass(WorkflowEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(nextProps, this.props)) {
        this.setState(this.stateFromProps(nextProps));
      }
    }

    // proxy to this.setState; can be used for debugging purposes, e.g. as a logger or onChange handler

  }, {
    key: 'render',
    value: function render() {
      var schema = this.state.schema;
      var _props = this.props,
          title = _props.title,
          _props$workflow = _props.workflow,
          actions = _props$workflow.actions,
          conditions = _props$workflow.conditions;


      return _react2.default.createElement(
        _Grid2.default,
        null,
        _react2.default.createElement(
          _Row2.default,
          null,
          _react2.default.createElement(
            _Col2.default,
            { sm: 12 },
            _react2.default.createElement(
              'h1',
              null,
              'Workflow Editor',
              title && ':\xA0' + title,
              _react2.default.createElement(
                _Button2.default,
                {
                  bsStyle: 'primary',
                  style: { float: 'right', marginTop: '16px' },
                  disabled: !schema.name || schema.transitions.some(function (_ref13) {
                    var from = _ref13.from,
                        to = _ref13.to,
                        event = _ref13.event;
                    return !(from && to && event);
                  }),
                  onClick: this.handleSave
                },
                'Save'
              )
            ),
            _react2.default.createElement(_TopForm2.default, {
              name: schema.name,
              onNameChange: this.handleNameChange
            }),
            _react2.default.createElement(
              _Tabs2.default,
              {
                animation: false,
                id: 'fsm-workflow-editor-elements',
                mountOnEnter: true,
                unmountOnExit: true
              },
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 1, title: _react2.default.createElement(
                    'h4',
                    null,
                    'States'
                  ) },
                _react2.default.createElement(_StatesTable2.default, {
                  states: schema.states,
                  statesInTransitions: schema.transitions.reduce(function (involvedStates, transition) {
                    return ['from', 'to'].reduce(function (acc, key) {
                      return involvedStates.indexOf(transition[key]) === -1 ? acc.concat(transition[key]) : acc;
                    }, involvedStates);
                  }, []),
                  initialState: schema.initialState,
                  finalStates: schema.finalStates,
                  onDelete: this.handleDeleteState,
                  onEdit: this.handleEditState
                })
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 2, title: _react2.default.createElement(
                    'h4',
                    null,
                    'Transitions'
                  ) },
                _react2.default.createElement(_TransitionsTable2.default, {
                  transitions: schema.transitions,
                  states: schema.states.map(function (_ref14) {
                    var name = _ref14.name;
                    return name;
                  }),
                  actions: actions,
                  conditions: conditions,
                  getStateLabel: this.getStateLabel,
                  onEditTransition: this.handleEditTransition,
                  onDeleteTransition: this.handleDeleteTransition,
                  onSaveGuards: this.handleSaveTransitionGuards,
                  onSaveActions: this.handleSaveTransitionActions,
                  actionsComponentRegistry: this.props.actionsComponentRegistry,
                  objectConfiguration: schema.objectConfiguration
                })
              )
            ),
            _react2.default.createElement(_EditorOutput2.default, {
              schema: schema,
              getStateLabel: this.getStateLabel,
              createJsonOutput: this.createJsonOutput
            })
          )
        )
      );
    }
  }]);

  return WorkflowEditor;
}(_react.PureComponent), _class.propTypes = {
  onSave: _propTypes2.default.func,
  title: _propTypes2.default.string,
  workflow: _propTypes2.default.shape({
    schema: _propTypes2.default.shape({
      name: _propTypes2.default.string,
      initialState: _propTypes2.default.string,
      finalStates: _propTypes2.default.arrayOf(_propTypes2.default.string),
      transitions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        from: _propTypes2.default.string,
        to: _propTypes2.default.string,
        event: _propTypes2.default.string,
        guards: _propTypes2.default.arrayOf(_guardPropTypes2.default),
        actions: _propTypes2.default.arrayOf(_actionPropTypes2.default)
      })),
      states: _propTypes2.default.arrayOf(_statePropTypes2.default),
      objectConfiguration: _propTypes2.default.shape({
        alias: _propTypes2.default.string,
        stateFieldName: _propTypes2.default.string,
        example: _propTypes2.default.object.isRequired,
        schema: _propTypes2.default.object
      }).isRequired
    }).isRequired,
    actions: _propTypes2.default.objectOf(_propTypes2.default.shape({
      paramsSchema: _propTypes2.default.object
    })),
    conditions: _propTypes2.default.objectOf(_propTypes2.default.shape({
      paramsSchema: _propTypes2.default.object
    }))
  }).isRequired,
  actionsComponentRegistry: _propTypes2.default.objectOf(_propTypes2.default.func)
}, _class.contextTypes = {
  i18n: _propTypes2.default.object.isRequired
}, _class.defaultProps = {
  onSave: function onSave(_) {}
}, _temp);
exports.default = WorkflowEditor;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Grid");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Col = __webpack_require__(15);

var _Col2 = _interopRequireDefault(_Col);

var _Form = __webpack_require__(36);

var _Form2 = _interopRequireDefault(_Form);

var _FormGroup = __webpack_require__(10);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _ControlLabel = __webpack_require__(13);

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopForm = (_temp = _class = function (_PureComponent) {
  _inherits(TopForm, _PureComponent);

  function TopForm() {
    _classCallCheck(this, TopForm);

    return _possibleConstructorReturn(this, (TopForm.__proto__ || Object.getPrototypeOf(TopForm)).apply(this, arguments));
  }

  _createClass(TopForm, [{
    key: 'render',
    value: function render() {
      var name = this.props.name;


      return _react2.default.createElement(
        _Form2.default,
        { horizontal: true },
        _react2.default.createElement(
          _FormGroup2.default,
          { controlId: 'fsmName' },
          _react2.default.createElement(
            _Col2.default,
            { componentClass: _ControlLabel2.default, sm: 1 },
            'Name'
          ),
          _react2.default.createElement(
            _Col2.default,
            { sm: 11 },
            _react2.default.createElement(_FormControl2.default, {
              type: 'text',
              placeholder: 'Name of your schema',
              value: name,
              onChange: this.props.onNameChange
            })
          )
        )
      );
    }
  }]);

  return TopForm;
}(_react.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string.isRequired,
  onNameChange: _propTypes2.default.func.isRequired
}, _temp);
exports.default = TopForm;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Form");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StatesTable = __webpack_require__(26);

var _StatesTable2 = _interopRequireDefault(_StatesTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _StatesTable2.default;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _find = __webpack_require__(12);

var _find2 = _interopRequireDefault(_find);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Checkbox = __webpack_require__(21);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ControlLabel = __webpack_require__(13);

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _FormGroup = __webpack_require__(10);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _statePropTypes = __webpack_require__(17);

var _statePropTypes2 = _interopRequireDefault(_statePropTypes);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _ErrorLabel = __webpack_require__(18);

var _ErrorLabel2 = _interopRequireDefault(_ErrorLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatesEditor = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_PureComponent) {
  _inherits(StatesEditor, _PureComponent);

  function StatesEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StatesEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StatesEditor.__proto__ || Object.getPrototypeOf(StatesEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = _extends({
      name: '',
      description: ''
    }, _this.props.state, {
      initialName: (_this.props.state || {}).name
    }), _this.handleChangeField = function (field) {
      return function (_ref2) {
        var value = _ref2.target.value;
        return _this.setState(_defineProperty({}, field, value));
      };
    }, _this.handleToggleField = function (field) {
      return function (_) {
        return _this.setState(function (prevState) {
          return _defineProperty({}, field, !prevState[field]);
        });
      };
    }, _this.handleSave = function (_) {
      var _this$state = _this.state,
          name = _this$state.name,
          description = _this$state.description,
          isInitial = _this$state.isInitial,
          isFinal = _this$state.isFinal,
          initialName = _this$state.initialName;

      _this.props.onSave({ name: name, description: description, isInitial: isInitial, isFinal: isFinal, initialName: initialName });
    }, _this.hasUnsavedChanges = function (_) {
      var propState = _this.props.state;
      var _this$state2 = _this.state,
          name = _this$state2.name,
          description = _this$state2.description,
          isInitial = _this$state2.isInitial,
          isFinal = _this$state2.isFinal;


      return propState ? !(0, _isEqual2.default)(propState, { name: name, description: description, isInitial: isInitial, isFinal: isFinal }) : // compare initial and current states
      name || description || isInitial || isFinal; // look for any input for newely created object
    }, _this.handleClose = _this._triggerDialog({
      showDialog: _this.hasUnsavedChanges,
      confirmHandler: _this.props.onClose
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StatesEditor, [{
    key: 'render',
    value: function render() {
      var existingStates = this.props.existingStates;
      var _state = this.state,
          name = _state.name,
          description = _state.description,
          _state$isInitial = _state.isInitial,
          isInitial = _state$isInitial === undefined ? false : _state$isInitial,
          _state$isFinal = _state.isFinal,
          isFinal = _state$isFinal === undefined ? false : _state$isFinal,
          initialName = _state.initialName;


      var duplicateName = !!(0, _find2.default)(existingStates, function (existingName) {
        return existingName === name && initialName !== existingName;
      });

      return _react2.default.createElement(
        _Modal2.default,
        {
          show: true,
          onHide: this.handleClose,
          dialogClassName: 'oc-fsm-crud-editor--modal',
          backdrop: 'static'
        },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            null,
            this.props.state ? 'Edit state \'' + this.props.state.name + '\'' : 'Add new state'
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          null,
          _react2.default.createElement(
            _FormGroup2.default,
            { controlId: 'stateName', style: { marginBottom: 0 } },
            _react2.default.createElement(
              _ControlLabel2.default,
              null,
              'Name'
            ),
            _react2.default.createElement(_FormControl2.default, {
              placeholder: 'Enter state name',
              type: 'text',
              value: name,
              onChange: this.handleChangeField('name')
            }),
            _react2.default.createElement(_ErrorLabel2.default, duplicateName && { error: 'This state already exists' })
          ),
          _react2.default.createElement(
            _FormGroup2.default,
            { controlId: 'stateDescription' },
            _react2.default.createElement(
              _ControlLabel2.default,
              null,
              'Description'
            ),
            _react2.default.createElement(_FormControl2.default, {
              placeholder: 'Enter state description',
              type: 'text',
              value: description,
              onChange: this.handleChangeField('description')
            })
          ),
          _react2.default.createElement(
            _Checkbox2.default,
            {
              checked: isInitial,
              onChange: this.handleToggleField('isInitial')
            },
            'Initial'
          ),
          _react2.default.createElement(
            _Checkbox2.default,
            {
              checked: isFinal,
              onChange: this.handleToggleField('isFinal')
            },
            'Final'
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              bsStyle: 'primary',
              onClick: this.handleSave,
              disabled: !name || duplicateName
            },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose },
            'Close'
          )
        )
      );
    }
  }]);

  return StatesEditor;
}(_react.PureComponent), _class2.propTypes = {
  state: _statePropTypes2.default,
  onClose: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  existingStates: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
}, _temp2)) || _class;

exports.default = StatesEditor;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(40);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var returnTrue = function returnTrue(_) {
  return true;
};

// Higher order component ConfirmDialog injects `_triggerDialog` method into a wrapped component

exports.default = function (WrappedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_PureComponent) {
    _inherits(ConfirmDialog, _PureComponent);

    function ConfirmDialog() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, ConfirmDialog);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfirmDialog.__proto__ || Object.getPrototypeOf(ConfirmDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        show: false,
        confirmHandler: null,
        title: 'Confirmation',
        message: 'You have made changes. Closing this editor will lose these changes.'
      }, _this.componentDidMount = function (_) {
        _this._mountNode = document.createElement('div');
        _this.renderDialog();
      }, _this.componentDidUpdate = function (_) {
        if (_this._mountNode) {
          _this.renderDialog();
        }
      }, _this.componentWillUnmount = function (_) {
        if (_this._mountNode) {
          _reactDom2.default.unmountComponentAtNode(_this._mountNode);
        }
        _this._mountNode = null;
      }, _this.handleClose = function (_) {
        return _this.setState({
          show: false,
          confirmHandler: null
        });
      }, _this.handleConfirm = function (_) {
        _this.state.confirmHandler();
        _this.handleClose();
      }, _this.createDialog = function (_) {
        var _this$props = _this.props,
            textConfirm = _this$props.textConfirm,
            textCancel = _this$props.textCancel;
        var _this$state = _this.state,
            show = _this$state.show,
            title = _this$state.title,
            message = _this$state.message,
            BodyComponent = _this$state.BodyComponent;


        return _react2.default.createElement(
          _Modal2.default,
          { show: show, onHide: _this.handleClose },
          _react2.default.createElement(
            _Modal2.default.Header,
            { closeButton: true },
            _react2.default.createElement(
              _Modal2.default.Title,
              null,
              title
            )
          ),
          _react2.default.createElement(
            _Modal2.default.Body,
            null,
            BodyComponent ? _react2.default.createElement(BodyComponent, null) : message
          ),
          _react2.default.createElement(
            _Modal2.default.Footer,
            null,
            _react2.default.createElement(
              'div',
              { className: 'text-right' },
              _react2.default.createElement(
                _Button2.default,
                {
                  onClick: _this.handleConfirm,
                  bsStyle: 'primary'
                },
                textConfirm
              ),
              _react2.default.createElement(
                _Button2.default,
                {
                  onClick: _this.handleClose
                },
                textCancel
              )
            )
          )
        );
      }, _this.triggerDialog = function (_ref2) {
        var _ref2$showDialog = _ref2.showDialog,
            showDialog = _ref2$showDialog === undefined ? returnTrue : _ref2$showDialog,
            _confirmHandler = _ref2.confirmHandler,
            title = _ref2.title,
            message = _ref2.message,
            BodyComponent = _ref2.BodyComponent;
        return function (event) {
          return showDialog() ? _this.setState(function (_) {
            return _extends({
              show: true,
              confirmHandler: function confirmHandler(_) {
                return _confirmHandler(event);
              }
            }, title && { title: title }, message && { message: message }, BodyComponent && { BodyComponent: BodyComponent });
          }) : _confirmHandler(event);
        };
      }, _this.renderDialog = function (_) {
        _reactDom2.default.render(_this.createDialog(), _this._mountNode);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ConfirmDialog, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['children']);

        WrappedComponent.prototype._triggerDialog = this.triggerDialog; // eslint-disable-line no-param-reassign

        return _react2.default.createElement(
          WrappedComponent,
          props,
          children
        );
      }
    }]);

    return ConfirmDialog;
  }(_react.PureComponent), _class.propTypes = {
    textCancel: _propTypes2.default.string,
    textConfirm: _propTypes2.default.string
  }, _class.defaultProps = {
    textCancel: 'Cancel',
    textConfirm: 'Ok'
  }, _temp2;
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Label");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _statePropTypes = __webpack_require__(17);

var _statePropTypes2 = _interopRequireDefault(_statePropTypes);

var _FormGroup = __webpack_require__(10);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _Radio = __webpack_require__(43);

var _Radio2 = _interopRequireDefault(_Radio);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO maybe optimize communication between components to make it less coupled
var DeleteStateDialogBody = (_temp = _class = function (_PureComponent) {
  _inherits(DeleteStateDialogBody, _PureComponent);

  function DeleteStateDialogBody() {
    var _ref;

    _classCallCheck(this, DeleteStateDialogBody);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = DeleteStateDialogBody.__proto__ || Object.getPrototypeOf(DeleteStateDialogBody)).call.apply(_ref, [this].concat(args)));

    _this.handleSelectState = function (_ref2) {
      var value = _ref2.target.value;
      return _this.setState({
        alternativeState: value
      }, function (_) {
        return _this.props.onSelect({ index: _this.state.selectedOptionIndex, alternative: value });
      });
    };

    _this.handleSelectOption = function (index) {
      return function (_) {
        return _this.setState({
          selectedOptionIndex: index
        }, function (_) {
          return _this.props.onSelect({ index: index, alternative: _this.state.alternativeState });
        });
      };
    };

    var _this$props = _this.props,
        states = _this$props.states,
        stateName = _this$props.stateName;


    _this.state = {
      alternativeState: (states.filter(function (_ref3) {
        var name = _ref3.name;
        return stateName !== name;
      })[0] || {}).name,
      selectedOptionIndex: 0
    };
    return _this;
  }

  _createClass(DeleteStateDialogBody, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          states = _props.states,
          stateName = _props.stateName;
      var _state = this.state,
          alternativeState = _state.alternativeState,
          selectedOptionIndex = _state.selectedOptionIndex;

      var otherStates = states.filter(function (_ref4) {
        var name = _ref4.name;
        return stateName !== name;
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'State "' + stateName + '" is used in transitions. Options to proceed:'
        ),
        _react2.default.createElement(
          _FormGroup2.default,
          null,
          _react2.default.createElement(
            _Radio2.default,
            {
              name: 'radioGroup',
              checked: selectedOptionIndex === 0,
              onChange: this.handleSelectOption(0)
            },
            'Delete this state and involved transitions'
          ),
          _react2.default.createElement(
            _Radio2.default,
            {
              name: 'radioGroup',
              checked: selectedOptionIndex === 1,
              onChange: this.handleSelectOption(1)
            },
            'Swap state "' + stateName + '" with a different one:',
            _react2.default.createElement(
              _FormControl2.default,
              {
                componentClass: 'select',
                value: alternativeState,
                onChange: this.handleSelectState,
                onFocus: this.handleSelectOption(1)
              },
              otherStates.map(function (_ref5, i) {
                var name = _ref5.name,
                    description = _ref5.description;
                return _react2.default.createElement(
                  'option',
                  { value: name, key: name + '-' + i },
                  description || (0, _utils.formatLabel)(name)
                );
              })
            )
          )
        )
      );
    }
  }]);

  return DeleteStateDialogBody;
}(_react.PureComponent), _class.propTypes = {
  states: _propTypes2.default.arrayOf(_statePropTypes2.default).isRequired,
  stateName: _propTypes2.default.string.isRequired,
  onSelect: _propTypes2.default.func.isRequired
}, _temp);
exports.default = DeleteStateDialogBody;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/Radio");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TransitionsTable = __webpack_require__(45);

var _TransitionsTable2 = _interopRequireDefault(_TransitionsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TransitionsTable2.default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2, _initialiseProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = __webpack_require__(11);

var _Table2 = _interopRequireDefault(_Table);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Glyphicon = __webpack_require__(14);

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _ButtonGroup = __webpack_require__(16);

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _utils = __webpack_require__(2);

var _Guards = __webpack_require__(46);

var _Guards2 = _interopRequireDefault(_Guards);

var _Actions = __webpack_require__(81);

var _Actions2 = _interopRequireDefault(_Actions);

var _TransitionEditor = __webpack_require__(89);

var _TransitionEditor2 = _interopRequireDefault(_TransitionEditor);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _guardPropTypes = __webpack_require__(19);

var _guardPropTypes2 = _interopRequireDefault(_guardPropTypes);

var _actionPropTypes = __webpack_require__(22);

var _actionPropTypes2 = _interopRequireDefault(_actionPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransitionsTable = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_PureComponent) {
  _inherits(TransitionsTable, _PureComponent);

  function TransitionsTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TransitionsTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TransitionsTable.__proto__ || Object.getPrototypeOf(TransitionsTable)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TransitionsTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          transitions = _props.transitions,
          states = _props.states,
          getStateLabel = _props.getStateLabel,
          actions = _props.actions,
          objectConfiguration = _props.objectConfiguration,
          conditions = _props.conditions;
      var _state = this.state,
          showModal = _state.showModal,
          currentTransition = _state.currentTransition,
          modalType = _state.modalType;


      var rows = transitions.map(function (_ref2, index) {
        var from = _ref2.from,
            to = _ref2.to,
            event = _ref2.event;
        return _react2.default.createElement(
          'tr',
          { key: index },
          _react2.default.createElement(
            'td',
            null,
            event
          ),
          _react2.default.createElement(
            'td',
            null,
            getStateLabel(from) || _react2.default.createElement(
              'span',
              { style: { color: 'red' } },
              'Specify \'from\' state'
            )
          ),
          _react2.default.createElement(
            'td',
            null,
            getStateLabel(to) || _react2.default.createElement(
              'span',
              { style: { color: 'red' } },
              'Specify \'to\' state'
            )
          ),
          _react2.default.createElement(
            'td',
            { className: 'text-right' },
            _react2.default.createElement(
              _ButtonGroup2.default,
              { bsSize: 'sm' },
              _react2.default.createElement(
                _Button2.default,
                { onClick: _this2.handleModal(index)('edit') },
                _react2.default.createElement(_Glyphicon2.default, { glyph: 'edit' }),
                '\u2000',
                'Edit'
              ),
              _react2.default.createElement(
                _Button2.default,
                {
                  onClick: _this2.handleModal(index)('guards'),
                  disabled: !(from && to && event)
                },
                'Guards'
              ),
              _react2.default.createElement(
                _Button2.default,
                {
                  onClick: _this2.handleModal(index)('actions'),
                  disabled: !(from && to && event)
                },
                'Actions'
              ),
              _react2.default.createElement(
                _Button2.default,
                { onClick: _this2.handleDelete(index) },
                _react2.default.createElement(_Glyphicon2.default, { glyph: 'trash' }),
                '\u2000',
                'Delete'
              )
            )
          )
        );
      });

      var modal = void 0;

      if (showModal) {
        var transition = void 0;

        if ((0, _utils.isDef)(currentTransition)) {
          transition = transitions[currentTransition];
        }

        switch (modalType) {
          case 'guards':
            modal = _react2.default.createElement(_Guards2.default, {
              guards: transition.guards,
              conditions: conditions,
              title: 'Guards for transition on "' + transition.event + '" from "' + getStateLabel(transition.from) + '" to "' + getStateLabel(transition.to) + '"',
              onClose: this.handleCloseModal,
              onSave: this.handleSaveGuards(currentTransition),
              objectConfiguration: objectConfiguration
            });
            break;
          case 'actions':
            modal = _react2.default.createElement(_Actions2.default, {
              transition: transition,
              title: 'Actions for transition on "' + transition.event + '" from "' + getStateLabel(transition.from) + '" to "' + getStateLabel(transition.to) + '"',
              actions: actions,
              getStateLabel: getStateLabel,
              onClose: this.handleCloseModal,
              onSave: this.handleSaveActions(currentTransition),
              objectConfiguration: objectConfiguration,
              componentsRegistry: this.props.actionsComponentRegistry
            });
            break;
          default:
            modal = _react2.default.createElement(_TransitionEditor2.default, {
              transition: transition,
              states: states,
              getStateLabel: getStateLabel,
              onSave: this.handleSaveTransition,
              onClose: this.handleCloseModal,
              index: currentTransition
            });
        }
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Table2.default,
          { className: 'oc-fsm-crud-editor--table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Event'
              ),
              _react2.default.createElement(
                'th',
                null,
                'From'
              ),
              _react2.default.createElement(
                'th',
                null,
                'To'
              ),
              _react2.default.createElement(
                'th',
                { className: 'text-right' },
                _react2.default.createElement(
                  _Button2.default,
                  {
                    bsSize: 'sm',
                    onClick: this.handleModal()('edit')
                  },
                  'Add'
                )
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            rows
          )
        ),
        modal
      );
    }
  }]);

  return TransitionsTable;
}(_react.PureComponent), _class2.propTypes = {
  transitions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    from: _propTypes2.default.string,
    to: _propTypes2.default.string,
    event: _propTypes2.default.string,
    guards: _propTypes2.default.arrayOf(_guardPropTypes2.default),
    actions: _propTypes2.default.arrayOf(_actionPropTypes2.default)
  })),
  states: _propTypes2.default.arrayOf(_propTypes2.default.string),
  actions: _propTypes2.default.objectOf(_propTypes2.default.shape({
    paramsSchema: _propTypes2.default.object
  })),
  conditions: _propTypes2.default.objectOf(_propTypes2.default.shape({
    paramsSchema: _propTypes2.default.object
  })),
  getStateLabel: _propTypes2.default.func.isRequired,
  onEditTransition: _propTypes2.default.func.isRequired,
  onDeleteTransition: _propTypes2.default.func.isRequired,
  onSaveGuards: _propTypes2.default.func.isRequired,
  onSaveActions: _propTypes2.default.func.isRequired,
  objectConfiguration: _propTypes2.default.object.isRequired,
  actionsComponentRegistry: _propTypes2.default.objectOf(_propTypes2.default.func)
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    showModal: false,
    modalType: null,
    currentTransition: null
  };

  this.handleDelete = function (index) {
    return _this3._triggerDialog({
      confirmHandler: function confirmHandler(_) {
        return _this3.props.onDeleteTransition(index);
      },
      message: 'Do you really want to delete this transition?'
    });
  };

  this.handleModal = function (index) {
    return function (type) {
      return function (_) {
        return _this3.setState({
          showModal: true,
          modalType: type,
          currentTransition: index
        });
      };
    };
  };

  this.handleCloseModal = function (_) {
    return _this3.setState({
      showModal: false,
      modalType: null,
      currentTransition: null
    });
  };

  this.handleSaveGuards = function (index) {
    return function (guards) {
      _this3.handleCloseModal();
      _this3.props.onSaveGuards(index)(guards);
    };
  };

  this.handleSaveActions = function (index) {
    return function (actions) {
      _this3.handleCloseModal();
      _this3.props.onSaveActions(index)(actions);
    };
  };

  this.handleSaveTransition = function () {
    var _props2;

    _this3.handleCloseModal();
    (_props2 = _this3.props).onEditTransition.apply(_props2, arguments);
  };
}, _temp2)) || _class;

exports.default = TransitionsTable;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GuardsTable = __webpack_require__(47);

var _GuardsTable2 = _interopRequireDefault(_GuardsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _GuardsTable2.default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _Table = __webpack_require__(11);

var _Table2 = _interopRequireDefault(_Table);

var _Glyphicon = __webpack_require__(14);

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _ButtonGroup = __webpack_require__(16);

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _utils = __webpack_require__(2);

var _guardPropTypes = __webpack_require__(19);

var _guardPropTypes2 = _interopRequireDefault(_guardPropTypes);

var _GuardEditor = __webpack_require__(48);

var _GuardEditor2 = _interopRequireDefault(_GuardEditor);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GuardsTable = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_PureComponent) {
  _inherits(GuardsTable, _PureComponent);

  function GuardsTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GuardsTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GuardsTable.__proto__ || Object.getPrototypeOf(GuardsTable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      guards: _this.props.guards || [],
      showEditor: false,
      currentGuardIndex: null
    }, _this.onDelete = function (index) {
      return _this.setState(function (prevState) {
        return {
          guards: prevState.guards.filter(function (_, i) {
            return i !== index;
          })
        };
      });
    }, _this.hasUnsavedChanges = function (_) {
      var stateGuards = _this.state.guards;
      var guards = _this.props.guards;

      return !(0, _isEqual2.default)(stateGuards, guards);
    }, _this.handleClose = _this._triggerDialog({
      showDialog: _this.hasUnsavedChanges,
      confirmHandler: _this.props.onClose
    }), _this.handleDelete = function (index) {
      return _this._triggerDialog({
        confirmHandler: function confirmHandler(_) {
          return _this.onDelete(index);
        },
        message: 'Do you really want to remove this guard?'
      });
    }, _this.handleSave = function (_) {
      return _this.props.onSave(_this.state.guards);
    }, _this.handleOpenEditor = function (index) {
      return function (_) {
        return _this.setState({
          showEditor: true,
          currentGuardIndex: index
        });
      };
    }, _this.handleCloseEditor = function (_) {
      return _this.setState({
        showEditor: false,
        currentGuardIndex: null
      });
    }, _this.handleSaveGuard = function (index) {
      return function (guard) {
        return _this.setState(function (prevState) {
          var guardIsDefined = 'expression' in guard && !!guard.expression || Object.keys(guard).filter(function (k) {
            return k !== 'expression';
          }).length > 0;
          var newGuards = void 0;
          if ((0, _utils.isDef)(index)) {
            newGuards = guardIsDefined ? prevState.guards.map(function (g, i) {
              return i === index ? guard : g;
            }) : prevState.guards.filter(function (_, i) {
              return i !== index;
            });
          } else {
            newGuards = guardIsDefined && prevState.guards.concat(guard);
          }
          return newGuards ? { guards: newGuards } : {};
        }, _this.handleCloseEditor);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GuardsTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var i18n = this.context.i18n;
      var _props = this.props,
          title = _props.title,
          conditions = _props.conditions,
          objectConfiguration = _props.objectConfiguration,
          componentsRegistry = _props.componentsRegistry;
      var _state = this.state,
          guards = _state.guards,
          showEditor = _state.showEditor,
          currentGuardIndex = _state.currentGuardIndex;


      var editorModal = void 0;

      if (showEditor) {
        var guard = void 0;

        if ((0, _utils.isDef)(currentGuardIndex)) {
          guard = guards[currentGuardIndex];
        }

        editorModal = _react2.default.createElement(_GuardEditor2.default, {
          guard: guard,
          conditions: conditions,
          objectConfiguration: objectConfiguration,
          componentsRegistry: componentsRegistry,
          onClose: this.handleCloseEditor,
          onSave: this.handleSaveGuard(currentGuardIndex)
        });
      }

      return _react2.default.createElement(
        _Modal2.default,
        {
          show: true,
          onHide: this.handleClose,
          dialogClassName: 'oc-fsm-crud-editor--modal',
          backdrop: 'static'
        },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            null,
            title
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          null,
          _react2.default.createElement(
            'div',
            { className: 'oc-fsm-crud-editor--states-editor' },
            _react2.default.createElement(
              _Table2.default,
              { className: 'oc-fsm-crud-editor--table-actions' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    null,
                    'Name'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'Parameters'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'text-right' },
                    _react2.default.createElement(
                      _Button2.default,
                      {
                        bsSize: 'sm',
                        onClick: this.handleOpenEditor()
                      },
                      'Add'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                guards.length > 0 ? guards.map(function (_ref2, index) {
                  var guardName = _ref2.name,
                      params = _ref2.params,
                      expression = _ref2.expression;
                  return _react2.default.createElement(
                    'tr',
                    { key: guardName + '-' + index },
                    _react2.default.createElement(
                      'td',
                      { style: { paddingTop: '15px' } },
                      guardName ? (0, _utils.formatLabel)(guardName) : 'JavaScript Expression'
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      Array.isArray(params) && params.length > 0 ? _react2.default.createElement(
                        'table',
                        { className: 'oc-fsm-crud-editor--table-actions-parameters' },
                        _react2.default.createElement(
                          'tbody',
                          null,
                          params.map(function (_ref3, i) {
                            var name = _ref3.name,
                                value = _ref3.value;

                            return _react2.default.createElement(
                              'tr',
                              { key: i + '-' + name },
                              _react2.default.createElement(
                                'td',
                                null,
                                (0, _utils.formatLabel)(name)
                              ),
                              _react2.default.createElement(
                                'td',
                                { className: 'parameter-value' },
                                (0, _utils.formatArg)({
                                  i18n: i18n,
                                  schema: conditions[guardName].paramsSchema.properties[name],
                                  value: value
                                })
                              )
                            );
                          })
                        )
                      ) : _react2.default.createElement(
                        'pre',
                        null,
                        expression
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'text-right' },
                      _react2.default.createElement(
                        _ButtonGroup2.default,
                        { bsStyle: 'sm' },
                        _react2.default.createElement(
                          _Button2.default,
                          {
                            onClick: _this2.handleOpenEditor(index)
                          },
                          _react2.default.createElement(_Glyphicon2.default, { glyph: 'edit' }),
                          '\u2000',
                          'Edit'
                        ),
                        _react2.default.createElement(
                          _Button2.default,
                          {
                            onClick: _this2.handleDelete(index)
                          },
                          _react2.default.createElement(_Glyphicon2.default, { glyph: 'trash' }),
                          '\u2000',
                          'Delete'
                        )
                      )
                    )
                  );
                }) : _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { colSpan: 3, style: { textAlign: 'center' } },
                    'No guards specified for this transition. Go ahead and',
                    '\xA0',
                    _react2.default.createElement(
                      'a',
                      {
                        onClick: this.handleOpenEditor(),
                        style: { cursor: 'pointer', fontWeight: 'bold' }
                      },
                      'add new'
                    ),
                    '!'
                  )
                )
              )
            ),
            editorModal
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              bsStyle: 'primary',
              onClick: this.handleSave
            },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose },
            'Close'
          )
        )
      );
    }
  }]);

  return GuardsTable;
}(_react.PureComponent), _class2.propTypes = {
  guards: _propTypes2.default.arrayOf(_guardPropTypes2.default),
  conditions: _propTypes2.default.objectOf(_propTypes2.default.shape({
    paramsSchema: _propTypes2.default.object
  })),
  title: _propTypes2.default.string.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  objectConfiguration: _propTypes2.default.object.isRequired,
  componentsRegistry: _propTypes2.default.objectOf(_propTypes2.default.func)
}, _class2.contextTypes = {
  i18n: _propTypes2.default.object.isRequired
}, _temp2)) || _class;

exports.default = GuardsTable;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _find = __webpack_require__(12);

var _find2 = _interopRequireDefault(_find);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Tabs = __webpack_require__(23);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = __webpack_require__(24);

var _Tab2 = _interopRequireDefault(_Tab);

var _Row = __webpack_require__(20);

var _Row2 = _interopRequireDefault(_Row);

var _Col = __webpack_require__(15);

var _Col2 = _interopRequireDefault(_Col);

var _Glyphicon = __webpack_require__(14);

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Table = __webpack_require__(11);

var _Table2 = _interopRequireDefault(_Table);

var _Checkbox = __webpack_require__(21);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _HelpBlock = __webpack_require__(49);

var _HelpBlock2 = _interopRequireDefault(_HelpBlock);

var _guardPropTypes = __webpack_require__(19);

var _guardPropTypes2 = _interopRequireDefault(_guardPropTypes);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _CodeEditor = __webpack_require__(50);

var _CodeEditor2 = _interopRequireDefault(_CodeEditor);

var _ErrorLabel = __webpack_require__(18);

var _ErrorLabel2 = _interopRequireDefault(_ErrorLabel);

var _ObjectInspector = __webpack_require__(58);

var _ObjectInspector2 = _interopRequireDefault(_ObjectInspector);

var _ParamsEditor = __webpack_require__(27);

var _ParamsEditor2 = _interopRequireDefault(_ParamsEditor);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var evaluateCode = function evaluateCode(_ref) {
  var code = _ref.code,
      arg = _ref.arg;

  try {
    var result = eval( // eslint-disable-line no-eval
    '\n          (function(arg) {\n            ' + Object.keys(arg).map(function (key) {
      return 'var ' + key + ' = arg[' + JSON.stringify(key) + '];';
    }).join('\n') + '\n            return (' + code + ')\n          })\n        ')(arg);

    return typeof result === 'boolean' ? String(result) : new Error('Function returned:\n        ' + String(result) + ' of type \'' + (typeof result === 'undefined' ? 'undefined' : _typeof(result)) + '\',\n        but expected a boolean value.');
  } catch (err) {
    return err;
  }
};

var GuardEditor = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_PureComponent) {
  _inherits(GuardEditor, _PureComponent);

  function GuardEditor() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, GuardEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = GuardEditor.__proto__ || Object.getPrototypeOf(GuardEditor)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      guard: _this.props.guard || {},
      exampleObject: _this.props.objectConfiguration.example,
      autoplay: true,
      guardEditorSelectorPos: {
        line: 0,
        ch: 0
      },
      activeTab: (_this.props.guard || {}).expression ? 2 : 1
    }, _this.hasUnsavedChanges = function (_) {
      return _this.props.guard ? !(0, _isEqual2.default)(_this.state.guard, _this.props.guard) : Object.keys(_this.state.guard).length;
    }, _this.handleClose = _this._triggerDialog({
      showDialog: _this.hasUnsavedChanges,
      confirmHandler: _this.props.onClose
    }), _this.handleSave = function (_) {
      return _this.props.onSave(_this.state.guard);
    }, _this.handleCursorActivity = function (cm) {
      return _this.setState({
        guardEditorSelectorPos: cm.doc.sel.ranges[0].anchor
      });
    }, _this.handleObjectPropClick = function (_ref3) {
      var path = _ref3.path;
      var alias = _this.props.objectConfiguration.alias;
      var _this$state = _this.state,
          _this$state$guardEdit = _this$state.guardEditorSelectorPos,
          line = _this$state$guardEdit.line,
          ch = _this$state$guardEdit.ch,
          guard = _this$state.guard;


      var workablePath = path.split('.').slice(1).map(function (s) {
        return '[' + JSON.stringify(s) + ']';
      }).join('');
      var injectedValue = '' + (alias || 'object') + workablePath;

      var expression = guard.expression;

      var newGuardBody = (expression || '').split('\n').map(function (bodyLine, index) {
        return index === line ? bodyLine.slice(0, ch) + injectedValue + bodyLine.slice(ch) : bodyLine;
      }).join('\n');

      _this.handleChangeExpression(newGuardBody);

      // handle codemirror focus and cursor position
      var cm = _this._editor.getCodeMirror();
      // focus resets cursor to 0; fix it
      cm.focus();
      setTimeout( // eslint-disable-line no-undef
      function (_) {
        return cm.setCursor(line, ch + injectedValue.length);
      }, 10);
    }, _this.saveRef = function (el) {
      return _this._editor = el;
    }, _this.handleToggleAutoplay = function (_) {
      return _this.setState(function (prevState) {
        return {
          autoplay: !prevState.autoplay
        };
      }, _this.autoPlay);
    }, _this.autoPlay = function (_) {
      return _this.state.autoplay && _this.handleEvalCode();
    }, _this.handleEvalCode = function (_) {
      var alias = _this.props.objectConfiguration.alias;
      var code = _this.state.guard.expression;

      var object = _this.state.exampleObject;

      var result = code ? evaluateCode({
        code: code,
        arg: _extends({
          object: object
        }, alias && _defineProperty({}, alias, object))
      }) : null;

      var isError = result instanceof Error;

      return _this.setState(function (prevState) {
        return {
          isError: isError,
          result: isError ? result.message : result
        };
      });
    }, _this.handleChangeExpression = function (value) {
      return _this.setState(function (prevState) {
        return {
          guard: _extends({}, prevState.guard, { expression: value })
        };
      }, _this.autoPlay);
    }, _this.handleCleanExpression = function (_) {
      return _this.setState(function (prevState) {
        return {
          guard: _extends({}, prevState.guard, { expression: '' })
        };
      }, _this.autoPlay);
    }, _this.getParamValue = function (name) {
      return ((0, _find2.default)(_this.state.guard.params || [], function (_ref5) {
        var paramName = _ref5.name;
        return paramName === name;
      }) || {}).value;
    }, _this.handleChangeParam = function (param) {
      return function (value) {
        return _this.setState(function (prevState) {
          return {
            guard: _extends({}, prevState.guard, {
              params:
              // either change existing param or add a new one
              function (params) {
                return (0, _find2.default)(params, function (_ref6) {
                  var name = _ref6.name;
                  return name === param;
                }) ? params : params.concat({ name: param });
              }(prevState.guard.params || []).map(function (_ref7) {
                var name = _ref7.name,
                    rest = _objectWithoutProperties(_ref7, ['name']);

                return _extends({
                  name: name
                }, rest, param === name && {
                  value: (_this.props.conditions[_this.state.guard.name] || {}).type === 'boolean' ? // toggle boolean values
                  !((0, _find2.default)(prevState.guard.params || [], function (_ref8) {
                    var n = _ref8.name;
                    return n === name;
                  }) || {}).value : value
                });
              })
            })
          };
        });
      };
    }, _this.handleSelectCondition = function (_ref9) {
      var value = _ref9.target.value;
      return _this._triggerDialog({
        showDialog: function showDialog(_) {
          var _ref10 = _this.props.guard || {},
              pName = _ref10.name,
              _ref10$params = _ref10.params,
              propParams = _ref10$params === undefined ? [] : _ref10$params;

          var _this$state$guard = _this.state.guard,
              sName = _this$state$guard.name,
              _this$state$guard$par = _this$state$guard.params,
              stateParams = _this$state$guard$par === undefined ? [] : _this$state$guard$par;


          return pName === sName ? !(0, _isEqual2.default)(propParams, stateParams) || stateParams.some(function (_ref11) {
            var name = _ref11.name,
                value = _ref11.value;
            return !(0, _find2.default)(propParams, function (_ref12) {
              var paramName = _ref12.name;
              return name === paramName;
            }) && (0, _utils.isDef)(value);
          }) : stateParams.some(function (_ref13) {
            var value = _ref13.value;
            return (0, _utils.isDef)(value);
          });
        },
        confirmHandler: function confirmHandler(_) {
          return _this.setState(function (prevState) {
            return {
              guard: _extends({}, prevState.guard, {
                name: value,
                params: value ? value === (_this.props.guard || {}).name ? (_this.props.guard || {}).params || [] : Object.keys((_this.props.conditions[value].paramsSchema || {}).properties || {}).map(function (name) {
                  return { name: name };
                }) : []
              })
            };
          });
        }
      })(value);
    }, _this.handleTabSelect = function (nextTab) {
      return _this._triggerDialog({
        showDialog: function showDialog(_) {
          var _this$props$guard = _this.props.guard;
          _this$props$guard = _this$props$guard === undefined ? {} : _this$props$guard;
          var _this$props$guard$nam = _this$props$guard.name,
              pn = _this$props$guard$nam === undefined ? '' : _this$props$guard$nam,
              _this$props$guard$par = _this$props$guard.params,
              pp = _this$props$guard$par === undefined ? [] : _this$props$guard$par,
              _this$props$guard$exp = _this$props$guard.expression,
              pe = _this$props$guard$exp === undefined ? '' : _this$props$guard$exp;
          var _this$state$guard2 = _this.state.guard,
              _this$state$guard2$na = _this$state$guard2.name,
              sn = _this$state$guard2$na === undefined ? '' : _this$state$guard2$na,
              _this$state$guard2$pa = _this$state$guard2.params,
              sp = _this$state$guard2$pa === undefined ? [] : _this$state$guard2$pa,
              _this$state$guard2$ex = _this$state$guard2.expression,
              se = _this$state$guard2$ex === undefined ? '' : _this$state$guard2$ex;

          if (nextTab === 1 && (pe ? pe !== se : se) || nextTab === 2 && !(0, _isEqual2.default)(pn ? { name: pn, params: pp } : { name: '', params: [] }, { name: sn, params: sp })) {
            return true;
          }
          return false;
        },
        confirmHandler: function confirmHandler(_) {
          return _this.setState(function (prevState) {
            return {
              activeTab: nextTab,
              guard: nextTab === 1 ?
              // predefined function
              {
                name: (_this.props.guard || {}).name || '',
                params: (_this.props.guard || {}).params || []
              } :
              // expression
              {
                expression: (_this.props.guard || {}).expression || ''
              }
            };
          }, nextTab === 2 && _this.autoPlay);
        }
      })(nextTab);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GuardEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.autoplay) {
        this.handleEvalCode();
      }
    } // eslint-disable-line no-return-assign

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          guard = _state.guard,
          autoplay = _state.autoplay,
          exampleObject = _state.exampleObject,
          isError = _state.isError,
          result = _state.result,
          activeTab = _state.activeTab;
      var _props = this.props,
          alias = _props.objectConfiguration.alias,
          _props$conditions = _props.conditions,
          conditions = _props$conditions === undefined ? {} : _props$conditions,
          _props$componentsRegi = _props.componentsRegistry,
          componentsRegistry = _props$componentsRegi === undefined ? {} : _props$componentsRegi;


      return _react2.default.createElement(
        _Modal2.default,
        {
          show: true,
          onHide: this.handleClose,
          dialogClassName: 'oc-fsm-crud-editor--modal',
          backdrop: 'static'
        },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            null,
            guard ? 'Edit guard' : 'Add guard'
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          null,
          _react2.default.createElement(
            _Tabs2.default,
            {
              animation: false,
              id: 'fsm-workflow-editor-guards',
              mountOnEnter: true,
              unmountOnExit: true,
              activeKey: activeTab,
              onSelect: this.handleTabSelect
            },
            _react2.default.createElement(
              _Tab2.default,
              { eventKey: 1, title: _react2.default.createElement(
                  'h4',
                  null,
                  'Predefined function'
                ) },
              _react2.default.createElement(
                _Table2.default,
                { className: 'oc-fsm-crud-editor--table-actions' },
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      _react2.default.createElement(
                        'div',
                        { className: 'oc-fsm-crud-editor--modal-heading' },
                        _react2.default.createElement(
                          'div',
                          { className: 'output-heading' },
                          _react2.default.createElement(
                            'b',
                            null,
                            'Choose condition'
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'right-block' },
                            _react2.default.createElement(
                              _FormControl2.default,
                              {
                                componentClass: 'select',
                                value: guard.name || '',
                                onChange: this.handleSelectCondition
                              },
                              _react2.default.createElement('option', { value: '' }),
                              Object.keys(conditions).map(function (name, i) {
                                return _react2.default.createElement(
                                  'option',
                                  { key: i + '-' + name, value: name },
                                  (0, _utils.formatLabel)(name)
                                );
                              })
                            )
                          )
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      null,
                      conditions[guard.name] && _react2.default.createElement(_ParamsEditor2.default, {
                        paramsSchema: conditions[guard.name].paramsSchema,
                        values: Object.keys(conditions[guard.name].paramsSchema.properties).reduce(function (acc, cur) {
                          return _extends({}, acc, _defineProperty({}, cur, _this2.getParamValue(cur)));
                        }, {}),
                        onChangeParam: this.handleChangeParam,
                        componentsRegistry: componentsRegistry
                      })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              _Tab2.default,
              { eventKey: 2, title: _react2.default.createElement(
                  'h4',
                  null,
                  'Expression'
                ) },
              _react2.default.createElement(
                _Row2.default,
                null,
                _react2.default.createElement(
                  _Col2.default,
                  { sm: 8 },
                  _react2.default.createElement(
                    _Row2.default,
                    null,
                    _react2.default.createElement(
                      _Col2.default,
                      { style: { margin: '0 10px 0' } },
                      _react2.default.createElement(
                        'div',
                        { style: { marginTop: '10px' } },
                        _react2.default.createElement(_CodeEditor2.default, {
                          className: 'guard-code',
                          value: guard.expression,
                          options: {
                            mode: "javascript",
                            lineNumbers: true,
                            theme: "eclipse",
                            placeholder: 'Enter JavaScript code here'
                          },
                          onChange: this.handleChangeExpression,
                          onCursorActivity: this.handleCursorActivity,
                          ref: this.saveRef
                        })
                      ),
                      _react2.default.createElement(_Glyphicon2.default, {
                        glyph: 'remove',
                        style: {
                          position: 'absolute',
                          right: '22px',
                          top: '22px',
                          cursor: 'pointer',
                          zIndex: '2'
                        },
                        onClick: this.handleCleanExpression
                      }),
                      _react2.default.createElement(_ErrorLabel2.default, isError && { error: result })
                    )
                  ),
                  _react2.default.createElement(
                    _Row2.default,
                    null,
                    _react2.default.createElement(
                      _Col2.default,
                      { style: { margin: '0 10px 0' } },
                      _react2.default.createElement(
                        'div',
                        { className: 'oc-fsm-crud-editor--modal-heading' },
                        _react2.default.createElement(
                          'div',
                          { className: 'output-heading' },
                          _react2.default.createElement(
                            'b',
                            null,
                            'Results'
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'right-block' },
                            _react2.default.createElement(
                              'div',
                              null,
                              _react2.default.createElement(_Glyphicon2.default, _extends({
                                glyph: 'play',
                                style: _extends({}, autoplay ? { color: '#ddd' } : { cursor: 'pointer' })
                              }, !autoplay && { onClick: this.handleEvalCode }))
                            ),
                            _react2.default.createElement(
                              _Checkbox2.default,
                              {
                                onChange: this.handleToggleAutoplay,
                                checked: !!autoplay
                              },
                              'Autoplay'
                            )
                          )
                        )
                      ),
                      _react2.default.createElement(_CodeEditor2.default, {
                        className: 'output-code',
                        value: !isError && result || '',
                        options: {
                          theme: "eclipse",
                          lineWrapping: true,
                          readOnly: 'nocursor'
                        }
                      })
                    )
                  )
                ),
                _react2.default.createElement(
                  _Col2.default,
                  { sm: 4 },
                  _react2.default.createElement(
                    'div',
                    { className: 'oc-fsm-crud-editor--modal-heading with-padding' },
                    _react2.default.createElement(
                      'b',
                      null,
                      'Example object'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_ObjectInspector2.default, {
                      name: (0, _utils.formatLabel)(alias || 'object'),
                      object: exampleObject,
                      onClickPropName: this.handleObjectPropClick
                    })
                  ),
                  _react2.default.createElement(
                    _HelpBlock2.default,
                    null,
                    'Click on a property to insert its reference into JavaScript Expression editor.'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              bsStyle: 'primary',
              onClick: this.handleSave,
              disabled: !!(isError && guard.expression) || activeTab === 1 && !guard.name || activeTab === 2 && !guard.expression
            },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose },
            'Close'
          )
        )
      );
    }
  }]);

  return GuardEditor;
}(_react.PureComponent), _class2.propTypes = {
  guard: _guardPropTypes2.default,
  conditions: _propTypes2.default.shape({
    paramsSchema: _propTypes2.default.object
  }),
  objectConfiguration: _propTypes2.default.object.isRequired,
  componentsRegistry: _propTypes2.default.objectOf(_propTypes2.default.func),
  onClose: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired
}, _temp2)) || _class;

exports.default = GuardEditor;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/lib/HelpBlock");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CodeEditor = __webpack_require__(51);

var _CodeEditor2 = _interopRequireDefault(_CodeEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CodeEditor2.default;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kvolkovichScReactCodemirror = __webpack_require__(52);

var _kvolkovichScReactCodemirror2 = _interopRequireDefault(_kvolkovichScReactCodemirror);

__webpack_require__(53);

__webpack_require__(54);

__webpack_require__(55);

var _codemirrorPlaceholderMod = __webpack_require__(56);

var _codemirrorPlaceholderMod2 = _interopRequireDefault(_codemirrorPlaceholderMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

exports.default = _kvolkovichScReactCodemirror2.default;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("kvolkovich-sc-react-codemirror");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("codemirror/lib/codemirror.css");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("codemirror/theme/eclipse.css");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("codemirror/mode/javascript/javascript");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _codemirror = __webpack_require__(57);

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

/* eslint-disable */
(function (mod) {
  mod(_codemirror2.default);
})(function (CodeMirror) {
  CodeMirror.defineOption("placeholder", "", function (cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.on("blur", onBlur);
      cm.on("change", onChange);
      cm.on("focus", onFocus);
      cm.on("swapDoc", onChange);
      onChange(cm);
    } else if (!val && prev) {
      cm.off("blur", onBlur);
      cm.off("change", onChange);
      cm.off("swapDoc", onChange);
      clearPlaceholder(cm);
      var wrapper = cm.getWrapperElement();
      wrapper.className = wrapper.className.replace(" CodeMirror-empty", "");
    }

    if (val && !cm.hasFocus()) onBlur(cm);
  });

  function clearPlaceholder(cm) {
    if (cm.state.placeholder) {
      cm.state.placeholder.parentNode.removeChild(cm.state.placeholder);
      cm.state.placeholder = null;
    }
  }
  function setPlaceholder(cm) {
    clearPlaceholder(cm);
    var elt = cm.state.placeholder = document.createElement("pre");
    elt.style.cssText = "height: 0; overflow: visible";
    elt.style.direction = cm.getOption("direction");
    elt.className = "CodeMirror-placeholder";
    var placeHolder = cm.getOption("placeholder");
    if (typeof placeHolder == "string") placeHolder = document.createTextNode(placeHolder);
    elt.appendChild(placeHolder);
    cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
  }

  function onBlur(cm) {
    if (isEmpty(cm)) setPlaceholder(cm);
  }

  function onFocus(cm) {
    clearPlaceholder(cm);
  }

  function onChange(cm) {
    var wrapper = cm.getWrapperElement(),
        empty = isEmpty(cm);
    wrapper.className = wrapper.className.replace(" CodeMirror-empty", "") + (empty ? " CodeMirror-empty" : "");
  }

  function isEmpty(cm) {
    return cm.lineCount() === 1 && cm.getLine(0) === "";
  }
});
/* eslint-enable */

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("codemirror");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;
// polyfills needed for 'react-inspector'


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(59);

__webpack_require__(60);

var _reactInspector = __webpack_require__(61);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExampleObjectInspector = (_temp2 = _class = function (_PureComponent) {
  _inherits(ExampleObjectInspector, _PureComponent);

  function ExampleObjectInspector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExampleObjectInspector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExampleObjectInspector.__proto__ || Object.getPrototypeOf(ExampleObjectInspector)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickPropName = function (propData) {
      return function (_) {
        return _this.props.onClickPropName(propData);
      };
    }, _this.exampleObjectNodeRenderer = function (_ref2) {
      var depth = _ref2.depth,
          name = _ref2.name,
          data = _ref2.data,
          isNonenumerable = _ref2.isNonenumerable,
          path = _ref2.path;
      var onClickPropName = _this.props.onClickPropName;


      return depth === 0 ? _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_reactInspector.ObjectName, { name: name }),
        ':'
      ) : _react2.default.createElement(
        'span',
        { style: { margin: '5px' } },
        _react2.default.createElement(
          'span',
          onClickPropName && {
            onClick: _this.handleClickPropName({ name: name, data: data, path: path }),
            style: { cursor: 'pointer' }
          },
          _react2.default.createElement(_reactInspector.ObjectName, {
            name: name,
            dimmed: isNonenumerable
          })
        ),
        _react2.default.createElement(
          'span',
          null,
          ': '
        ),
        _react2.default.createElement(_reactInspector.ObjectValue, { object: data })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExampleObjectInspector, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          object = _props.object;


      return _react2.default.createElement(_reactInspector.ObjectInspector, {
        data: object,
        expandLevel: 2,
        name: name,
        theme: _extends({}, _reactInspector.chromeLight, {
          TREENODE_FONT_SIZE: '14px',
          TREENODE_LINE_HEIGHT: '24px'
        }),
        nodeRenderer: this.exampleObjectNodeRenderer
      });
    }
  }]);

  return ExampleObjectInspector;
}(_react.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string,
  object: _propTypes2.default.object,
  onClickPropName: _propTypes2.default.func
}, _class.defaultProps = {
  object: {}
}, _temp2);
exports.default = ExampleObjectInspector;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("core-js/fn/array/from");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("core-js/es6/symbol");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("react-inspector");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Row = __webpack_require__(20);

var _Row2 = _interopRequireDefault(_Row);

var _Col = __webpack_require__(15);

var _Col2 = _interopRequireDefault(_Col);

var _utils = __webpack_require__(2);

var _components = __webpack_require__(28);

var _components2 = _interopRequireDefault(_components);

var _GenericInput = __webpack_require__(73);

var _GenericInput2 = _interopRequireDefault(_GenericInput);

var _ArrayEditor = __webpack_require__(74);

var _ArrayEditor2 = _interopRequireDefault(_ArrayEditor);

var _MultiSelect = __webpack_require__(77);

var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericEditor = (_temp2 = _class = function (_PureComponent) {
  _inherits(GenericEditor, _PureComponent);

  function GenericEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GenericEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GenericEditor.__proto__ || Object.getPrototypeOf(GenericEditor)).call.apply(_ref, [this].concat(args))), _this), _this.getParamValue = function (name) {
      return (_this.props.values || {})[name];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GenericEditor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onChangeParam = _props.onChangeParam,
          componentsRegistry = _props.componentsRegistry;
      var params = this.props.paramsSchema.properties;


      var inputs = Object.keys(params).map(function (name, i) {
        var paramSchema = params[name];
        var paramValue = _this2.getParamValue(name);
        var type = (paramSchema || {}).type;
        var customComponentName = (paramSchema || {}).uiComponent;
        var CustomComponent = (componentsRegistry || {})[customComponentName];
        var handleChange = onChangeParam(name);

        return type === 'array' ? ((paramSchema || {}).items || {}).enum ? _react2.default.createElement(_MultiSelect2.default, {
          key: name,
          id: name + '-' + i,
          label: (0, _utils.formatLabel)(name),
          value: paramValue,
          schema: paramSchema,
          onChange: handleChange
        }) : _react2.default.createElement(_ArrayEditor2.default, {
          key: name,
          name: name,
          schema: paramSchema,
          value: paramValue,
          onChange: handleChange
        }) :
        // not an array
        CustomComponent ? _react2.default.createElement(CustomComponent, {
          label: (0, _utils.formatLabel)(name),
          value: paramValue,
          onChange: handleChange
        }) : _react2.default.createElement(_GenericInput2.default, {
          key: name,
          id: name + '-' + i,
          label: (0, _utils.formatLabel)(name),
          component: (0, _components2.default)(paramSchema),
          onChange: handleChange,
          placeholder: 'Enter value',
          value: paramValue
        });
      });

      var grid = [];

      if (inputs && inputs.length) {
        for (var rowIndex = 0; rowIndex < Math.ceil(inputs.length); rowIndex++) {
          var cols = [];
          for (var colIndex = 0; colIndex < 2; colIndex++) {
            cols.push(_react2.default.createElement(
              _Col2.default,
              { key: colIndex, sm: 6 },
              inputs[rowIndex * 2 + colIndex]
            ));
          }
          var row = _react2.default.createElement(
            _Row2.default,
            { key: rowIndex },
            cols
          );
          grid.push(row);
        }
      }

      return _react2.default.createElement(
        'div',
        null,
        grid
      );
    }
  }]);

  return GenericEditor;
}(_react.PureComponent), _class.propTypes = {
  paramsSchema: _propTypes2.default.shape({
    properties: _propTypes2.default.objectOf.isRequired
  }),
  values: _propTypes2.default.object,
  componentsRegistry: _propTypes2.default.objectOf(_propTypes2.default.func),
  onChangeParam: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = GenericEditor;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function StringInput(_ref) {
  var value = _ref.value,
      _onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['value', 'onChange']);

  return _react2.default.createElement(_FormControl2.default, _extends({}, props, {
    type: 'text',
    value: value || '',
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      return _onChange(value);
    }
  }));
}

exports.default = StringInput;
StringInput.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Checkbox = __webpack_require__(21);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function BooleanInput(_ref) {
  var value = _ref.value,
      _onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['value', 'onChange']);

  return _react2.default.createElement(_Checkbox2.default, _extends({}, props, {
    checked: !!value,
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      return _onChange(value);
    }
  }));
}

exports.default = BooleanInput;
BooleanInput.propTypes = {
  value: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _ErrorLabel = __webpack_require__(18);

var _ErrorLabel2 = _interopRequireDefault(_ErrorLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntegerInput = (_temp2 = _class = function (_PureComponent) {
  _inherits(IntegerInput, _PureComponent);

  function IntegerInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IntegerInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IntegerInput.__proto__ || Object.getPrototypeOf(IntegerInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.context.i18n.formatNumber(_this.props.value || null) || ''
    }, _this.handleChange = function (_ref2) {
      var value = _ref2.target.value;
      var i18n = _this.context.i18n;


      var error = void 0;

      try {
        var result = i18n.parseNumber(value || null);
        _this.props.onChange(result);
      } catch (err) {
        error = 'Not a valid integer';
      } finally {
        _this.setState({ value: value, error: error });
      }
    }, _this.handleBlur = function (_) {
      var i18n = _this.context.i18n;
      var value = _this.state.value;


      try {
        var parsed = i18n.parseNumber(value || null);
        _this.setState({
          value: i18n.formatNumber(parsed || null) || ''
        });
      } catch (err) {
        _this.setState({
          error: 'Not a valid integer'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IntegerInput, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          error = _state.error;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FormControl2.default, {
          type: 'text',
          value: value,
          onChange: this.handleChange,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement(_ErrorLabel2.default, { error: error })
      );
    }
  }]);

  return IntegerInput;
}(_react.PureComponent), _class.propTypes = {
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func
}, _class.contextTypes = {
  i18n: _propTypes2.default.object
}, _temp2);
exports.default = IntegerInput;


IntegerInput.propTypes = {
  value: _propTypes2.default.number
};

IntegerInput.contextTypes = {
  i18n: _propTypes2.default.object
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _ErrorLabel = __webpack_require__(18);

var _ErrorLabel2 = _interopRequireDefault(_ErrorLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecimalInput = (_temp2 = _class = function (_PureComponent) {
  _inherits(DecimalInput, _PureComponent);

  function DecimalInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DecimalInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DecimalInput.__proto__ || Object.getPrototypeOf(DecimalInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.context.i18n.formatDecimalNumber(_this.props.value || null) || ''
    }, _this.handleChange = function (_ref2) {
      var value = _ref2.target.value;
      var i18n = _this.context.i18n;


      var error = void 0;

      try {
        var result = i18n.parseDecimalNumber(value || null);
        // chop long tail after decimal separator
        _this.props.onChange(i18n.parseDecimalNumber(i18n.formatDecimalNumber(result || null) || null));
      } catch (err) {
        error = 'Not a valid number';
      } finally {
        _this.setState({ value: value, error: error });
      }
    }, _this.handleBlur = function (_) {
      var i18n = _this.context.i18n;
      var value = _this.state.value;


      try {
        var parsed = i18n.parseDecimalNumber(value || null);
        _this.setState({
          value: i18n.formatDecimalNumber(parsed || null) || ''
        });
      } catch (err) {
        _this.setState({
          error: 'Not a valid number'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DecimalInput, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          error = _state.error;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FormControl2.default, {
          type: 'text',
          value: value,
          onChange: this.handleChange,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement(_ErrorLabel2.default, { error: error })
      );
    }
  }]);

  return DecimalInput;
}(_react.PureComponent), _class.propTypes = {
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func
}, _class.contextTypes = {
  i18n: _propTypes2.default.object
}, _temp2);
exports.default = DecimalInput;


DecimalInput.propTypes = {
  value: _propTypes2.default.number
};

DecimalInput.contextTypes = {
  i18n: _propTypes2.default.object
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function EnumInput(_ref) {
  var value = _ref.value,
      _onChange = _ref.onChange,
      options = _ref.options,
      type = _ref.type,
      props = _objectWithoutProperties(_ref, ['value', 'onChange', 'options', 'type']);

  return _react2.default.createElement(
    _FormControl2.default,
    {
      componentClass: 'select',
      value: String(value) || '',
      onChange: function onChange(_ref2) {
        var value = _ref2.target.value;
        return _onChange(value === '' ? null : type === 'number' || type === 'integer' ? Number(value) : value);
      }
    },
    _react2.default.createElement('option', { value: '' }),
    options.map(function (option, i) {
      return _react2.default.createElement(
        'option',
        { key: i, value: option },
        option
      );
    })
  );
}

exports.default = EnumInput;
EnumInput.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.arrayOf(_propTypes2.default.number)]).isRequired,
  type: _propTypes2.default.oneOf(['string', 'number', 'integer'])
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDates = __webpack_require__(69);

var _utils = __webpack_require__(2);

__webpack_require__(70);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function DateInput(_ref, _ref2) {
  var i18n = _ref2.i18n;

  var value = _ref.value,
      _onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['value', 'onChange']);

  return _react2.default.createElement(_reactDates.DateInput, _extends({}, props, {
    locale: i18n.locale,
    value: (0, _utils.isDef)(value) ? new Date(value) : null,
    onChange: function onChange(date) {
      return _onChange(date instanceof Date ? date.toJSON().slice(0, 10) : null);
    }
  }));
}

exports.default = DateInput;
DateInput.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired
};

DateInput.contextTypes = {
  i18n: _propTypes2.default.object.isRequired
};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("@opuscapita/react-dates");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./DateInput.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./DateInput.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".opuscapita_date-input__picker-container,\n.opuscapita_date-input__variants-container {\n  z-index: 9999 !important;\n}\n.opuscapita_date-input input[type=\"text\"],\n.opuscapita_date-input input[type=\"text\"]:focus {\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n  padding: initial;\n}\n", ""]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormGroup = __webpack_require__(10);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = __webpack_require__(13);

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericInput = function (_PureComponent) {
  _inherits(GenericInput, _PureComponent);

  function GenericInput() {
    _classCallCheck(this, GenericInput);

    return _possibleConstructorReturn(this, (GenericInput.__proto__ || Object.getPrototypeOf(GenericInput)).apply(this, arguments));
  }

  _createClass(GenericInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          label = _props.label,
          Component = _props.component,
          props = _objectWithoutProperties(_props, ['id', 'label', 'component']);

      return _react2.default.createElement(
        _FormGroup2.default,
        { controlId: id },
        _react2.default.createElement(
          _ControlLabel2.default,
          null,
          label
        ),
        _react2.default.createElement(Component, _extends({}, props, {
          placeholder: 'Enter value'
        }))
      );
    }
  }]);

  return GenericInput;
}(_react.PureComponent);

exports.default = GenericInput;


GenericInput.propTypes = {
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func.isRequired,
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  component: _propTypes2.default.func.isRequired
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(2);

var _2 = __webpack_require__(28);

var _3 = _interopRequireDefault(_2);

__webpack_require__(75);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayEditor = (_temp2 = _class = function (_PureComponent) {
  _inherits(ArrayEditor, _PureComponent);

  function ArrayEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ArrayEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArrayEditor.__proto__ || Object.getPrototypeOf(ArrayEditor)).call.apply(_ref, [this].concat(args))), _this), _this.handleAdd = function (_) {
      return _this.props.onChange((_this.props.value || []).concat(null));
    }, _this.handleChange = function (index) {
      return function (newValue) {
        return _this.props.onChange([].concat(_toConsumableArray(_this.props.value.slice(0, index)), [newValue], _toConsumableArray(_this.props.value.slice(index + 1))));
      };
    }, _this.handleDelete = function (index) {
      return function (_) {
        return _this.props.onChange([].concat(_toConsumableArray(_this.props.value.slice(0, index)), _toConsumableArray(_this.props.value.slice(index + 1))));
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ArrayEditor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          value = _props.value,
          schema = _props.schema;


      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'table',
          { className: 'oc-fsm-crud-editor--table-array-editor' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                _react2.default.createElement(
                  'label',
                  { htmlFor: name, className: 'control-label' },
                  (0, _utils.formatLabel)(name)
                )
              ),
              _react2.default.createElement(
                'th',
                { className: 'text-right' },
                _react2.default.createElement('i', {
                  className: 'fa fa-plus',
                  style: { cursor: 'pointer' },
                  onClick: this.handleAdd
                })
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            function (Component) {
              return (value || []).map(function (v, i) {
                return _react2.default.createElement(
                  'tr',
                  { key: i },
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(Component, {
                      value: v,
                      onChange: _this2.handleChange(i)
                    })
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'text-right' },
                    _react2.default.createElement('i', {
                      className: 'fa fa-minus',
                      style: { cursor: 'pointer', marginTop: '10px' },
                      onClick: _this2.handleDelete(i)
                    })
                  )
                );
              });
            }((0, _3.default)(schema.items))
          )
        )
      );
    }
  }]);

  return ArrayEditor;
}(_react.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.arrayOf(_propTypes2.default.any),
  schema: _propTypes2.default.object,
  onChange: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = ArrayEditor;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./ArrayEditor.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./ArrayEditor.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".oc-fsm-crud-editor--table-array-editor {\n  width: 100%;\n}\n.oc-fsm-crud-editor--table-array-editor td {\n  vertical-align: top !important;\n  padding-bottom: 5px;\n}\n", ""]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormGroup = __webpack_require__(10);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = __webpack_require__(13);

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _reactSelect = __webpack_require__(78);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var value2rs = function value2rs(_ref) {
  var i18n = _ref.i18n,
      schema = _ref.schema,
      value = _ref.value;
  return {
    label: (0, _utils.formatArg)({ i18n: i18n, schema: schema, value: value }),
    value: value
  };
};

var rs2value = function rs2value(_ref2) {
  var value = _ref2.value;
  return value;
};

var MultiSelect = (_temp2 = _class = function (_PureComponent) {
  _inherits(MultiSelect, _PureComponent);

  function MultiSelect() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call.apply(_ref3, [this].concat(args))), _this), _this.value2rs = function (value) {
      return value2rs({
        i18n: _this.context.i18n,
        schema: (_this.props.schema || {}).items,
        value: value
      });
    }, _this.handleChange = function (value) {
      return _this.props.onChange(value.map(rs2value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MultiSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          label = _props.label,
          value = _props.value,
          schema = _props.schema;

      var rs2value = (value || []).map(this.value2rs);
      var options = (((schema || {}).items || {}).enum || []).map(this.value2rs);

      return _react2.default.createElement(
        _FormGroup2.default,
        { controlId: id },
        _react2.default.createElement(
          _ControlLabel2.default,
          null,
          label
        ),
        _react2.default.createElement(_reactSelect2.default, {
          multi: true,
          removeSelected: true,
          value: rs2value,
          options: options,
          onChange: this.handleChange
        })
      );
    }
  }]);

  return MultiSelect;
}(_react.PureComponent), _class.propTypes = {
  value: _propTypes2.default.array,
  onChange: _propTypes2.default.func.isRequired,
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  schema: _propTypes2.default.object
}, _class.contextTypes = {
  i18n: _propTypes2.default.object.isRequired
}, _temp2);
exports.default = MultiSelect;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("@opuscapita/react-select");

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./Guards.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./Guards.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".guard-code .CodeMirror {\n  height: 200px;\n  border: 1px solid #ddd;\n}\n.guard-code .CodeMirror-empty {\n  color: #777;\n}\n.output-code .CodeMirror {\n  height: 200px;\n  border: 1px solid #ddd;\n  background: #f7f7f7;\n}\n.example-object .CodeMirror {\n  height: 440px;\n  border: 1px solid #ddd;\n}\n.guards-table {\n  vertical-align: top;\n  table-layout: fixed;\n}\n.guards-table th {\n  vertical-align: middle !important;\n}\n", ""]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionsTable = __webpack_require__(82);

var _ActionsTable2 = _interopRequireDefault(_ActionsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ActionsTable2.default;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _Table = __webpack_require__(11);

var _Table2 = _interopRequireDefault(_Table);

var _Glyphicon = __webpack_require__(14);

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _ButtonGroup = __webpack_require__(16);

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

__webpack_require__(83);

var _ActionInvocationEditor = __webpack_require__(85);

var _ActionInvocationEditor2 = _interopRequireDefault(_ActionInvocationEditor);

var _utils = __webpack_require__(2);

var _utils2 = __webpack_require__(29);

var _actionPropTypes = __webpack_require__(22);

var _actionPropTypes2 = _interopRequireDefault(_actionPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionsTable = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_PureComponent) {
  _inherits(ActionsTable, _PureComponent);

  function ActionsTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ActionsTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionsTable.__proto__ || Object.getPrototypeOf(ActionsTable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      transitionActions: _this.props.transition.actions || [],
      showEditor: false,
      currentActionIndex: null
    }, _this.onDelete = function (index) {
      return _this.setState(function (prevState) {
        return {
          transitionActions: prevState.transitionActions.filter(function (_, i) {
            return i !== index;
          })
        };
      });
    }, _this.hasUnsavedChanges = function (_) {
      var transitionActions = _this.state.transitionActions;
      var _this$props$transitio = _this.props.transition.actions,
          actions = _this$props$transitio === undefined ? [] : _this$props$transitio;


      return !(0, _isEqual2.default)(transitionActions, actions);
    }, _this.handleClose = _this._triggerDialog({
      showDialog: _this.hasUnsavedChanges,
      confirmHandler: _this.props.onClose
    }), _this.handleDelete = function (index) {
      return _this._triggerDialog({
        confirmHandler: function confirmHandler(_) {
          return _this.onDelete(index);
        },
        message: 'Do you really want to remove this action?'
      });
    }, _this.handleSave = function (_) {
      return _this.props.onSave(_this.state.transitionActions);
    }, _this.handleOpenEditor = function (index) {
      return function (_) {
        return _this.setState({
          showEditor: true,
          currentActionIndex: index
        });
      };
    }, _this.handleCloseEditor = function (_) {
      return _this.setState({
        showEditor: false,
        currentActionIndex: null
      });
    }, _this.handleSaveAction = function (index) {
      return function (action) {
        return _this.setState(function (prevState) {
          return {
            transitionActions: (0, _utils.isDef)(index) ? prevState.transitionActions.map(function (ta, i) {
              return i === index ? action : ta;
            }) : prevState.transitionActions.concat(action)
          };
        }, _this.handleCloseEditor);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActionsTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var i18n = this.context.i18n;
      var _props = this.props,
          title = _props.title,
          actions = _props.actions,
          transition = _props.transition,
          objectConfiguration = _props.objectConfiguration,
          componentsRegistry = _props.componentsRegistry;
      var _state = this.state,
          transitionActions = _state.transitionActions,
          showEditor = _state.showEditor,
          currentActionIndex = _state.currentActionIndex;


      var editorModal = void 0;

      if (showEditor) {
        var action = void 0;

        if ((0, _utils.isDef)(currentActionIndex)) {
          action = transitionActions[currentActionIndex];
        }

        editorModal = _react2.default.createElement(_ActionInvocationEditor2.default, {
          action: action,
          actions: actions,
          objectConfiguration: objectConfiguration,
          transition: transition,
          componentsRegistry: componentsRegistry,
          onClose: this.handleCloseEditor,
          onSave: this.handleSaveAction(currentActionIndex)
        });
      }

      return _react2.default.createElement(
        _Modal2.default,
        {
          show: true,
          onHide: this.handleClose,
          dialogClassName: 'oc-fsm-crud-editor--modal',
          backdrop: 'static'
        },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            null,
            title
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          null,
          _react2.default.createElement(
            'div',
            { className: 'oc-fsm-crud-editor--states-editor' },
            _react2.default.createElement(
              _Table2.default,
              { className: 'oc-fsm-crud-editor--table-actions' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    null,
                    'Name'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'Parameters'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'text-right' },
                    _react2.default.createElement(
                      _Button2.default,
                      {
                        bsSize: 'sm',
                        onClick: this.handleOpenEditor()
                      },
                      'Add'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                transitionActions.length > 0 ? transitionActions.map(function (_ref2, index) {
                  var actionName = _ref2.name,
                      _ref2$params = _ref2.params,
                      params = _ref2$params === undefined ? [] : _ref2$params;
                  return _react2.default.createElement(
                    'tr',
                    { key: actionName + '-' + index },
                    _react2.default.createElement(
                      'td',
                      { style: { paddingTop: '15px' } },
                      (0, _utils.formatLabel)(actionName)
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      params.length > 0 && _react2.default.createElement(
                        'table',
                        { className: 'oc-fsm-crud-editor--table-actions-parameters' },
                        _react2.default.createElement(
                          'tbody',
                          null,
                          params.map(function (_ref3, i) {
                            var name = _ref3.name,
                                value = _ref3.value;

                            return _react2.default.createElement(
                              'tr',
                              { key: i + '-' + name },
                              _react2.default.createElement(
                                'td',
                                null,
                                (0, _utils.formatLabel)(name)
                              ),
                              _react2.default.createElement(
                                'td',
                                { className: 'parameter-value' },
                                (0, _utils.formatArg)({
                                  i18n: i18n,
                                  schema: (0, _utils2.getParamSchema)({
                                    actions: actions,
                                    action: actionName,
                                    param: name
                                  }),
                                  value: value
                                })
                              )
                            );
                          })
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'text-right' },
                      _react2.default.createElement(
                        _ButtonGroup2.default,
                        { bsStyle: 'sm' },
                        _react2.default.createElement(
                          _Button2.default,
                          {
                            onClick: _this2.handleOpenEditor(index)
                          },
                          _react2.default.createElement(_Glyphicon2.default, { glyph: 'edit' }),
                          '\u2000',
                          'Edit'
                        ),
                        _react2.default.createElement(
                          _Button2.default,
                          {
                            onClick: _this2.handleDelete(index)
                          },
                          _react2.default.createElement(_Glyphicon2.default, { glyph: 'trash' }),
                          '\u2000',
                          'Delete'
                        )
                      )
                    )
                  );
                }) : _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { colSpan: 3, style: { textAlign: 'center' } },
                    'No actions specified for this transition. Go ahead and',
                    '\xA0',
                    _react2.default.createElement(
                      'a',
                      {
                        onClick: this.handleOpenEditor(),
                        style: { cursor: 'pointer', fontWeight: 'bold' }
                      },
                      'add new'
                    ),
                    '!'
                  )
                )
              )
            ),
            editorModal
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              bsStyle: 'primary',
              onClick: this.handleSave
            },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose },
            'Close'
          )
        )
      );
    }
  }]);

  return ActionsTable;
}(_react.PureComponent), _class2.propTypes = {
  transition: _propTypes2.default.shape({
    from: _propTypes2.default.string,
    to: _propTypes2.default.string,
    event: _propTypes2.default.string,
    actions: _propTypes2.default.arrayOf(_actionPropTypes2.default)
  }),
  actions: _propTypes2.default.objectOf(_propTypes2.default.shape({
    paramsSchema: _propTypes2.default.object
  })),
  title: _propTypes2.default.string.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  objectConfiguration: _propTypes2.default.object.isRequired,
  componentsRegistry: _propTypes2.default.objectOf(_propTypes2.default.func)
}, _class2.contextTypes = {
  i18n: _propTypes2.default.object.isRequired
}, _temp2)) || _class;

exports.default = ActionsTable;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./ActionsTable.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./ActionsTable.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".oc-fsm-crud-editor--table-actions td {\n  vertical-align: top !important;\n}\n.oc-fsm-crud-editor--table-actions {\n  table-layout: fixed;\n}\n.oc-fsm-crud-editor--table-actions .output-code .CodeMirror {\n  height: 370px;\n}\n.oc-fsm-crud-editor--table-actions .example-object .CodeMirror {\n  height: 370px;\n}\n.oc-fsm-crud-editor--table-actions-parameters {\n  table-layout: fixed;\n  width: 100%;\n}\n.oc-fsm-crud-editor--table-actions-parameters td {\n  padding: 8px 0;\n}\n.oc-fsm-crud-editor--table-actions-parameters td.parameter-value {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;
// import Glyphicon from 'react-bootstrap/lib/Glyphicon';
// import Checkbox from 'react-bootstrap/lib/Checkbox';

// import CodeEditor from '../CodeEditor';


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _find = __webpack_require__(12);

var _find2 = _interopRequireDefault(_find);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _Table = __webpack_require__(11);

var _Table2 = _interopRequireDefault(_Table);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _utils = __webpack_require__(29);

var _utils2 = __webpack_require__(2);

__webpack_require__(87);

var _ParamsEditor = __webpack_require__(27);

var _ParamsEditor2 = _interopRequireDefault(_ParamsEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionInvocationEditor = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(ActionInvocationEditor, _Component);

  function ActionInvocationEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ActionInvocationEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionInvocationEditor.__proto__ || Object.getPrototypeOf(ActionInvocationEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = _extends({
      name: '',
      params: []
    }, _this.props.action || {}, {
      exampleObject: JSON.stringify(_this.props.objectConfiguration.example, null, 2),
      invocationResults: null,
      autoplay: false,
      showExampleObject: false
    }), _this.hasUnsavedChanges = function (_) {
      var _ref2 = _this.props.action || {},
          _ref2$name = _ref2.name,
          pName = _ref2$name === undefined ? '' : _ref2$name,
          _ref2$params = _ref2.params,
          pArgs = _ref2$params === undefined ? [] : _ref2$params;

      var _this$state = _this.state,
          sName = _this$state.name,
          sArgs = _this$state.params;

      var result = !(0, _isEqual2.default)({ name: pName, params: pArgs }, { name: sName, params: sArgs });
      return result;
    }, _this.handleClose = _this._triggerDialog({
      showDialog: _this.hasUnsavedChanges,
      confirmHandler: _this.props.onClose
    }), _this.handleSelect = function (_ref3) {
      var value = _ref3.target.value;
      return _this._triggerDialog({
        showDialog: function showDialog(_) {
          var _ref4 = _this.props.action || {},
              pName = _ref4.name,
              propParams = _ref4.params;

          var _this$state2 = _this.state,
              sName = _this$state2.name,
              stateParams = _this$state2.params;


          return pName === sName ? !(0, _isEqual2.default)(propParams, stateParams) || stateParams.some(function (_ref5) {
            var name = _ref5.name,
                value = _ref5.value;
            return !(0, _find2.default)(propParams, function (_ref6) {
              var paramName = _ref6.name;
              return name === paramName;
            }) && (0, _utils2.isDef)(value);
          }) : stateParams.some(function (_ref7) {
            var value = _ref7.value;
            return (0, _utils2.isDef)(value);
          });
        },
        confirmHandler: function confirmHandler(_) {
          return _this.setState(function (prevState) {
            return {
              name: value,
              params: value ? value === (_this.props.action || {}).name ? (_this.props.action || {}).params || [] : Object.keys((_this.props.actions[value].paramsSchema || {}).properties || {}).map(function (name) {
                return { name: name };
              }) : []
            };
          }, _this.state.autoplay && _this.handleInvoke);
        }
      })(value);
    }, _this.handleChangeParam = function (param) {
      return function (value) {
        return _this.setState(function (prevState) {
          return {
            params:
            // either change existing param or add a new one
            function (params) {
              return (0, _find2.default)(params, function (_ref8) {
                var name = _ref8.name;
                return name === param;
              }) ? params : params.concat({ name: param });
            }(prevState.params).map(function (_ref9) {
              var name = _ref9.name,
                  rest = _objectWithoutProperties(_ref9, ['name']);

              return _extends({
                name: name
              }, rest, param === name && {
                value: (_this.getParamSchema(param) || {}).type === 'boolean' ? // toggle boolean values
                !((0, _find2.default)(prevState.params, function (_ref10) {
                  var n = _ref10.name;
                  return n === name;
                }) || {}).value : value
              });
            })
          };
        }, _this.state.autoplay && _this.handleInvoke);
      };
    }, _this.handleSave = function (_) {
      return _this.props.onSave({
        name: _this.state.name,
        params: _this.state.params.filter(function (_ref11) {
          var value = _ref11.value;
          return Array.isArray(value) ? value.length : (0, _utils2.isDef)(value);
        })
      });
    }, _this.handleChangeObject = function (value) {
      try {
        JSON.parse(value);

        _this.setState(function (prevState) {
          return {
            exampleObject: value,
            exampleObjectError: null
          };
        }, _this.state.autoplay && _this.handleInvoke);
      } catch (err) {
        _this.setState({
          exampleObject: value,
          exampleObjectError: err.message
        });
      }
    }, _this.handleInvoke = function (_) {
      var _this$state3 = _this.state,
          exampleObject = _this$state3.exampleObject,
          name = _this$state3.name,
          params = _this$state3.params;


      if (!name) {
        return;
      }

      var _this$props$transitio = _this.props.transition,
          from = _this$props$transitio.from,
          to = _this$props$transitio.to,
          event = _this$props$transitio.event;


      var commonArgs = {
        object: JSON.parse(exampleObject),
        from: from,
        to: to,
        event: event
      };

      _this.setState({
        invocationResults: (0, _utils.invokeAction)(name, params, commonArgs)
      });
    }, _this.handleToggleAutoplay = function (_) {
      return _this.setState(function (prevState) {
        return {
          autoplay: !prevState.autoplay
        };
      }, function (_) {
        var autoplay = _this.state.autoplay;

        if (autoplay) {
          _this.handleInvoke();
        }
      });
    }, _this.getParamValue = function (name) {
      return ((0, _find2.default)(_this.state.params, function (_ref12) {
        var paramName = _ref12.name;
        return paramName === name;
      }) || {}).value;
    }, _this.getParamSchema = function (param) {
      return (0, _utils.getParamSchema)({
        actions: _this.props.actions,
        action: _this.state.name,
        param: param
      });
    }, _this.handleObjectVisibility = function (_) {
      return _this.setState(function (prevState) {
        return {
          showExampleObject: !prevState.showExampleObject
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActionInvocationEditor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          actions = _props.actions,
          componentsRegistry = _props.componentsRegistry;
      var actionName = this.state.name;


      return _react2.default.createElement(
        _Modal2.default,
        {
          show: true,
          onHide: this.handleClose,
          dialogClassName: 'oc-fsm-crud-editor--modal',
          backdrop: 'static'
        },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            null,
            'Action invocation'
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          { style: { paddingBottom: 0 } },
          _react2.default.createElement(
            _Table2.default,
            { className: 'oc-fsm-crud-editor--table-actions' },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  null,
                  _react2.default.createElement(
                    'div',
                    { className: 'oc-fsm-crud-editor--modal-heading' },
                    _react2.default.createElement(
                      'div',
                      { className: 'output-heading' },
                      _react2.default.createElement(
                        'b',
                        null,
                        'Choose action'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'right-block' },
                        _react2.default.createElement(
                          _FormControl2.default,
                          {
                            componentClass: 'select',
                            value: actionName || '',
                            onChange: this.handleSelect
                          },
                          _react2.default.createElement('option', { value: '' }),
                          Object.keys(actions).map(function (name, i) {
                            return _react2.default.createElement(
                              'option',
                              { key: i + '-' + name, value: name },
                              (0, _utils2.formatLabel)(name)
                            );
                          })
                        )
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  actions[actionName] && _react2.default.createElement(_ParamsEditor2.default, {
                    paramsSchema: actions[actionName].paramsSchema,
                    values: Object.keys(actions[actionName].paramsSchema.properties).reduce(function (acc, cur) {
                      return _extends({}, acc, _defineProperty({}, cur, _this2.getParamValue(cur)));
                    }, {}),
                    onChangeParam: this.handleChangeParam,
                    componentsRegistry: componentsRegistry
                  })
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              bsStyle: 'primary',
              onClick: this.handleSave,
              disabled: !actionName
            },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose },
            'Close'
          )
        )
      );
    }
  }]);

  return ActionInvocationEditor;
}(_react.Component), _class2.propTypes = {
  action: _propTypes2.default.object,
  actions: _propTypes2.default.objectOf(_propTypes2.default.shape({
    paramsSchema: _propTypes2.default.object
  })),
  transition: _propTypes2.default.shape({
    from: _propTypes2.default.string,
    to: _propTypes2.default.string,
    event: _propTypes2.default.string
  }),
  onClose: _propTypes2.default.func.isRequired,
  objectConfiguration: _propTypes2.default.object.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  componentsRegistry: _propTypes2.default.objectOf(_propTypes2.default.func)
}, _temp2)) || _class;

exports.default = ActionInvocationEditor;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./ActionInvocationEditor.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./ActionInvocationEditor.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".oc-fsm-crud-editor--modal-actions-object {\n  height: 0;\n  opacity: 0;\n  -webkit-transition: all 0.1s ease-in-out;\n  transition: all 0.1s ease-in-out;\n}\n.oc-fsm-crud-editor--modal-actions-object.visible-object {\n  height: 200px;\n  opacity: 1;\n  -webkit-transition: all 0.1s ease-in-out;\n  transition: all 0.1s ease-in-out;\n}\n.oc-fsm-crud-editor--modal-actions-object .CodeMirror {\n  height: 200px;\n  border: 1px solid #ddd;\n}\n.oc-fsm-crud-editor--modal-actions-results .CodeMirror {\n  height: 200px;\n  border: 1px solid #ddd;\n  background: #f7f7f7;\n}\n", ""]);

// exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pick = __webpack_require__(90);

var _pick2 = _interopRequireDefault(_pick);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Button = __webpack_require__(3);

var _Button2 = _interopRequireDefault(_Button);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

var _FormControl = __webpack_require__(4);

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormGroup = __webpack_require__(10);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = __webpack_require__(13);

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _ConfirmDialog = __webpack_require__(6);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransitionEditor = (0, _ConfirmDialog2.default)(_class = (_temp2 = _class2 = function (_PureComponent) {
  _inherits(TransitionEditor, _PureComponent);

  function TransitionEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TransitionEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TransitionEditor.__proto__ || Object.getPrototypeOf(TransitionEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = _extends({
      event: '',
      from: '',
      to: ''
    }, _this.props.transition || {}, {
      isCreating: !_this.props.transition
    }), _this.handleChangeField = function (field) {
      return function (_ref2) {
        var value = _ref2.target.value;
        return _this.setState(_defineProperty({}, field, value));
      };
    }, _this.handleSave = function (_) {
      var _this$state = _this.state,
          event = _this$state.event,
          from = _this$state.from,
          to = _this$state.to;
      var index = _this.props.index;


      var result = {
        event: event,
        from: from,
        to: to,
        index: index
      };

      _this.props.onSave(result);
    }, _this.hasUnsavedChanges = function (_) {
      var transition = _this.props.transition;


      var initialTransition = (0, _pick2.default)(transition, ['event', 'from', 'to']);

      var _this$state2 = _this.state,
          event = _this$state2.event,
          from = _this$state2.from,
          to = _this$state2.to;


      return transition ? !(0, _isEqual2.default)(initialTransition, { event: event, from: from, to: to }) : event || from || to;
    }, _this.handleClose = _this._triggerDialog({
      showDialog: _this.hasUnsavedChanges,
      confirmHandler: _this.props.onClose
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TransitionEditor, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          states = _props.states,
          getStateLabel = _props.getStateLabel;
      var _state = this.state,
          from = _state.from,
          to = _state.to,
          event = _state.event,
          isCreating = _state.isCreating;


      return _react2.default.createElement(
        _Modal2.default,
        {
          show: true,
          onHide: this.handleClose,
          dialogClassName: 'oc-fsm-crud-editor--modal',
          backdrop: 'static'
        },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            null,
            isCreating ? 'Add new transition' : 'Edit transition'
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          null,
          _react2.default.createElement(
            _FormGroup2.default,
            { controlId: 'transitionEvent' },
            _react2.default.createElement(
              _ControlLabel2.default,
              null,
              'Event'
            ),
            _react2.default.createElement(_FormControl2.default, {
              placeholder: 'Enter event name',
              type: 'text',
              value: event,
              onChange: this.handleChangeField('event')
            })
          ),
          _react2.default.createElement(
            _FormGroup2.default,
            { controlId: 'transitionFrom' },
            _react2.default.createElement(
              _ControlLabel2.default,
              null,
              'From'
            ),
            _react2.default.createElement(
              _FormControl2.default,
              {
                componentClass: 'select',
                placeholder: 'Select \'from\' state',
                value: from,
                onChange: this.handleChangeField('from')
              },
              (from ? [] : ['']).concat(states).map(function (state, i) {
                return _react2.default.createElement(
                  'option',
                  { value: state, key: state + '-' + i },
                  getStateLabel(state)
                );
              })
            )
          ),
          _react2.default.createElement(
            _FormGroup2.default,
            { controlId: 'transitionTo' },
            _react2.default.createElement(
              _ControlLabel2.default,
              null,
              'To'
            ),
            _react2.default.createElement(
              _FormControl2.default,
              {
                componentClass: 'select',
                placeholder: 'Select \'to\' state',
                value: to,
                onChange: this.handleChangeField('to')
              },
              (to ? [] : ['']).concat(states).map(function (state, i) {
                return _react2.default.createElement(
                  'option',
                  { value: state, key: state + '-' + i },
                  getStateLabel(state)
                );
              })
            )
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              bsStyle: 'primary',
              onClick: this.handleSave,
              disabled: !(from && to && event)
            },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose },
            'Close'
          )
        )
      );
    }
  }]);

  return TransitionEditor;
}(_react.PureComponent), _class2.propTypes = {
  transition: _propTypes2.default.shape({
    from: _propTypes2.default.string,
    to: _propTypes2.default.string,
    event: _propTypes2.default.string
  }),
  onClose: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  index: _propTypes2.default.number,
  states: _propTypes2.default.arrayOf(_propTypes2.default.string),
  getStateLabel: _propTypes2.default.func.isRequired
}, _temp2)) || _class;

exports.default = TransitionEditor;

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("lodash/pick");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EditorOutput;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _WorkflowGraph = __webpack_require__(92);

var _WorkflowGraph2 = _interopRequireDefault(_WorkflowGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EditorOutput(_ref) {
  var schema = _ref.schema,
      getStateLabel = _ref.getStateLabel,
      createJsonOutput = _ref.createJsonOutput;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'Schema'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is a temporary solution for FSM visualization.'
    ),
    _react2.default.createElement(
      'div',
      { className: 'oc-fsm-crud-editor--workflow-editor__tab' },
      _react2.default.createElement(_WorkflowGraph2.default, { schema: schema, getStateLabel: getStateLabel })
    )
  );
}

EditorOutput.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  getStateLabel: _propTypes2.default.func.isRequired,
  createJsonOutput: _propTypes2.default.func.isRequired
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WorkflowGraph = __webpack_require__(93);

var _WorkflowGraph2 = _interopRequireDefault(_WorkflowGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _WorkflowGraph2.default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _viz = __webpack_require__(94);

var _viz2 = _interopRequireDefault(_viz);

var _isEqual = __webpack_require__(5);

var _isEqual2 = _interopRequireDefault(_isEqual);

__webpack_require__(95);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  schema: _propTypes2.default.object,
  getStateLabel: _propTypes2.default.func.isRequired
};

var defaultProps = {
  schema: null
};

var WorkflowGraph = function (_Component) {
  _inherits(WorkflowGraph, _Component);

  function WorkflowGraph(props) {
    _classCallCheck(this, WorkflowGraph);

    var _this = _possibleConstructorReturn(this, (WorkflowGraph.__proto__ || Object.getPrototypeOf(WorkflowGraph)).call(this, props));

    _this.renderGraph = function (schema) {
      var vizSrc = _this.convertSchemaToDotLang(schema);
      _this.setState({
        svg: (0, _viz2.default)(vizSrc, { format: "svg", engine: "dot", totalMemory: 16777216 })
      });
    };

    _this.state = {
      svg: ''
    };
    return _this;
  }

  _createClass(WorkflowGraph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderGraph(this.props.schema);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(this.props.schema, nextProps.schema)) {
        this.renderGraph(nextProps.schema);
      }
    }
  }, {
    key: 'convertSchemaToDotLang',
    value: function convertSchemaToDotLang(schema) {
      // DOT language used by graphviz: https://graphviz.gitlab.io/_pages/doc/info/lang.html
      var transitions = schema.transitions,
          initialState = schema.initialState,
          finalStates = schema.finalStates;
      var getStateLabel = this.props.getStateLabel;


      var src = '';
      src += 'digraph finite_state_machine {\n';
      src += '\trankdir=LR;\n';
      src += '\tedge [fontname="Helvetica"];\n';
      // eslint-disable-next-line max-len
      src += '\tnode [shape = rect fillcolor="#b71c1c" margin="0.2,0.1" color="transparent" fontname="Helvetica" style="rounded,filled"];\n';
      src += '\t' + finalStates.map(function (state) {
        return '"' + getStateLabel(state) + '"';
      }).join(' ') + '\n';
      src += '\tnode [fillcolor="#14892c"];\n';
      src = initialState ? src + ('\t"' + getStateLabel(initialState) + '"\n') : src;
      src += '\tnode [fillcolor="#0277bd"];\n';
      src += transitions.filter(function (_ref) {
        var from = _ref.from,
            to = _ref.to,
            event = _ref.event;
        return from && to && event;
      }).map(function (_ref2) {
        var from = _ref2.from,
            to = _ref2.to,
            event = _ref2.event;
        return '\t"' + getStateLabel(from) + '" -> "' + getStateLabel(to) + '" [label = "' + event + '"];';
      }).join('\n');
      src += '}';

      return src;
    }
  }, {
    key: 'render',
    value: function render() {
      var schema = this.props.schema;


      if (!schema) {
        return _react2.default.createElement(
          'div',
          { className: 'oc-fsm-crud-editor--workflow-graph' },
          _react2.default.createElement(
            'h4',
            null,
            'Nothing to visualize'
          )
        );
      }

      var svg = this.state.svg;


      return _react2.default.createElement(
        'div',
        {
          className: 'oc-fsm-crud-editor--workflow-graph'
        },
        _react2.default.createElement('div', {
          dangerouslySetInnerHTML: { __html: svg }
        }),
        _react2.default.createElement(
          'div',
          { className: 'oc-fsm-crud-editor--workflow-graph__legend' },
          _react2.default.createElement(
            'div',
            { className: 'oc-fsm-crud-editor--workflow-graph__legend-item' },
            _react2.default.createElement('div', {
              className: '\n                oc-fsm-crud-editor--workflow-graph__legend-item-badge\n                oc-fsm-crud-editor--workflow-graph__legend-item-badge--regular-state\n              '
            }),
            _react2.default.createElement(
              'div',
              null,
              '\u2014 regular state nodes'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'oc-fsm-crud-editor--workflow-graph__legend-item' },
            _react2.default.createElement('div', {
              className: '\n                oc-fsm-crud-editor--workflow-graph__legend-item-badge\n                oc-fsm-crud-editor--workflow-graph__legend-item-badge--initial-state\n              '
            }),
            _react2.default.createElement(
              'div',
              null,
              '\u2014 initial state nodes'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'oc-fsm-crud-editor--workflow-graph__legend-item' },
            _react2.default.createElement('div', {
              className: '\n                oc-fsm-crud-editor--workflow-graph__legend-item-badge\n                oc-fsm-crud-editor--workflow-graph__legend-item-badge--final-state\n              '
            }),
            _react2.default.createElement(
              'div',
              null,
              '\u2014 final state nodes'
            )
          )
        )
      );
    }
  }]);

  return WorkflowGraph;
}(_react.Component);

exports.default = WorkflowGraph;


WorkflowGraph.propTypes = propTypes;
WorkflowGraph.defaultProps = defaultProps;

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("viz.js");

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./WorkflowGraph.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./WorkflowGraph.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".oc-fsm-crud-editor--workflow-graph {\n  background-size: 10px 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n}\n.oc-fsm-crud-editor--workflow-graph svg {\n  -webkit-transform: scale(0.6);\n  transform: scale(0.6);\n}\n.oc-fsm-crud-editor--workflow-graph text {\n  fill: #333;\n}\n.oc-fsm-crud-editor--workflow-graph .node text {\n  fill: #fff;\n}\n.oc-fsm-crud-editor--workflow-graph__legend {\n  position: absolute;\n  bottom: 24px;\n  right: 40px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  z-index: 10;\n}\n.oc-fsm-crud-editor--workflow-graph__legend-item {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.oc-fsm-crud-editor--workflow-graph__legend-item-badge {\n  width: 24px;\n  height: 16px;\n  border-radius: 6px;\n  margin-right: 4px;\n}\n.oc-fsm-crud-editor--workflow-graph__legend-item-badge--regular-state {\n  background: #0277bd;\n}\n.oc-fsm-crud-editor--workflow-graph__legend-item-badge--initial-state {\n  background: #14892c;\n}\n.oc-fsm-crud-editor--workflow-graph__legend-item-badge--final-state {\n  background: #b71c1c;\n}\n", ""]);

// exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./styles.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-3!./styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".oc-fsm-crud-editor--table {\n  table-layout: fixed;\n}\n.oc-fsm-crud-editor--table td {\n  vertical-align: middle !important;\n}\n.oc-fsm-crud-editor--workflow-editor__tab {\n  height: 480px;\n  overflow: auto;\n  border: 1px solid #ddd;\n  border-top: none;\n}\n.oc-fsm-crud-editor--modal {\n  width: 90%;\n}\n.oc-fsm-crud-editor--modal-heading.with-padding {\n  padding: 10px 0 10px;\n}\n.oc-fsm-crud-editor--modal-heading .output-heading {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n.oc-fsm-crud-editor--modal-heading .output-heading .right-block {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  min-width: 100px;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n", ""]);

// exports


/***/ })
/******/ ]);
});