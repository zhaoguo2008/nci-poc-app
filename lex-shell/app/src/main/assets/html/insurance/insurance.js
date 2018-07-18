class Insurance extends React.Component {
    constructor() {
        super();
        this.state = {
            insuranceList: [],
            butArr:["已投保","投保成功","投保失败","核保中","已签单"]

        }
    }
    componentDidMount() {
        window.MF && MF.setTitle("投保单");
        this.fetchClientList();
    }
    fetchClientList(){
        APP.openApply('/order/list.json', {type: '2', from: 0, number: 20},(res) => {
            console.log(JSON.stringify(res))
            this.setState({
                insuranceList: res.list
            })
        })
    }
    /*操作按钮*/
    btnClick (status) {
        /*已投保，投保成功， 失败，核保中（上传通知书），已签单（回执）*/
        if (status == 4) {

            MF.navi("xinhua_lx/notice_xh.html?orderId=" + common.param("orderId"));
        } else if(status == 5) {
            MF.navi("receipt/receipt.html?orderId=" + common.param("orderId"));
        }
    }
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
                        this.state.insuranceList.map((prod,index)=>{
                            return(
                                <li className="insuranceBox">
                                    <div className="insuranceTile">
                                        <img src="../images/user.png" alt=""/>
                                        <font>{prod.detail.applicant.name}</font>
                                        <span>{prod.detail.applicant.gender == 'M'? '男' : '女'}</span>
                                        <span>{prod.detail.applicant.birthday}</span>
                                    </div>

                                    <section>
                                        <h2>{prod.productName}</h2>
                                    </section>

                                    <div className="insurancePremium">
                                        <font>首付保险费合计: <b>{prod.price}</b>元</font>
                                    </div>

                                    <div className="insuranceButton">
                                        <span onClick={() => {
                                            window.MF &&  MF.navi("xinhua_lx/autograph_xh.html?prod=" + JSON.stringify(prod))
                                        }
                                        }>查看</span>
                                        <span onClick={this.btnClick.bind(this, prod.status)}>{this.state.butArr[prod.status * 1 - 1]}</span>
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
