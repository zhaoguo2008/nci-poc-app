class Main extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentDidMount() {
        window.MF && MF.setTitle("新华人寿")
    }
    render() {
        return (
            <div className="mine-wrap">
                <ul class="tg-list">
                  <li class="tg-list-item">
                    <input class="tgl tgl-ios" id="cb2" type="checkbox"/>
                    <label class="tgl-btn" for="cb2"></label>
                  </li>
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Main/>, document.getElementById("root"))
