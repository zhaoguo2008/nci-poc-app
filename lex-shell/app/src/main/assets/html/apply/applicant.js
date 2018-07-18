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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

        _this.state = {
            orderId: common.param("orderId"),
            genderDict: { "M": "男", "F": "女" },
            nationDict: {},
            marriageDict: {},
            certTypeDict: {},
            relationDict: { "00": "本人", "01": "夫妻" },
            verify: {},
            mode: 0,
            cust: null,
            goNext: false
        };
        return _this;
    }

    _createClass(Main, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            window.MF && MF.setTitle("投保人");
            APP.dict("cert,marriage,nation,occupation", function (r) {
                var occMap = {};
                var occRank = {};
                var occDict = r.occupation.datas.map(function (v) {
                    var c = v.smalls.map(function (w) {
                        occMap[w.occupationCode] = { text: w.occupationName };
                        occRank[w.occupationCode] = w.occupationLevel;
                        return { code: w.occupationCode, text: w.occupationName };
                    });
                    occMap[v.occupationCode] = { text: v.occupationName, children: c };
                    return { code: v.occupationCode, text: v.occupationName };
                });
                _this2.setState({
                    occMap: occMap,
                    occRank: occRank,
                    occDict: occDict,
                    nationDict: r.nation,
                    nationDictMap: APP.toMapDict(r.nation),
                    certTypeDict: r.cert,
                    marriageDict: r.marriage
                });
            });
            APP.apply.view(this.state.orderId, function (r) {
                var cust = r.detail ? r.detail.applicant : null;
                _this2.setState({ cust: cust ? cust : {} });
            });
        }
    }, {
        key: "verify",
        value: function verify(c) {
            var v = {};

            if (this.state.mode == 1) {
                if (!c.name) {
                    v.name = "该项必填";
                } else {
                    if (c.name.length > 60) v.name = "姓名太长";else if (c.name.indexOf(" ") > 0) v.name = "姓名中不能有空格";
                }

                if (!c.birthday) {
                    v.birthday = "该项必填";
                } else {
                    if (c.birthday > common.dateStr(new Date())) v.birthday = "生日不能大于当前日期";
                }

                if (!c.certNo) {
                    v.certNo = "该项必填";
                } else {
                    if (c.certType == 1) {
                        var r1 = checkIdCard(c.certNo);
                        if (r1) v.certNo = r1;
                    }
                }
            }

            if (this.state.mode == 2) {
                if (!c.income) {
                    v.income = "该项必填";
                } else {
                    if (!/^[0-9]*$/.test(c.income)) v.income = "年收入需要为数字";
                }
            }

            if (this.state.mode == 3) {
                if (!c.zipcode) {
                    v.zipcode = "该项必填";
                } else {
                    if (!/^[0-9][0-9]{5}$/.test(c.zipcode)) v.zipcode = "邮政编码需要为6位数字";
                }
            }

            this.setState({ verify: v });
            return Object.keys(v).length == 0;
        }
    }, {
        key: "save",
        value: function save() {
            var _this3 = this;

            var c = this.state.cust;

            if (this.state.mode == 1) {
                c.name = this.refs.name.value;
                c.certNo = this.refs.certNo.value;
            } else if (this.state.mode == 2) {
                c.company = this.refs.company.value;
                c.workJob = this.refs.workJob.value;
                c.income = this.refs.income.value;
            } else if (this.state.mode == 3) {
                c.address = this.refs.address.value;
                c.address1 = this.refs.address1.value;
                c.address2 = this.refs.address2.value;
                c.telephone = this.refs.telephone.value;
                c.mobile = this.refs.mobile.value;
                c.qq = this.refs.qq.value;
                c.wechat = this.refs.wechat.value;
                c.zipcode = this.refs.zipcode.value;
                c.email = this.refs.email.value;
            } else if (this.state.mode == 4) {}

            if (this.verify(c)) {
                c["mode" + this.state.mode] = true;
                APP.apply.save({ id: this.state.orderId, detail: { applicant: c } }, function (v) {
                    _this3.setState({ mode: 0, cust: c });
                });
            } else {
                c["mode" + this.state.mode] = false;
            }
        }
    }, {
        key: "getIdCardImg",
        value: function getIdCardImg() {
            // 证件扫描
            var that = this;

            // 证件扫描
            OCR.callCardFront("APPNT", "OCR_FRONT");
            window.callOCRBack = function callOCRBack(flag, jsonData, bitmapStr) {
                var CardData = localStorage.CardData ? JSON.parse(localStorage.CardData) : [];
                var jsonDataObj = JSON.parse(jsonData);
                var cust = that.state.cust;
                if (jsonDataObj.name) {
                    // 正面
                    var birthday = jsonDataObj.birthday.replace(/['年','月']/g, '-');
                    cust.name = jsonDataObj.name;
                    cust.gender = jsonDataObj.sex == "男" ? "M" : "F";
                    cust.birthday = birthday.substring(0, birthday.length - 1);
                    cust.certNo = jsonDataObj.cardNo;
                    cust.address = jsonDataObj.address;
                } else if (jsonDataObj.validity) {
                    // 反面
                    cust.certValidDate = jsonDataObj.validity.split('-')[0].replace(/\./g, '-');
                    cust.certUnValidDate = jsonDataObj.validity.split('-')[1].replace(/\./g, '-');
                }
                that.setState({
                    cust: cust
                });
                localStorage.CardData = JSON.stringify([].concat(_toConsumableArray(CardData), [bitmapStr]));
                localStorage.appliCardDataState = JSON.stringify(true);
            };
        }
    }, {
        key: "next",
        value: function next() {
            var c = this.state.cust;
            if (c.mode1 && c.mode2 && c.mode3 && c.mode4) {
                localStorage.everyState = JSON.stringify({ applicant: this.state }); // 存放每个界面state数据
                if (localStorage.appliCardDataState && !JSON.parse(localStorage.appliCardDataState)) {
                    alert('请执行OCR扫描!!');
                } else {
                    MF.navi("apply/insurant.html?orderId=" + this.state.orderId);
                }
            } else {
                MF.toast("请完善客户信息");
            }
        }
    }, {
        key: "onValChange",
        value: function onValChange(key, val) {
            this.state.cust[key] = val;
            if (key == "occupation1") {
                this.state.cust.occupation = null;
                this.state.cust.occupationLevel = null;
            } else if (key == "occupation") {
                this.state.cust.occupationLevel = this.state.occRank[this.state.cust.occupation];
            }
            this.setState({ cust: this.state.cust });
        }
    }, {
        key: "switchMode",
        value: function switchMode(mode) {
            this.setState({ mode: this.state.mode == mode ? 0 : mode, verify: {} });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var cust = this.state.cust;
            return cust == null ? null : React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "divx bg-white pl-3 pr-3", style: { height: "100px", marginTop: "20px", textAlign: "center" }, onClick: this.switchMode.bind(this, 1) },
                    React.createElement(
                        "div",
                        { className: "divx text18", style: { height: "60px", margin: "25px auto 0 auto", verticalAlign: "middle", lineHeight: "50px" } },
                        React.createElement("img", { style: { width: "50px", height: "50px", margin: "0 20px 0 65px" }, src: "../images/" + (this.state.mode == 1 ? "sub" : "add") + ".png" }),
                        "\u57FA\u672C\u4FE1\u606F"
                    ),
                    React.createElement(
                        "div",
                        { style: { width: "65px" } },
                        cust.mode1 ? React.createElement("img", { style: { width: "39px", height: "30px", marginTop: "35px", float: "right" }, src: "../images/filled.png" }) : null
                    )
                ),
                this.state.mode != 1 ? null : React.createElement(
                    "div",
                    { className: "div" },
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u8BC1\u4EF6\u5F71\u50CF"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("img", { className: "mt-2", style: { width: "220px", height: "60px" }, src: "../images/btn-scan.png", onClick: this.getIdCardImg.bind(this) })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u6295\u4FDD\u4EBA\u59D3\u540D"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "name", defaultValue: cust.name, placeholder: "\u8BF7\u8F93\u5165\u6295\u4FDD\u4EBA\u59D3\u540D" })
                        )
                    ),
                    this.state.verify.name ? React.createElement(
                        "div",
                        { className: "form-alert" },
                        this.state.verify.name
                    ) : null,
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u6027\u522B"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("select", _this4.state.genderDict, _this4.onValChange.bind(_this4, "gender"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.gender == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.gender == null ? "请选择性别" : this.state.genderDict[cust.gender]
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
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u56FD\u7C4D"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("select", _this4.state.nationDict, _this4.onValChange.bind(_this4, "nation"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.nation == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.nation == null ? "请选择国籍" : this.state.nationDictMap[cust.nation]
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
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u51FA\u751F\u65E5\u671F"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("date", { begin: "1900-01-01", end: new Date() }, _this4.onValChange.bind(_this4, "birthday"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.birthday == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.birthday == null ? "请选择出生日期" : cust.birthday
                            ),
                            React.createElement("img", { className: "mt-2 mr-0", style: { width: "27px", height: "39px" }, src: "../images/right.png" })
                        )
                    ),
                    this.state.verify.birthday ? React.createElement(
                        "div",
                        { className: "form-alert" },
                        this.state.verify.birthday
                    ) : null,
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u5A5A\u59FB\u72B6\u51B5"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("select", _this4.state.marriageDict, _this4.onValChange.bind(_this4, "marriage"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.marriage == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.marriage == null ? "请选择婚姻状况" : this.state.marriageDict[cust.marriage]
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
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u8BC1\u4EF6\u7C7B\u578B"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("select", _this4.state.certTypeDict, _this4.onValChange.bind(_this4, "certType"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.certType == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.certType == null ? "请选择证件类型" : this.state.certTypeDict[cust.certType]
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
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u8BC1\u4EF6\u53F7\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "certNo", defaultValue: cust.certNo, placeholder: "\u8BF7\u8F93\u5165\u8BC1\u4EF6\u53F7\u7801" })
                        )
                    ),
                    this.state.verify.certNo ? React.createElement(
                        "div",
                        { className: "form-alert" },
                        this.state.verify.certNo
                    ) : null,
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u8BC1\u4EF6\u6709\u6548\u671F"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("date", { begin: new Date() }, _this4.onValChange.bind(_this4, "certValidDate"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.certValidDate == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.certValidDate == null ? "请选择证件有效期" : cust.certValidDate
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
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u8BC1\u4EF6\u5931\u6548\u671F"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("date", { begin: new Date() }, _this4.onValChange.bind(_this4, "certUnValidDate"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.certUnValidDate == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.certUnValidDate == null ? "请选择证件失效期" : cust.certUnValidDate
                            ),
                            React.createElement("img", { className: "mt-2 mr-0", style: { width: "27px", height: "39px" }, src: "../images/right.png" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement("img", { className: "mt-1 ml-auto mr-3", style: { width: "120px", height: "60px" }, src: "../images/finish.png", onClick: this.save.bind(this) })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "divx bg-white pl-3 pr-3", style: { height: "100px", marginTop: "20px", textAlign: "center" }, onClick: this.switchMode.bind(this, 2) },
                    React.createElement(
                        "div",
                        { className: "divx text18", style: { height: "60px", margin: "25px auto 0 auto", verticalAlign: "middle", lineHeight: "50px" } },
                        React.createElement("img", { style: { width: "50px", height: "50px", margin: "0 20px 0 65px" }, src: "../images/" + (this.state.mode == 2 ? "sub" : "add") + ".png" }),
                        "\u804C\u4E1A\u4FE1\u606F"
                    ),
                    React.createElement(
                        "div",
                        { style: { width: "65px" } },
                        cust.mode2 ? React.createElement("img", { style: { width: "39px", height: "30px", marginTop: "35px", float: "right" }, src: "../images/filled.png" }) : null
                    )
                ),
                this.state.mode != 2 ? null : React.createElement(
                    "div",
                    { className: "div" },
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u5DE5\u4F5C\u5355\u4F4D"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "company", defaultValue: cust.company, placeholder: "\u8BF7\u8F93\u5165\u5DE5\u4F5C\u5355\u4F4D" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u804C\u52A1"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "workJob", defaultValue: cust.workJob, placeholder: "\u8BF7\u8F93\u5165\u804C\u52A1" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u804C\u4E1A\u5927\u7C7B"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("select", _this4.state.occDict, _this4.onValChange.bind(_this4, "occupation1"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.occupation1 == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.occupation1 == null ? "请选择职业大类" : this.state.occMap[cust.occupation1].text
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
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u804C\u4E1A\u5C0F\u7C7B"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget", onClick: function onClick(v) {
                                    APP.pick("select", _this4.state.occMap[cust.occupation1].children, _this4.onValChange.bind(_this4, "occupation"));
                                } },
                            React.createElement(
                                "div",
                                { className: (cust.occupation == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.occupation == null ? "请选择职业小类" : this.state.occMap[cust.occupation].text
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
                            "\u804C\u4E1A\u4EE3\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement(
                                "div",
                                { className: (cust.occupation == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.occupation
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u804C\u4E1A\u7C7B\u522B"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement(
                                "div",
                                { className: (cust.occupationLevel == null ? "tc-gray " : "") + "text16 ml-1 mr-auto" },
                                cust.occupationLevel == null ? "" : cust.occupationLevel + "类"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u5E74\u6536\u5165\uFF08\u4E07\u5143\uFF09"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "income", defaultValue: cust.income, placeholder: "\u8BF7\u8F93\u5165\u5E74\u6536\u5165" })
                        )
                    ),
                    this.state.verify.income ? React.createElement(
                        "div",
                        { className: "form-alert" },
                        this.state.verify.income
                    ) : null,
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement("img", { className: "mt-1 ml-auto mr-3", style: { width: "120px", height: "60px" }, src: "../images/finish.png", onClick: this.save.bind(this) })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "divx bg-white pl-3 pr-3", style: { height: "100px", marginTop: "20px", textAlign: "center" }, onClick: this.switchMode.bind(this, 3) },
                    React.createElement(
                        "div",
                        { className: "divx text18", style: { height: "60px", margin: "25px auto 0 auto", verticalAlign: "middle", lineHeight: "50px" } },
                        React.createElement("img", { style: { width: "50px", height: "50px", margin: "0 20px 0 65px" }, src: "../images/" + (this.state.mode == 3 ? "sub" : "add") + ".png" }),
                        "\u8054\u7CFB\u65B9\u5F0F"
                    ),
                    React.createElement(
                        "div",
                        { style: { width: "65px" } },
                        cust.mode3 ? React.createElement("img", { style: { width: "39px", height: "30px", marginTop: "35px", float: "right" }, src: "../images/filled.png" }) : null
                    )
                ),
                this.state.mode != 3 ? null : React.createElement(
                    "div",
                    { className: "div" },
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u8054\u7CFB\u5730\u5740"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "address", defaultValue: cust.address, placeholder: "\u8BF7\u8F93\u5165\u8054\u7CFB\u5730\u5740" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u4E61\u9547\uFF08\u8857\u9053\uFF09"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "address1", defaultValue: cust.address1, placeholder: "\u8BF7\u8F93\u5165\u4E61\u9547\uFF08\u8857\u9053\uFF09" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u6751\uFF08\u793E\u533A\uFF09"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "address2", defaultValue: cust.address2, placeholder: "\u8BF7\u8F93\u5165\u6751\uFF08\u793E\u533A\uFF09" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u90AE\u653F\u7F16\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "zipcode", defaultValue: cust.zipcode, placeholder: "\u8BF7\u8F93\u5165\u90AE\u653F\u7F16\u7801" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label", style: { width: "670px" } },
                            "\u8054\u7CFB\u65B9\u5F0F\uFF08\u624B\u673A\u6216\u8005\u7535\u8BDD\u4E8C\u8005\u9009\u5176\u4E00\uFF09"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u7535\u8BDD"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "telephone", defaultValue: cust.telephone, placeholder: "\u8BF7\u8F93\u5165\u7535\u8BDD \u4F8B\uFF1A000-12345678" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            React.createElement(
                                "span",
                                { style: { color: "red" } },
                                "*"
                            ),
                            "\u624B\u673A"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "mobile", defaultValue: cust.mobile, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u7535\u5B50\u90AE\u7BB1"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "email", defaultValue: cust.email, placeholder: "\u8BF7\u8F93\u5165\u7535\u5B50\u90AE\u7BB1" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "QQ\u53F7\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "qq", defaultValue: cust.qq, placeholder: "\u8BF7\u8F93\u5165QQ\u53F7\u7801" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement(
                            "div",
                            { className: "form-item-label" },
                            "\u5FAE\u4FE1\u53F7\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "form-item-widget" },
                            React.createElement("input", { className: "mt-1", ref: "wechat", defaultValue: cust.wechat, placeholder: "\u8BF7\u8F93\u5165\u5FAE\u4FE1\u53F7\u7801" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement("img", { className: "mt-1 ml-auto mr-3", style: { width: "120px", height: "60px" }, src: "../images/finish.png", onClick: this.save.bind(this) })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "divx bg-white pl-3 pr-3", style: { height: "100px", marginTop: "20px", textAlign: "center" }, onClick: this.switchMode.bind(this, 4) },
                    React.createElement(
                        "div",
                        { className: "divx text18", style: { height: "60px", margin: "25px auto 0 auto", verticalAlign: "middle", lineHeight: "50px" } },
                        React.createElement("img", { style: { width: "50px", height: "50px", margin: "0 20px 0 65px" }, src: "../images/" + (this.state.mode == 4 ? "sub" : "add") + ".png" }),
                        "\u5176\u4ED6\u4FE1\u606F"
                    ),
                    React.createElement(
                        "div",
                        { style: { width: "65px" } },
                        cust.mode4 ? React.createElement("img", { style: { width: "39px", height: "30px", marginTop: "35px", float: "right" }, src: "../images/filled.png" }) : null
                    )
                ),
                this.state.mode != 4 ? null : React.createElement(
                    "div",
                    { className: "div" },
                    React.createElement(
                        "div",
                        { className: "form-item text16" },
                        React.createElement("img", { className: "mt-1 ml-auto mr-3", style: { width: "120px", height: "60px" }, src: "../images/finish.png", onClick: this.save.bind(this) })
                    )
                ),
                React.createElement("div", { style: { height: "120px" } }),
                React.createElement(
                    "div",
                    { className: "bottom text18 tc-primary" },
                    React.createElement("div", { className: "ml-3 mr-auto" }),
                    React.createElement(
                        "div",
                        { className: "mr-3", onClick: this.next.bind(this) },
                        "\u88AB\u4FDD\u9669\u4EBA\u4FE1\u606F"
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