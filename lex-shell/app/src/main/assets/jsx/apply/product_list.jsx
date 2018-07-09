class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        APP.apply.queryProduct(null, localStorage.channelId,localStorage.orgId,"nci", null, r => {
          this.setState({ list: r })
        })
    }
    addToPlan(code, name, id) {
        localStorage.mainProductCode = code;
        localStorage.mainProductName = name;
        localStorage.mainProductId = id;
        APP.back(code);

    }
    close() {
        APP.back()
    }
    render() {
        return (
            <div>
                <div className="lh-80 h-80 center">选择产品</div>
                { this.state.list.map((v, i) =>
                    <div className="list-item" onClick={this.addToPlan.bind(this, v.code,v.name,v.id)} key={i}>
                        <div className="list-item-icon">
                            <img src={v.icon}></img>
                        </div>
                        <div className="list-item-content">
                            <div className="text18" style={{height:"45px", lineHeight:"45px"}}>{v.name}</div>
                            <div className="text12" style={{height:"35px", lineHeight:"35px", color:"gray"}}>{v.code}</div>
                        </div>
                    </div>
                )}
            </div>
		)
    }
}

$(document).ready( function() {
	ReactDOM.render(<Main/>, document.getElementById("root"))
})