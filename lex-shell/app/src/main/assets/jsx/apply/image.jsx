class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            orderId: common.param("orderId"),
        }
    }
    componentWillMount() {
        MF.setTitle("影像");
        // localStorage.applicantCardData && cardJson.push(localStorage.applicantCardData);
        // localStorage.insurantsCardData && cardJson.push(localStorage.insurantsCardData);
        // localStorage.beneficiaryCardData && cardJson.push(localStorage.beneficiaryCardData);
        // localStorage.payCardData && cardJson.push(localStorage.payCardData);
        this.setState({
            cardData: JSON.parse(localStorage.CardData)
        }, () => {
        console.log(this.state.cardData);
        });
    }
    next() {
            // MF.navi("apply/preview.html?orderId=" + this.state.orderId)
            window.MF &&  MF.navi("xinhua_lx/autograph_xh.html?orderId=" + this.state.orderId)

    }
    render() {
        return (
            <div>
                <div style={{overflowY:'scroll',display:"flex", flexWrap: 'wrap', justifyContent:'spaceAround'}}>
                    {
                        this.state.cardData && this.state.cardData.map((prod)=>{
                            return(
                                <p style={{width: '40%', padding:"5px 5px"}}>
                                    <img src={'data:image/png;base64,' + prod} style={{width:'100%'}}/>
                                </p>
                            )
                        })
                    }
                </div>

                <div className="bottom text18 tc-primary">
                    <div className="ml-3 mr-auto">
                    </div>
                    <div className="mr-3" onClick={this.next.bind(this)}>
                        预览
                    </div>
                </div>
            </div>
		)
    }
}

$(document).ready( function() {
    ReactDOM.render(<Main/>, document.getElementById("root"))
})