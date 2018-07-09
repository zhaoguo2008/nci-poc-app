class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            loginName:'',
            passWord:'',
        }
    }
    componentDidMount() {
        window.MF && MF.setTitle("新华人寿")
    }
    loginData(inputValue){
        let e = window.event || arguments[0];
        if(inputValue == 'name'){
            this.setState({
                loginName:e.target.value
            },()=>{
                console.log(this.state.loginName)
            })
        }else{
            this.setState({
                passWord:e.target.value
            })
        }

    }
    login() {
        let that = this
        if(this.refs.loginName.value == ''){
            alert('登录账号不能为空！')
        }else if(this.refs.password.value == ''){
            alert('登录密码不能为空!')
        }else{
            APP.login(this.refs.loginName.value, this.refs.password.value, data => {
                that.setState({ login: "true" });
                if(window.MF){
                    localStorage.channelId = data.channelId;
                    localStorage.orgId = data.orgId;

                    MF.setEnv("userKey", data.userKey);
                    MF.setEnv("orgId", data.orgId);
                    MF.navi("home/home.html");

                }else{
                    localStorage.channelId = data.channelId;
                    localStorage.orgId = data.orgId;
                    location.href = 'home.html';
                }
            }, r => {
                that.setState({ login: "fail" });
            })
           /* $.ajax({
                contentType: 'application/json',
                type:'POST',
                url:"http://114.112.96.30:10003/app/user/login.json",
                data:JSON.stringify({
                    "loginName":this.refs.loginName.value,
                    "password":this.refs.password.value
                }),
                success(data){
                    if (data.result == "success") {
                        if(window.MF){
                            localStorage.channelId = data.content.channelId
                            localStorage.orgId = data.content.orgId

                            MF.setEnv("userKey", data.content.userKey);
                            MF.setEnv("orgId", data.content.orgId);
                            MF.navi("home/home.html")

                        }else{
                            localStorage.channelId = data.content.channelId
                            localStorage.orgId = data.content.orgId
                             location.href = 'home.html'
                        }
                        that.setState({ login: "true" })
                    } else {
                        that.setState({ login: "fail" })
                    }

                },
                error(err){
                    console.log(err, 'err')
                }
            })*/

        }
    }
    render() {
        return (
            <div className="loginMain">
                <img src="../images/login/loginB.png" className="loginB"/>
                <div className="loginBox">
                    <span className="Title">新华保险</span>
                    <img src="../images/login/loginportrait.png" className="portrait"/>
                    <div className="loginNP">
                        <input type="text" ref="loginName" placeholder="请输入账号" onChange={this.loginData.bind(this,'name')} value={this.state.loginName}/>
                        <input type="password" ref="password" placeholder="请输入密码" onChange={this.loginData.bind(this,'password')} value={this.state.passWord}/>
                    </div>
                    { this.state.login == "fail" ? <div className="ml-2 mt-1 tc-red text14">账号或密码错误</div> : null }
                    <div className="loginB" onClick={this.login.bind(this)}>
                        登 录
                    </div>
                    <div className="forget">
                        <span>忘记密码？</span>
                    </div>
                </div>
                <div className="loginRegister">
                    <span>
                        还没有账号？点击<a href="javascript:void(0)">立即注册</a>
                    </span>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Main/>, document.getElementById("root"))
