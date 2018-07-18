class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            imgSrc:[
                '../images/introduce1.gif',
                '../images/introduce2.gif',
                '../images/introduce3.gif',
                '../images/introduce4.gif',
                '../images/introduce5.gif'
            ]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="loginMain">
                <div className='PlayerMain'>
                    <img src="../images/15260226247471255732456.png" alt="" style={{width:'100%'}}/>
                </div>
                <ul className="conpanyIn">
                    {
                        this.state.imgSrc.map((prod)=>{
                            return(
                                <li>
                                    <img src={prod} alt=""/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Main/>, document.getElementById("root"))
