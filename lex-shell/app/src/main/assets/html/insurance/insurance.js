class Insurance extends React.Component {
    constructor() {
        super();
        this.state = {
            insuranceList: []

        }
    }
    componentDidMount() {
        window.MF && MF.setTitle("投保单");
        this.fetchClientList();
    }
    fetchClientList(){
       /* let that = this
        ajax('/order/list.json',{
            type: '2',
            from: 0,
            number: 10,
            userKey:localStorage.userKey
        },res=>{
            that.setState({
                insuranceList: res.content.list
            })
        })*/
        APP.openApply('/order/list.json', {type: '2', from: 0, number: 10},(res) => {
            this.setState({//productName
                insuranceList: res.list
            }, () => {
                console.log(JSON.stringify(res.list))
            })
        })
    }
    /*编辑操作*/
    editClient (data) {}
    /*获取性别函数*/
    getSex(code) {
        return code == "M"? "男" : "女";
    }
    getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }

    render(){
        return (
            <div className="insuranceMain">
                <ul>
                    {
                        this.state.insuranceList.length && this.state.insuranceList.map((prod)=>{
                            return(
                                <li className="insuranceBox">
                                    <div className="insuranceTile">
                                        <img src="../images/user.png" alt=""/>
                                        {prod.detail.applicant.name && <font>{prod.detail.applicant.name}</font>}
                                        {prod.detail.applicant.gender && <span>{prod.detail.applicant.gender == 'M'? '男' : '女'}</span>}
                                        {prod.detail.applicant.birthday && <span>{prod.detail.applicant.birthday}</span>}
                                        <p>标体通过</p>
                                    </div>

                                    <section>
                                        <dl>
                                            <dt>
                                                <div><img src="http://114.112.96.30:10003/nci/temp/apply_adver/2018/07/04/04/153069215408904490.jpg" alt=""/></div>

                                            </dt>
                                            <dd>
                                                <h2>百万安行</h2>
                                                <p>百万安行个人阿斯兰的那卡斯达拉斯阿斯兰的纽卡斯淡蓝色的拉到你是看得见你</p>                                            </dd>
                                        </dl>
                                    </section>

                                    <div className="insurancePremium">
                                        <font>首付保险费合计: {prod.premium && <b>{prod.premium}</b>}元</font>
                                    </div>

                                    <div className="insuranceButton">
                                        <span onClick={() => {
                                            if (window.MF) {
                                                MF.navi("xinhua_lx/autograph_xh.html");
                                            } else {
                                                location.href = "../xinhua_lx/autograph_xh.html";
                                            }
                                        }}>查看</span>
                                        <span onClick={() => {
                                            if (window.MF) {
                                                MF.navi("xinhua_lx/notice_xh.html");
                                            } else {
                                                location.href = "../xinhua_lx/notice_xh.html";
                                            }
                                        }}>签单</span>
                                        <span onClick={() => {
                                            if (window.MF) {
                                                MF.navi("receipt/receipt.html");
                                            } else {
                                                location.href = "../receipt/receipt.html";
                                            }

                                        }}>支付</span>
                                        <span>续期投保</span>
                                    </div>

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}


ReactDOM.render(<Insurance/>, document.getElementById("root"))
