class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            orderId: common.param("orderId"),
        }
    }
    componentDidMount() {
        MF.setTitle("影像");
        var cardJson = []
        localStorage.applicantCardData && cardJson.push(localStorage.applicantCardData);
        localStorage.insurantsCardData && cardJson.push(localStorage.insurantsCardData);
        localStorage.beneficiaryCardData && cardJson.push(localStorage.beneficiaryCardData);
        localStorage.payCardData && cardJson.push(localStorage.payCardData);
        this.setState({
            cardData: cardJson
        });
    }
    next() {
            // MF.navi("apply/preview.html?orderId=" + this.state.orderId)
            window.MF &&  MF.navi("xinhua_lx/autograph_xh.html?orderId=" + this.state.orderId)

    }
    render() {
        return (
            <div>
                <div style={{overflow:'hidden'}}>
                    {
                        this.state.cardData && this.state.cardData.map((prod)=>{
                            alert(prod)
                            return(
                                <img src={prod} style={{width:'50%',height:'20%',float:'left'}}/>
                            )
                        })
                    }
                </div>

                <div className="bottom text18 tc-primary">
                    <div className="ml-3 mr-0" style={{width:"300px"}}></div>
                    <div className="divx" onClick={this.next.bind(this)}>
                        <div className="ml-0 mr-0" style={{width:"390px", textAlign:"right"}}>
                            预览
                        </div>
                        <div className="ml-1 mr-2" style={{width:"30px"}}>
                            <img className="mt-3" style={{width:"27px", height:"39px"}} src="../images/blueright.png"/>
                        </div>
                    </div>
                </div>
            </div>
		)
    }
}

$(document).ready( function() {
    ReactDOM.render(<Main/>, document.getElementById("root"))
})