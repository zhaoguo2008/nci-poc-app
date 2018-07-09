class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            orderId: common.param("orderId"),
        }
    }
    componentDidMount() {
        MF.setTitle("健康告知")
        APP.apply.view(this.state.orderId, r => {
            this.setState({ order: r })
        })
    }
    verify() {
        window.MF && MF.navi("insurance/userInform.html?orderId=" + this.state.orderId);
        // this.next();
    }
    next() {
        window.MF && MF.navi("apply/beneficiary.html?orderId=" + this.state.orderId)

    }
    render() {
        return (
            <div>
                <div className="text19 ml-auto mr-auto mt-3" style={{textAlign:"center"}}>
                    被保险人告知<br/>详细告知被保险人身体健康状况
                </div>
                <div className="ml-auto mr-auto mt-3" style={{textAlign:"center"}}>
                    <img style={{width:"203px", height:"158px"}} src="../images/healthverify.png"/>
                </div>
                <div className="mt-3">
                    <div className="btn-fl text18 tc-white bg-primary" onClick={this.verify.bind(this)}>开始录入</div>
                </div>
                <div className="tc-gray text14 ml-auto mr-auto mt-3" style={{textAlign:"center"}}>
                    整个过程不超过5分钟，且录入结果<br/>仅对告知有效，请认真录入信息
                </div>
                <div className="bottom text18 tc-primary">
                    <div className="ml-3 mr-auto">
                    </div>
                    <div className="mr-3" onClick={this.next.bind(this)}>
                        受益人
                    </div>
                </div>
            </div>
		)
    }
}

$(document).ready( function() {
    ReactDOM.render(<Main/>, document.getElementById("root"))
})