class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            orderId: common.param("orderId"),
            genderDict: {"M":"男", "F":"女"},
            nationDict: {},
            marriageDict: {},
            certTypeDict: {},
            relationDict: {"00":"本人", "01":"夫妻"},
            verify: {},
            mode: 0,
            cust: null,
            goNext: false
        }
    }
    componentDidMount() {
        window.MF&&MF.setTitle("投保人")
        APP.dict("cert,marriage,nation,occupation", r => {
            let occMap = {}
            let occRank = {}
            let occDict = r.occupation.datas.map(v => {
                let c = v.smalls.map(w => {
                    occMap[w.occupationCode] = { text:w.occupationName }
                    occRank[w.occupationCode] = w.occupationLevel
                    return { code:w.occupationCode, text:w.occupationName }
                })
                occMap[v.occupationCode] = { text:v.occupationName, children:c }
                return { code:v.occupationCode, text:v.occupationName }
            })
            this.setState({
                occMap: occMap,
                occRank: occRank,
                occDict: occDict,
                nationDict: r.nation,
                nationDictMap: APP.toMapDict(r.nation),
                certTypeDict: r.cert,
                marriageDict: r.marriage
            })
        })
        APP.apply.view(this.state.orderId, r => {
            let cust = r.detail ? r.detail.applicant : null
            this.setState({ cust: cust ? cust : {} })
        })
    }
    verify(c) {
        let v = {}

        if (this.state.mode == 1) {
            if (!c.name) {
                v.name = "该项必填"
            } else {
                if (c.name.length > 60)
                    v.name = "姓名太长"
                else if (c.name.indexOf(" ") > 0)
                    v.name = "姓名中不能有空格"
            }

            if (!c.birthday) {
                v.birthday = "该项必填"
            } else {
                if (c.birthday > common.dateStr(new Date()))
                    v.birthday = "生日不能大于当前日期"
            }

            if (!c.certNo) {
                v.certNo = "该项必填"
            } else {
                if (c.certType == 1) {
                    var r1 = checkIdCard(c.certNo)
                    if (r1) v.certNo = r1
                }
            }
        }

        if (this.state.mode == 2) {
            if (!c.income) {
                v.income = "该项必填"
            } else {
                if (!/^[0-9]*$/.test(c.income))
                    v.income = "年收入需要为数字"
            }
        }

        if (this.state.mode == 3) {
            if (!c.zipcode) {
                v.zipcode = "该项必填"
            } else {
                if (!/^[0-9][0-9]{5}$/.test(c.zipcode))
                    v.zipcode = "邮政编码需要为6位数字"
            }
        }

        this.setState({ verify: v })
        return Object.keys(v).length == 0
    }

    save() {
        let c = this.state.cust

        if (this.state.mode == 1) {
            c.name = this.refs.name.value
            c.certNo = this.refs.certNo.value
        } else if (this.state.mode == 2) {
            c.company = this.refs.company.value
            c.workJob = this.refs.workJob.value
            c.income = this.refs.income.value
        } else if (this.state.mode == 3) {
            c.address = this.refs.address.value
            c.address1 = this.refs.address1.value
            c.address2 = this.refs.address2.value
            c.telephone = this.refs.telephone.value
            c.mobile = this.refs.mobile.value
            c.qq = this.refs.qq.value
            c.wechat = this.refs.wechat.value
            c.zipcode = this.refs.zipcode.value
            c.email = this.refs.email.value
        } else if (this.state.mode == 4) {
        }

        if (this.verify(c)) {
            c["mode" + this.state.mode] = true
            APP.apply.save({ id: this.state.orderId, detail: { applicant: c } }, v => {
                this.setState({ mode: 0, cust: c})
            })
        } else {
            c["mode" + this.state.mode] = false
        }
    }
    getIdCardImg () {// 证件扫描
        let that = this;

        // 证件扫描
        OCR.callCardFront("APPNT", "OCR_FRONT");
        window.callOCRBack = function callOCRBack(flag, jsonData, bitmapStr){
            let CardData = localStorage.CardData ? JSON.parse(localStorage.CardData):[];
            var jsonDataObj = JSON.parse(jsonData);
            var cust = that.state.cust;
            if (jsonDataObj.name) { // 正面
                var birthday = jsonDataObj.birthday.replace(/['年','月']/g, '-');
                cust.name = jsonDataObj.name;
                cust.gender = jsonDataObj.sex == "男" ? "M" : "F";
                cust.birthday = birthday.substring(0, birthday.length - 1);
                cust.certNo = jsonDataObj.cardNo;
                cust.address = jsonDataObj.address;
            } else if (jsonDataObj.validity) { // 反面
                cust.certValidDate = jsonDataObj.validity.split('-')[0].replace(/\./g, '-');
                cust.certUnValidDate = jsonDataObj.validity.split('-')[1].replace(/\./g, '-');
            }
            that.setState({
                cust: cust
            });
            localStorage.CardData = JSON.stringify([...CardData, bitmapStr]);
            localStorage.appliCardDataState = JSON.stringify(true)
        }
    }
    next() {
        let c = this.state.cust
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
    onValChange(key, val) {
        this.state.cust[key] = val
        if (key == "occupation1") {
            this.state.cust.occupation = null
            this.state.cust.occupationLevel = null
        } else if (key == "occupation") {
            this.state.cust.occupationLevel = this.state.occRank[this.state.cust.occupation]
        }
        this.setState({ cust: this.state.cust })
    }
    switchMode(mode) {
        this.setState({ mode:this.state.mode==mode?0:mode, verify:{} })
    }
    render() {
        let cust = this.state.cust;
        return cust == null ? null : (
            <div>
                <div className="divx bg-white pl-3 pr-3" style={{height:"100px", marginTop:"20px", textAlign:"center"}} onClick={this.switchMode.bind(this, 1)}>
                    <div className="divx text18" style={{height:"60px", margin:"25px auto 0 auto", verticalAlign:"middle", lineHeight:"50px"}}>
                        <img style={{width:"50px", height:"50px", margin:"0 20px 0 65px"}} src={"../images/"+(this.state.mode==1?"sub":"add")+".png"}/>基本信息
                    </div>
                    <div style={{width:"65px"}}>{ cust.mode1 ? <img style={{width:"39px", height:"30px", marginTop:"35px", float:"right"}} src="../images/filled.png"/> : null }</div>
                </div>
                { this.state.mode != 1 ? null : <div className="div">
                    <div className="form-item text16">
                        <div className="form-item-label">证件影像</div>
                        <div className="form-item-widget">
                            <img className="mt-2" style={{width:"220px", height:"60px"}} src="../images/btn-scan.png" onClick={this.getIdCardImg.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>投保人姓名</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="name" defaultValue={cust.name} placeholder="请输入投保人姓名"/>
                        </div>
                    </div>
                    { this.state.verify.name ? <div className="form-alert">{this.state.verify.name}</div> : null }
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>性别</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("select", this.state.genderDict, this.onValChange.bind(this, "gender"))}}>
                            <div className={(cust.gender == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.gender == null ? "请选择性别" : this.state.genderDict[cust.gender]}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>国籍</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("select", this.state.nationDict, this.onValChange.bind(this, "nation"))}}>
                            <div className={(cust.nation == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.nation == null ? "请选择国籍" : this.state.nationDictMap[cust.nation]}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>出生日期</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("date", { begin: "1900-01-01", end: new Date() }, this.onValChange.bind(this, "birthday"))}}>
                            <div className={(cust.birthday == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.birthday == null ? "请选择出生日期" : cust.birthday}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    { this.state.verify.birthday ? <div className="form-alert">{this.state.verify.birthday}</div> : null }
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>婚姻状况</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("select", this.state.marriageDict, this.onValChange.bind(this, "marriage"))}}>
                            <div className={(cust.marriage == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.marriage == null ? "请选择婚姻状况" : this.state.marriageDict[cust.marriage]}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>证件类型</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("select", this.state.certTypeDict, this.onValChange.bind(this, "certType"))}}>
                            <div className={(cust.certType == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.certType == null ? "请选择证件类型" : this.state.certTypeDict[cust.certType]}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>证件号码</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="certNo" defaultValue={cust.certNo} placeholder="请输入证件号码"/>
                        </div>
                    </div>
                    { this.state.verify.certNo ? <div className="form-alert">{this.state.verify.certNo}</div> : null }

                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>证件有效期</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("date", { begin: new Date() }, this.onValChange.bind(this, "certValidDate"))}}>
                            <div className={(cust.certValidDate == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.certValidDate == null ? "请选择证件有效期" : cust.certValidDate}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>证件失效期</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("date", { begin: new Date() }, this.onValChange.bind(this, "certUnValidDate"))}}>
                            <div className={(cust.certUnValidDate == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.certUnValidDate == null ? "请选择证件失效期" : cust.certUnValidDate}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <img className="mt-1 ml-auto mr-3" style={{width:"120px", height:"60px"}} src="../images/finish.png" onClick={this.save.bind(this)}/>
                    </div>
                </div> }
                <div className="divx bg-white pl-3 pr-3" style={{height:"100px", marginTop:"20px", textAlign:"center"}} onClick={this.switchMode.bind(this, 2)}>
                    <div className="divx text18" style={{height:"60px", margin:"25px auto 0 auto", verticalAlign:"middle", lineHeight:"50px"}}>
                        <img style={{width:"50px", height:"50px", margin:"0 20px 0 65px"}} src={"../images/"+(this.state.mode==2?"sub":"add")+".png"}/>职业信息
                    </div>
                    <div style={{width:"65px"}}>{ cust.mode2 ? <img style={{width:"39px", height:"30px", marginTop:"35px", float:"right"}} src="../images/filled.png"/> : null }</div>
                </div>
                { this.state.mode != 2 ? null : <div className="div">
                    <div className="form-item text16">
                        <div className="form-item-label">工作单位</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="company" defaultValue={cust.company} placeholder="请输入工作单位"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">职务</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="workJob" defaultValue={cust.workJob} placeholder="请输入职务"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>职业大类</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("select", this.state.occDict, this.onValChange.bind(this, "occupation1"))}}>
                            <div className={(cust.occupation1 == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.occupation1 == null ? "请选择职业大类" : this.state.occMap[cust.occupation1].text}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>职业小类</div>
                        <div className="form-item-widget" onClick={v => {APP.pick("select", this.state.occMap[cust.occupation1].children, this.onValChange.bind(this, "occupation"))}}>
                            <div className={(cust.occupation == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.occupation == null ? "请选择职业小类" : this.state.occMap[cust.occupation].text}</div>
                            <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">职业代码</div>
                        <div className="form-item-widget">
                            <div className={(cust.occupation == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.occupation}</div>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">职业类别</div>
                        <div className="form-item-widget">
                            <div className={(cust.occupationLevel == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{cust.occupationLevel == null ? "" : cust.occupationLevel+"类"}</div>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>年收入（万元）</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="income" defaultValue={cust.income} placeholder="请输入年收入"/>
                        </div>
                    </div>
                    { this.state.verify.income ? <div className="form-alert">{this.state.verify.income}</div> : null }
                    <div className="form-item text16">
                        <img className="mt-1 ml-auto mr-3" style={{width:"120px", height:"60px"}} src="../images/finish.png" onClick={this.save.bind(this)}/>
                    </div>
                </div> }
                <div className="divx bg-white pl-3 pr-3" style={{height:"100px", marginTop:"20px", textAlign:"center"}} onClick={this.switchMode.bind(this, 3)}>
                    <div className="divx text18" style={{height:"60px", margin:"25px auto 0 auto", verticalAlign:"middle", lineHeight:"50px"}}>
                        <img style={{width:"50px", height:"50px", margin:"0 20px 0 65px"}} src={"../images/"+(this.state.mode==3?"sub":"add")+".png"}/>联系方式
                    </div>
                    <div style={{width:"65px"}}>{ cust.mode3 ? <img style={{width:"39px", height:"30px", marginTop:"35px", float:"right"}} src="../images/filled.png"/> : null }</div>
                </div>
                { this.state.mode != 3 ? null : <div className="div">
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>联系地址</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="address" defaultValue={cust.address} placeholder="请输入联系地址"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">乡镇（街道）</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="address1" defaultValue={cust.address1} placeholder="请输入乡镇（街道）"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">村（社区）</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="address2" defaultValue={cust.address2} placeholder="请输入村（社区）"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>邮政编码</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="zipcode" defaultValue={cust.zipcode} placeholder="请输入邮政编码"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label" style={{width:"670px"}}>联系方式（手机或者电话二者选其一）</div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">电话</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="telephone" defaultValue={cust.telephone} placeholder="请输入电话 例：000-12345678"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label"><span style={{color:"red"}}>*</span>手机</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="mobile" defaultValue={cust.mobile} placeholder="请输入手机"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">电子邮箱</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="email" defaultValue={cust.email} placeholder="请输入电子邮箱"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">QQ号码</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="qq" defaultValue={cust.qq} placeholder="请输入QQ号码"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <div className="form-item-label">微信号码</div>
                        <div className="form-item-widget">
                            <input className="mt-1" ref="wechat" defaultValue={cust.wechat} placeholder="请输入微信号码"/>
                        </div>
                    </div>
                    <div className="form-item text16">
                        <img className="mt-1 ml-auto mr-3" style={{width:"120px", height:"60px"}} src="../images/finish.png" onClick={this.save.bind(this)}/>
                    </div>
                </div> }
                <div className="divx bg-white pl-3 pr-3" style={{height:"100px", marginTop:"20px", textAlign:"center"}} onClick={this.switchMode.bind(this, 4)}>
                    <div className="divx text18" style={{height:"60px", margin:"25px auto 0 auto", verticalAlign:"middle", lineHeight:"50px"}}>
                        <img style={{width:"50px", height:"50px", margin:"0 20px 0 65px"}} src={"../images/"+(this.state.mode==4?"sub":"add")+".png"}/>其他信息
                    </div>
                    <div style={{width:"65px"}}>{ cust.mode4 ? <img style={{width:"39px", height:"30px", marginTop:"35px", float:"right"}} src="../images/filled.png"/> : null }</div>
                </div>
                { this.state.mode != 4 ? null : <div className="div">
                    <div className="form-item text16">
                        <img className="mt-1 ml-auto mr-3" style={{width:"120px", height:"60px"}} src="../images/finish.png" onClick={this.save.bind(this)}/>
                    </div>
                </div> }
                <div style={{height:"120px"}}></div>
                <div className="bottom text18 tc-primary">
                    <div className="ml-3 mr-auto"></div>
                    <div className="mr-3" onClick={this.next.bind(this)}>
                        被保险人信息
                    </div>
                </div>
            </div>
		)
    }
}

$(document).ready( function() {
    ReactDOM.render(<Main/>, document.getElementById("root"))
})