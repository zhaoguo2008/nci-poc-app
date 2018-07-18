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

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

        var ages = [];
        for (var i = 0; i < 70; i++) {
            ages.push(i);
        }_this.state = {
            proposalId: common.param("proposalId"),
            genderDict: { "M": "男", "F": "女" },
            ages: ages,
            cust: [{}, {}],
            mode: -1,
            showCustomer: false
        };
        return _this;
    }

    _createClass(Main, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            MF.setTitle("选择客户");
            APP.proposal.view(this.state.proposalId, function (r) {
                APP.proposal.viewPlan(r.detail[0], function (plan) {
                    _this2.state.cust[0] = r.applicant;
                    _this2.state.cust[1] = plan.insurant;
                    _this2.setState({ proposal: r, plan: plan, cust: _this2.state.cust });
                });
            });
            APP.onShow = function () {
                console.log("refresh...");
                _this2.forceUpdate;
            };
        }
    }, {
        key: "select",
        value: function select(index) {
            this.state.cust[index] = {
                age: 20,
                gender: "M"
            };
            this.forceUpdate({ cust: this.state.cust });
        }
    }, {
        key: "next",
        value: function next() {
            var _this3 = this;

            APP.proposal.refreshCust(this.state.proposal.proposalId, this.state.cust[0], [this.state.cust[1]], function (r) {
                MF.navi("proposal/proposal.html?proposalId=" + _this3.state.proposalId);
            });
        }
    }, {
        key: "onValChange",
        value: function onValChange(index, key, e) {
            if (key == "name") {
                e = e.value;
            } else if (key == "birthday") {
                this.state.cust[index].age = null;
            } else if (key == "age") {
                this.state.cust[index].birthday = null;
            }
            this.state.cust[index][key] = e;
            this.setState({ cust: this.state.cust });
        }
    }, {
        key: "showCustomer",
        value: function showCustomer(index) {
            var _this4 = this;

            APP.list("/customer/list.json", { from: 0, number: 20 }, function (r) {
                console.log(JSON.stringify(r.list));
                _this4.setState({
                    showCustomer: true,
                    index: index,
                    mockData: r.list
                });
            });
        }
    }, {
        key: "choseMember",
        value: function choseMember(item) {
            console.log(JSON.stringify(item));
            this.state.cust[this.state.index] = item;
            this.setState({
                cust: this.state.cust,
                showCustomer: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                "div",
                null,
                this.state.cust.map(function (v, i) {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            { className: "divx", style: { height: "80px", lineHeight: "80px" } },
                            React.createElement(
                                "div",
                                { className: "ml-2" },
                                i == 0 ? "投保人" : "被保险人",
                                "\u4FE1\u606F"
                            ),
                            React.createElement(
                                "div",
                                { className: "ml-auto mr-2 tc-primary", onClick: _this5.showCustomer.bind(_this5, i) },
                                "\u9009\u62E9"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "div" },
                            React.createElement(
                                "div",
                                { className: "form-item text16" },
                                React.createElement(
                                    "div",
                                    { className: "form-item-label" },
                                    "\u59D3\u540D"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-item-widget" },
                                    React.createElement("input", { className: "mt-1", value: v.name, placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D", onChange: _this5.onValChange.bind(_this5, i, "name") })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-item text16" },
                                React.createElement(
                                    "div",
                                    { className: "form-item-label" },
                                    "\u6027\u522B"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-item-widget", onClick: function onClick(e) {
                                            APP.pick("select", _this5.state.genderDict, _this5.onValChange.bind(_this5, i, "gender"));
                                        } },
                                    React.createElement(
                                        "div",
                                        { className: (v.gender == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                        v.gender == null ? "请选择性别" : _this5.state.genderDict[v.gender]
                                    ),
                                    React.createElement("img", { className: "mt-2 mr-0", style: { width: "27px", height: "39px" }, src: "../images/right.png" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-item text16" },
                                React.createElement(
                                    "div",
                                    { className: "form-item-label" },
                                    v.birthday ? "出生日期" : "年龄"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-item-widget", onClick: function onClick(e) {
                                            APP.pick("select", _this5.state.ages, _this5.onValChange.bind(_this5, i, "age"));
                                        } },
                                    React.createElement(
                                        "div",
                                        { className: "text17 ml-1 mr-auto" },
                                        v.birthday,
                                        v.birthday && v.age ? " / " : "",
                                        v.age ? v.age + "周岁" : ""
                                    ),
                                    React.createElement("img", { className: "mt-1 mr-0", style: { width: "60px", height: "60px" }, src: "../images/calendar.png", onClick: function onClick(e) {
                                            e.stopPropagation();APP.pick("date", { begin: "1900-01-01", end: new Date() }, _this5.onValChange.bind(_this5, i, "birthday"));
                                        } })
                                )
                            )
                        )
                    );
                }),
                React.createElement("div", { style: { height: "120px" } }),
                React.createElement(
                    "div",
                    { className: "bottom text18 tc-primary" },
                    React.createElement("div", { className: "ml-3 mr-auto" }),
                    React.createElement(
                        "div",
                        { className: "mr-3", onClick: this.next.bind(this) },
                        "\u6295\u4FDD\u8BA1\u5212"
                    )
                ),
                this.state.showCustomer && React.createElement(
                    "div",
                    { className: "customer-box" },
                    React.createElement(
                        "div",
                        { className: "customers" },
                        React.createElement(
                            "b",
                            { onClick: function onClick() {
                                    _this5.setState({ showCustomer: false });
                                } },
                            "X"
                        ),
                        React.createElement(
                            "div",
                            { className: "t-header" },
                            React.createElement(
                                "span",
                                null,
                                "\u59D3\u540D"
                            ),
                            React.createElement(
                                "span",
                                null,
                                "\u6027\u522B"
                            ),
                            React.createElement(
                                "span",
                                null,
                                "\u51FA\u751F\u65E5\u671F"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "t-body" },
                            this.state.mockData && this.state.mockData.map(function (item) {
                                return React.createElement(
                                    "p",
                                    { onClick: _this5.choseMember.bind(_this5, item) },
                                    React.createElement(
                                        "span",
                                        null,
                                        item.name
                                    ),
                                    React.createElement(
                                        "span",
                                        null,
                                        _this5.state.genderDict[item.gender]
                                    ),
                                    React.createElement(
                                        "span",
                                        null,
                                        item.birthday
                                    )
                                );
                            })
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