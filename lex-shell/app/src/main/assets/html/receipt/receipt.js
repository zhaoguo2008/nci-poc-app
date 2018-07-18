/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var serverUrl = 'http://47.104.13.159/boot';

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

        _this.state = {
            images: [],
            searchInputting: false,
            searchText: '',
            products: [],
            apiInstance: ''
        };
        return _this;
    }

    _createClass(Main, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.MF && MF.setTitle("保单签收回执");
        }
    }, {
        key: 'testPopupDialog1',
        value: function testPopupDialog1(id, isT) {
            // var oHead = document.getElementsByTagName('HEAD').item(0);
            // var oScript= document.createElement("script");
            // oScript.type = "text/javascript";
            // oScript.src="qianming.js";
            // oHead.appendChild( oScript);
            sessionStorage.clear('ist');
            sessionStorage.setItem('ist', isT);
            testPopupDialog(id);
        }
    }, {
        key: 'submit',
        value: function submit() {
            console.log("提交");
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'home-container' },
                React.createElement(
                    'div',
                    { id: 'other' },
                    React.createElement(
                        'div',
                        { className: 'receipt-header' },
                        '\u4FDD\u9669\u5355\u7B7E\u6536\u56DE\u6267'
                    ),
                    React.createElement(
                        'div',
                        { className: 'receipt-block1' },
                        React.createElement(
                            'div',
                            { className: 'left-list' },
                            React.createElement(
                                'h1',
                                null,
                                'UN004'
                            ),
                            React.createElement(
                                'ul',
                                null,
                                React.createElement(
                                    'li',
                                    null,
                                    '\u4FDD\u5355\u53F7\uFF1A880001100003'
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    '\u5212\u6B3E\u534F\u8BAE\u4E66\u53F7\uFF1A99992014103006'
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    '\u9500\u552E\u673A\u6784\u53F7\uFF1A0102120006'
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    '\u4E1A\u52A1\u5458\uFF1A\u5F20\u6D77\u5BBE 36272261'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'right-box' },
                            '\u4E3A\u786E\u4FDD\u60A8\u7684\u4FDD\u5355\u6743\u76CA\uFF0C\u8BF7\u53CA\u65F6\u62E8\u6253\u672C\u516C\u53F8\u670D\u52A1\u7535\u8BDD95567\u3001\u767B\u9646\u7F51\u7AD9 http://www.newchinalife.com\uFF0C \u6216\u5230\u516C\u53F8\u5BA2\u670D\u4E2D\u5FC3\u8FDB\u884C\u67E5\u8BE2\uFF0C\u6838\u5B9E\u4FDD\u5355\u4FE1\u606F\u3002'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'receipt-block2' },
                        React.createElement(
                            'h1',
                            null,
                            '188\u6295\u4FDD\u5148\u751F\uFF1A'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u3000\u3000\u975E\u5E38\u611F\u8C22\u60A8\u9009\u62E9\u6211\u516C\u53F8\u4E3A\u60A8\u63D0\u4F9B\u4EBA\u751F\u65C5\u9014\u7684\u98CE\u9669\u4FDD\u969C\uFF0C\u4E3A\u52A0\u5F3A\u4E0E\u60A8\u7684\u6C9F\u901A\uFF0C\u4F7F\u6211\u516C\u53F8\u80FD\u591F\u4E3A\u60A8\u63D0\u4F9B\u66F4\u4E3A\u4F18\u8D28\u7684\u670D\u52A1\uFF0C\u8BF7\u60A8\u5728\u6536\u5230\u6B63\u5F0F\u4FDD\u9669\u5408\u540C\u540E\u8BA4\u771F\u6838\u5BF9\u5E76\u5C31\u4EE5\u4E0B\u5185\u5BB9\u4E88\u4EE5\u786E\u8BA4\uFF0C\u5E76\u5728\u201C\u6295\u4FDD\u4EBA\u7B7E\u540D\u201D\u5904\u7B7E\u5B57\u540E\u4EA4\u4E1A\u52A1\u4EBA\u5458\u8FD4\u8FD8\u6211\u516C\u53F8\u3002\u8C22\u8C22\u60A8\u7684\u5408\u4F5C\uFF01'
                        ),
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'span',
                                    { className: 'num' },
                                    '1.'
                                ),
                                '\u5DF2\u6536\u5230\u4FDD\u9669\u5355\u53CA\u6536\u636E\uFF0C\u5E76\u4EB2\u7B14\u7B7E\u6536\u672C\u56DE\u6267\u3002'
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'span',
                                    { className: 'num' },
                                    '2.'
                                ),
                                '\u5DF2\u786E\u8BA4\u4FDD\u5355\u518C\u7684\u6750\u6599\u9F50\u5168\uFF0C\u6295\u4FDD\u4EBA\u3001\u88AB\u4FDD\u9669\u4EBA\u3001\u53D7\u76CA\u4EBA\u3001\u6295\u4FDD\u4EA7\u54C1\u3001\u4EA4\u8D39\u91D1\u989D\u53CA\u671F\u95F4\u7B49\u4FE1\u606F\u65E0\u8BEF\uFF0C \u6295\u4FDD\u4E66\u5F71\u50CF\u4EF6\u4E2D\u5404\u9879\u544A\u77E5\u4E0E\u5B9E\u9645\u60C5\u51B5\u76F8\u7B26\u3002'
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'span',
                                    { className: 'num' },
                                    '3.'
                                ),
                                '\u5DF2\u6E05\u695A\u4E86\u89E3\u6240\u6295\u4FDD\u4EA7\u54C1\u7684\u4FDD\u9669\u8D23\u4EFB\u53CA\u8D23\u4EFB\u514D\u9664\u3002'
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'span',
                                    { className: 'num' },
                                    '4.'
                                ),
                                '\u5DF2\u8BA4\u771F\u9605\u8BFB\u4E86\u6709\u5173\u6240\u6295\u4FDD\u4EA7\u54C1\u7684\u4FDD\u9669\u6761\u6B3E\u3001\u4EA7\u54C1\u8BF4\u660E\u548C\u6295\u4FDD\u63D0\u793A\u7B49\u8BF4\u660E\u6750\u6599\u3002'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'receipt-block3' },
                        React.createElement(
                            'h1',
                            null,
                            '\u7279\u522B\u63D0\u793A\uFF1A'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u3000\u3000\u975E\u5E38\u611F\u8C22\u60A8\u9009\u62E9\u6211\u516C\u53F8\u4E3A\u60A8\u63D0\u4F9B\u4EBA\u751F\u65C5\u9014\u7684\u98CE\u9669\u4FDD\u969C\uFF0C\u4E3A\u52A0\u5F3A\u4E0E\u60A8\u7684\u6C9F\u901A\uFF0C\u4F7F\u6211\u516C\u53F8\u80FD\u591F\u4E3A\u60A8\u63D0\u4F9B\u66F4\u4E3A\u4F18\u8D28\u7684\u670D\u52A1\uFF0C\u8BF7\u60A8\u5728\u6536\u5230\u6B63\u5F0F\u4FDD\u9669\u5408\u540C\u540E\u8BA4\u771F\u6838\u5BF9\u5E76\u5C31\u4EE5\u4E0B\u5185\u5BB9\u4E88\u4EE5\u786E\u8BA4\uFF0C\u5E76\u5728\u201C\u6295\u4FDD\u4EBA\u7B7E\u540D\u201D\u5904\u7B7E\u5B57\u540E\u4EA4\u4E1A\u52A1\u4EBA\u5458\u8FD4\u8FD8\u6211\u516C\u53F8\u3002\u8C22\u8C22\u60A8\u7684\u5408\u4F5C\uFF01'
                        ),
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                { className: 'item' },
                                React.createElement(
                                    'span',
                                    { className: 'num' },
                                    '1.'
                                ),
                                '\u5728\u60A8\u6536\u5230\u4FDD\u9669\u5355\u5E76\u4E66\u9762\u7B7E\u6536\u672C\u300A\u4FDD\u9669\u5355\u7B7E\u6536\u56DE\u6267\u300B\u4E4B\u65E5\u8D77\u5341\u65E5\u7684\u671F\u95F4\u4E3A\u72B9\u8C6B\u671F\u3002\u5982\u679C\u60A8\u5728\u6B64\u671F\u95F4\u5185\u9000\u4FDD\uFF0C\u6211\u516C\u53F8\u5C06\u5728\u6263\u9664\u4E00\u5B9A\u5DE5\u672C\u8D39\u540E\u5C06\u5B9E\u9645\u4EA4\u7EB3\u7684\u4FDD\u9669\u8D39\u9000\u8FD8\u7ED9\u60A8\uFF0C\u4FDD\u9669\u5408\u540C\u7EC8\u6B62\uFF1B\u5982\u679C\u5728\u6B64\u671F\u95F4\u540E\u9000\u4FDD\uFF0C\u6211\u516C\u53F8\u5C06\u9000\u8FD8\u60A8\u4FDD\u9669\u5355\u7684\u73B0\u91D1\u4EF7\u503C\uFF0C\u4FDD\u9669\u5408\u540C\u7EC8\u6B62\u3002'
                            ),
                            React.createElement(
                                'li',
                                { className: 'item' },
                                React.createElement(
                                    'span',
                                    { className: 'num' },
                                    '2.'
                                ),
                                '\u6839\u636E\u4FDD\u76D1\u4F1A\u7684\u8981\u6C42\uFF0C\u4E3A\u4E86\u4FDD\u969C\u60A8\u7684\u6743\u76CA\uFF0C\u6211\u516C\u53F8\u5728\u60A8\u7B7E\u6536\u4FDD\u9669\u5355\u56DE\u6267\u540E\u5C06\u5B89\u6392\u5BA2\u670D\u4EBA\u5458\u5BF9\u60A8\u8FDB\u884C\u7535\u8BDD\u56DE\u8BBF\uFF0C\u8BF7\u60A8\u6CE8\u610F\u63A5\u542C\u3002'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u4E3A\u4FDD\u6301\u4E0E\u60A8\u7684\u826F\u597D\u6C9F\u901A\uFF0C\u63D0\u4F9B\u4FBF\u6377\u7684\u540E\u7EED\u670D\u52A1\uFF0C\u8BF7\u60A8\u518D\u6B21\u6838\u5BF9\u4EE5\u4E0B\u4FE1\u606F\u662F\u5426\u6B63\u786E\uFF1A'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u6295\u4FDD\u4EBA\uFF1A'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u8054\u7CFB\u7535\u8BDD\uFF1A13652632521\u3000\u3000\u3000\u7EED\u671F\u5212\u6B3E\u8D26\u53F7\uFF1A600100000000000'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u901A\u8BAF\u5730\u5740\uFF1A\u5317\u4EAC\u5E02\u4E1C\u57CE\u533A\u662F\u7684\u5E7F\u6CDB\u5730\u9B3C\u5730\u65B9\u4E2A\uFF08110000\uFF09'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u25A1 \u53D8\u66F4\u5730\u5740\u53CA\u90AE\u7F16\uFF1A'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u25A1 \u53D8\u66F4\u8054\u7CFB\u7535\u8BDD\uFF1A'
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u25A1 \u53D8\u66F4\u4EA4\u8D39\u5F62\u5F0F\uFF08\u5982\u9700\u53D8\u66F4\u6B64\u9879\uFF0C\u8BF7\u60A8\u63D0\u4F9B\u5B58\u6298\u3001\u8EAB\u4EFD\u8BC1\u7684\u590D\u5370\u4EF6\uFF09'
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'form',
                                    { name: 'from1' },
                                    React.createElement('input', { type: 'radio', value: '\u5BA2\u6237\u81EA\u4EA4', name: 'chose', style: { width: "20px", height: '20px' } }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u5BA2\u6237\u81EA\u4EA4'
                                    ),
                                    React.createElement('input', { type: 'radio', value: '\u4E0A\u95E8\u6536\u53D6', name: 'chose', style: { width: "20px", height: '20px' } }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u4E0A\u95E8\u6536\u53D6'
                                    ),
                                    React.createElement('input', { type: 'radio', value: '\u59D4\u6258\u94F6\u884C\u8F6C\u8D26', name: 'chose', style: { width: "20px", height: '20px' } }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u59D4\u6258\u94F6\u884C\u8F6C\u8D26'
                                    )
                                )
                            ),
                            React.createElement(
                                'li',
                                { className: 'line' },
                                '\u6237\u540D\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    'Davie'
                                ),
                                '\u3000\u3000\u5F00\u6237\u94F6\u884C\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '\u5317\u4EAC\u94F6\u884C'
                                )
                            ),
                            React.createElement(
                                'li',
                                { className: 'line' },
                                '\u8D26\u53F7\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '600100000000000'
                                )
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u3000\u3000\u58F0\u660E\uFF1A\u6295\u4FDD\u4EBA\u540C\u610F\u59D4\u6258   \uFF08\u8EAB\u4EFD\u8BC1\u53F7\u7801\uFF1A130199009098877     \uFF09\u529E\u7406\u4E0A\u8FF0\u4FE1\u606F\u53D8\u66F4\uFF0C\u5E76\u540C\u610F\u65B0\u534E\u4EBA\u5BFF\u4FDD\u9669\u80A1\u4EFD\u6709\u9650\u516C\u53F8\u5C06\u7EED\u671F\u4FDD\u8D39\u6216\u4FDD\u5168\u4FDD\u8D39\u4ECE\u6295\u4FDD\u4EBA\u6307\u5B9A\u7684\u6D3B\u671F\u50A8\u84C4\u5B58\u6B3E\u8D26\u6237\u5212\u81F3\u65B0\u534E\u4EBA\u5BFF\u4FDD\u9669\u80A1\u4EFD\u6709\u9650\u516C\u53F8\u94F6\u884C\u5B58\u6B3E\u8D26\u6237\u3002'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u3000\u3000\u4E3A\u786E\u4FDD\u60A8\u7684\u57FA\u672C\u4FE1\u606F\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u516C\u53F8\u80FD\u53CA\u65F6\u548C\u60A8\u53D6\u5F97\u8054\u7CFB\uFF0C\u9001\u8FBE\u7EED\u671F\u4EA4\u8D39\u51ED\u8BC1\u3001\u5206\u7EA2\u4E1A\u7EE9\u62A5\u544A\u4E66\u7B49\u91CD\u8981\u8D44\u6599\uFF0C\u8BF7\u586B\u5199\u60A8\u6700\u4FE1\u8D56\u7684\u6216\u6700\u6709\u7231\u5FC3\u548C\u8D23\u4EFB\u5FC3\u7684\u4E24\u4F4D\u4EB2\u53CB\u7684\u4FE1\u606F\uFF1A'
                        ),
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                '\u59D3\u540D\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    'friend1'
                                ),
                                '   \u6027\u522B\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '\u7537'
                                ),
                                '  \u5E74\u9F84\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '25'
                                ),
                                '     \u7535\u8BDD\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '13333333333'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                '\u59D3\u540D\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    'friend2'
                                ),
                                '   \u6027\u522B\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '\u5973'
                                ),
                                '  \u5E74\u9F84\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '36'
                                ),
                                '     \u7535\u8BDD\uFF1A',
                                React.createElement(
                                    'b',
                                    null,
                                    '13344445555'
                                )
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u3000\u3000\u518D\u6B21\u611F\u8C22\u60A8\u7684\u652F\u6301\uFF01\u82E5\u60A8\u7684\u5730\u5740\u3001\u7535\u8BDD\u3001\u90AE\u7F16\u7B49\u53D1\u751F\u53D8\u66F4\u6216\u6709\u4EFB\u4F55\u7591\u95EE\u548C\u5EFA\u8BAE\uFF0C\u8BF7\u968F\u65F6\u62E8\u6253\u6211\u516C\u53F8\u7684\u670D\u52A1\u70ED\u7EBF 95567\uFF0C\u6211\u4EEC\u5C06\u4EE5\u6700\u4E3A\u4F18\u8D28\u7684\u670D\u52A1\u6765\u7B54\u8C22\u60A8\u7684\u4FE1\u4EFB\uFF01'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u3000\u3000\u795D\u60A8\u5DE5\u4F5C\u987A\u5229\u3001\u8EAB\u4F53\u5065\u5EB7\u3001\u4E07\u4E8B\u5982\u610F\uFF01'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'receipt-block4' },
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                '\u6295\u4FDD\u4EBA\u7B7E\u540D\uFF1A',
                                React.createElement('img', { id: 'xss_20', src: 'data:image/gif;base64,R0lGODlhhwBIAJECAL6+vtHR0f///wAAACH5BAEAAAIALAAAAACHAEgAAAL/jI+py+0Po5y02ouz3rz7Dx7CSJbmiabqyrbuC6NLTNf2jddKzvf+r9oBh8TiS2hMKo3IpfOJa0KnVJa0is0Krtruk+sNMxPi8hJsTufQ6jaN7Y634PK6jGzPu+j6PL9f9wcYJzjYVmiYhphYtngCAMkDUDOJEklzCeRokolTCdNZEuoyyrPJaRnz+dL5uSrwahnbcyr6WJoyuwLJywvb28sCPKw7hyc5THmbOxLryqqCu3ecU3xLTBz9TLIqza3rbYzgYw1t3jw5Wo4bLi7S81qeSor6+yhszylvRQ2KDYyJnixYqr6J2sdvnLJdC+dp40YqnkFa/c4xu/YvY7FQ7O1yIZymMCBDkST1fUQ3xNG6kfVsacv4KxizjjFU4nvYcqI+f8I00jSh0ucuZ/d2FnXZwle0GzaH4kQKkSXBgz3zXdRR8Ym6o0tRepXlytrJEovAQTV6dqrTZlFZiWWaVWorqstysk0aday3sSQQSdSplm7afUTTonX4Jq7HnK1mZcsG1ifAlzBtCNra9QZfzZvdGWCUqBZoLKJHUyltGgrq1E5Ws1bi+vWYkLIJKa4tJjZuTbd3d9HtmyLt4I16E68C/Djc4cp/G2/+5Tn0M9KnJ0lu/Uj17ERmcEceIrz48eTLmz+PPr368gUAADs=', onClick: this.testPopupDialog1.bind(this, 20, 0) }),
                                React.createElement('br', null),
                                '\u7B7E\u6536\u65E5\u671F\uFF1A'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'receipt-block5' },
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'span',
                                    null,
                                    '\u4FDD\u5355\u53F7\uFF1A880001100003'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    '\u4E1A\u52A1\u5458\u59D3\u540D\uFF1A\u5F20\u6D77\u5BBE'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    '\u56DE\u5355\u65E5\u671F\uFF1A2018-05-22'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'span',
                                    null,
                                    '\u6295\u4FDD\u4EBA\uFF1A188\u6295\u4FDD'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    '\u4E1A\u52A1\u5458\u5DE5\u53F7\uFF1A36272261'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    ' '
                                )
                            )
                        )
                    ),
                    React.createElement('div', { className: 'receipt-aside' }),
                    React.createElement(
                        'div',
                        { className: 'p-content' },
                        this.state.products.map(function (prod) {
                            return React.createElement(
                                'a',
                                { className: 'prod-item' },
                                React.createElement('img', { src: prod.logo ? serverUrl + prod.logo : "../images/home/default_img.png" }),
                                React.createElement(
                                    'span',
                                    null,
                                    prod.abbrName
                                ),
                                React.createElement(
                                    'i',
                                    null,
                                    prod.name
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'dialog', style: { display: 'none' } },
                    React.createElement(
                        'div',
                        { id: 'anysign_title', style: { color: '#333333' }, width: '100%', height: '10%' },
                        '\u8BF7\u6295\u4FDD\u4EBA',
                        React.createElement(
                            'span',
                            { style: { fontize: '20pt' } },
                            ' \u674E \u5143 '
                        ),
                        '\u7B7E\u540D'
                    ),
                    React.createElement(
                        'div',
                        { id: 'container', onmousedown: 'return false;' },
                        React.createElement('canvas', { id: 'anysignCanvas', width: '2' })
                    ),
                    React.createElement(
                        'div',
                        { id: 'comment_dialog', style: { display: 'none' } },
                        React.createElement(
                            'div',
                            { id: 'leftView' },
                            React.createElement('p', { id: 'comment_title' }),
                            React.createElement('div', { id: 'signImage', className: 'signImagecss' })
                        ),
                        React.createElement(
                            'div',
                            { id: 'tmpcanvascss', className: 'tmpcanvascss' },
                            React.createElement('div', { id: 'signTitle' }),
                            React.createElement('canvas', { id: 'comment_canvas' })
                        ),
                        React.createElement(
                            'div',
                            { id: 'comment_btnContainerInner', className: 'comment_btncontainer' },
                            React.createElement('input', { id: 'comment_ok', type: 'button', className: 'button orange', value: '\u786E \u5B9A' }),
                            React.createElement('input', { id: 'comment_back', type: 'button', className: 'button orange', value: '\u540E\u9000' }),
                            React.createElement('input', { id: 'comment_cancel', type: 'button', className: 'button orange', value: '\u53D6 \u6D88' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'single_scrollbar', style: { textAlign: 'center', verticalAlign: 'middle' }, width: '100%' },
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'span',
                                { id: 'single_scroll_text' },
                                ' *\u6ED1\u52A8\u64CD\u4F5C\uFF1A'
                            )
                        ),
                        React.createElement(
                            'p',
                            { style: { display: 'none' } },
                            React.createElement('input', { id: 'single_scrollbar_up', type: 'button', className: 'button orange', value: '\u5DE6\u79FB' }),
                            React.createElement('input', { id: 'single_scrollbar_down', type: 'button', className: 'button orange', value: '\u53F3\u79FB' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'btnContainerOuter', width: '100%' },
                        React.createElement(
                            'div',
                            { id: 'btnContainerInner', style: { textAlign: 'center', fontSize: '5pt' }, width: '100%' },
                            React.createElement('input', { id: 'btnOK', type: 'button', className: 'button orange', value: '\u786E \u5B9A', onClick: sign_confirm }),
                            React.createElement('input', { id: 'btnClear', type: 'button', className: 'button orange', style: { display: 'none' }, value: '\u6E05 \u5C4F', onClick: clear_canvas }),
                            React.createElement('input', { id: 'btnCancel', type: 'button', className: 'button orange', value: '\u53D6 \u6D88', onClick: cancelSign })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'bottom text18 tc-primary' },
                    React.createElement('div', { className: 'ml-3 mr-0', style: { width: "300px" } }),
                    React.createElement(
                        'div',
                        { className: 'divx', onClick: this.submit.bind(this) },
                        React.createElement(
                            'div',
                            { className: 'ml-0 mr-0', style: { width: "390px", textAlign: "right" }, onClick: function onClick() {
                                    alert('提交成功');
                                    MF.navi("insurance/insurance.html?orderId=" + common.param("orderId"));
                                } },
                            '\u63D0\u4EA4'
                        )
                    )
                )
            );
        }
    }]);

    return Main;
}(React.Component);

$(document).ready(function () {
    ReactDOM.render(React.createElement(Main, null), document.getElementById("root"));
});

/***/ })
/******/ ]);