class Main extends React.Component {
    constructor() {
        super()
        let ages = []
        for (let i=0;i<70;i++)
            ages.push(i)
        this.state = {
            proposalId: common.param("proposalId"),
            genderDict: {"M":"男", "F":"女"},
            ages: ages,
            cust: [{},{}],
            mode: -1,
            showCustomer: false
        }
    }
    componentDidMount() {
        MF.setTitle("选择客户")
        APP.proposal.view(this.state.proposalId, r => {
            APP.proposal.viewPlan(r.detail[0], plan => {
                this.state.cust[0] = r.applicant
                this.state.cust[1] = plan.insurant
                this.setState({proposal:r, plan:plan, cust:this.state.cust})
            })
        })
        APP.onShow = () => {
            console.log("refresh...")
            this.forceUpdate
        }
    }
    select(index) {
        this.state.cust[index] = {
            age: 20,
            gender: "M"
        }
        this.forceUpdate({ cust: this.state.cust })
    }
    next() {
        APP.proposal.refreshCust(this.state.proposal.proposalId, this.state.cust[0], [this.state.cust[1]], r => {
            MF.navi("proposal/proposal.html?proposalId=" + this.state.proposalId)
        })
    }
    onValChange(index, key, e) {
        if (key == "name") {
            e = e.value
        } else if (key == "birthday") {
            this.state.cust[index].age = null
        } else if (key == "age") {
            this.state.cust[index].birthday = null
        }
        this.state.cust[index][key] = e
        this.setState({ cust: this.state.cust })
    }
    showCustomer (index) {
        APP.list("/customer/list.json",{ from:0, number:20 }, r => {
            console.log(JSON.stringify(r.list));
            this.setState({
                showCustomer: true,
                index: index,
                mockData: r.list
            })
        });
    }

    choseMember (item) {
        console.log(JSON.stringify(item));
        this.state.cust[this.state.index] = item;
        this.setState({
            cust: this.state.cust,
            showCustomer: false,
        })
    }

    render() {
        return (
            <div>
                { this.state.cust.map((v, i) =>
                    <div>
                        <div className="divx" style={{height:"80px", lineHeight:"80px"}}>
                            <div className="ml-2">{i==0?"投保人":"被保险人"}信息</div>
                            <div className="ml-auto mr-2 tc-primary" onClick={this.showCustomer.bind(this,i)}>选择</div>
                        </div>
                        <div className="div">
                            <div className="form-item text16">
                                <div className="form-item-label">姓名</div>
                                <div className="form-item-widget">
                                    <input className="mt-1" value={v.name} placeholder="请输入姓名" onChange={this.onValChange.bind(this, i, "name")}/>
                                </div>
                            </div>
                            <div className="form-item text16">
                                <div className="form-item-label">性别</div>
                                <div className="form-item-widget" onClick={e => { APP.pick("select", this.state.genderDict, this.onValChange.bind(this, i, "gender")) }}>
                                    <div className={(v.gender == null ? "tc-gray " : "") + "text16 ml-1 mr-auto"}>{v.gender == null ? "请选择性别" : this.state.genderDict[v.gender]}</div>
                                    <img className="mt-2 mr-0" style={{width:"27px", height:"39px"}} src="../images/right.png"/>
                                </div>
                            </div>
                            <div className="form-item text16">
                                <div className="form-item-label">{v.birthday?"出生日期":"年龄"}</div>
                                <div className="form-item-widget" onClick={e => { APP.pick("select", this.state.ages, this.onValChange.bind(this, i, "age")) }}>
                                    <div className="text17 ml-1 mr-auto">{ v.birthday }{ v.birthday && v.age ? " / " : "" }{ v.age ? v.age + "周岁" : "" }</div>
                                    <img className="mt-1 mr-0" style={{width:"60px", height:"60px"}} src="../images/calendar.png" onClick={e => { e.stopPropagation(); APP.pick("date", { begin: "1900-01-01", end: new Date() }, this.onValChange.bind(this, i, "birthday")) }}/>
                                </div>
                            </div>
                        </div>
                    </div> 
                )}
                <div style={{height:"120px"}}></div>

                <div className="bottom text18 tc-primary">
                    <div className="ml-3 mr-auto">
                    </div>
                    <div className="mr-3" onClick={this.next.bind(this)}>
                        投保计划
                    </div>
                </div>

                {
                    this.state.showCustomer && <div className="customer-box">
                        <div className="customers">
                            <b onClick={() => {this.setState({showCustomer: false})}}>X</b>
                            <div className="t-header">
                                <span>姓名</span><span>性别</span><span>出生日期</span>
                            </div>
                            <div className="t-body">
                                {
                                    this.state.mockData && this.state.mockData.map((item) => {
                                        return (
                                            <p onClick={this.choseMember.bind(this, item)}>
                                                <span>{item.name}</span>
                                                <span>{this.state.genderDict[item.gender]}</span>
                                                <span>{item.birthday}</span>
                                            </p>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </div>
                }
            </div>

        )
    }
}

$(document).ready(() => {
    ReactDOM.render(<Main/>, document.getElementById("root"))
})
