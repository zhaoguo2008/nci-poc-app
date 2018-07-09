class Insurance extends React.Component {
    constructor() {
        super();
        this.state = {
            tabs:[
                {tabName:"被保险人1",id:1},
                {tabName:"被保险人2",id:2},
                {tabName:"被保险人3",id:3}
            ],
            currentIndex:1,
            orderId: common.param("orderId")
        }
    }
    componentWillMount () {
        let tabs = [];
        APP.apply.view(this.state.orderId, r => {
            console.log(JSON.stringify(r.detail));
            r.detail.insurants.map((item, index) => {
                tabs.push({tabName:`被保险人${ index + 1}`,id:index + 1});
                return tabs;
            });
            alert(tabs.length);
            /*this.setState({
                tabs: tabs
            })*/
        })
    }
    componentDidMount() {
        window.MF && MF.setTitle("录入被保人告知");
        localStorage.clear('userInfrom');
    }
    tabChoiced=(id)=>{
        // tab切换的方法
        this.setState({
            currentIndex:id
        });
    }
    myChoice (num) {
        if (!$('.inform-list dl:eq('+ num +') .noChoice input:radio').is(':checked')){
            $('.inform-list dl:eq('+ num +') .is-fill-in').hide();
        } else {
            $('.inform-list dl:eq('+ num +') .is-fill-in').show();
        }
    }
    OnSubmit () {  // 提交
        let arrMsg = [];
        let mySel = '';
        $('.inform-list dl').each(function (index) {
            mySel = $('.inform-list dl:eq('+index+') input:checked').prev().text();
            if (!mySel) {
                mySel = $('.inform-list dl:eq('+index+') .input-val input').val();
            }
            arrMsg.push(mySel)
        })
        console.log(arrMsg);
        window.MF && MF.navi("apply/beneficiary.html?orderId=" + this.state.orderId);
    }   
    render(){
        var _this=this;
            var tabList= this.state.tabs.map(function(res,index) {
                var tabStyle=res.id==this.state.currentIndex ? 'subCtrl active' : 'subCtrl';
                return    <div key={index} onClick={this.tabChoiced.bind(_this,res.id)} className={tabStyle}>{res.tabName}<b></b></div>
            }.bind(_this));
        return (
            <div className="inform-wrap">
                <div className="inform-user">
                    {tabList}
                </div>
                <div className="inform-list">
                    <dl>
                        <dt>1、被保险人的身高(厘米cm / 体重(千克kg)</dt>
                        <dd className="input-val">
                            <p>
                                <span>身高</span>
                                <input type="text" placeholder="请输入身高" />
                            </p>
                            <p>
                                <span>体重</span>
                                <input type="text" placeholder="请输入体重"/>
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>2、您是否曾患有下列疾病或因下列疾病而接受检查或治疗？</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio1" defaultChecked /><label for="radio1"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio1"/><label for="radio1"></label>
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>3、您在最近12个月内是否有身体不适症状？</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio2" defaultChecked/><label for="radio2"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio2"/><label for="radio2"></label>
                            </p>
                        </dd>
                    </dl>
                    <dl onClick={this.myChoice.bind(this,3)}>
                        <dt>4、是否有吸烟习惯？如有请告知每日吸烟量与年数。</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio3" defaultChecked /><label for="radio3"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio3"/><label for="radio3"></label>
                            </p>
                            <p className="is-fill-in">
                                <span>烟龄/年</span>
                                <input type="number" placeholder="请输入烟龄"/>
                            </p>
                        </dd>
                    </dl>
                    <dl onClick={this.myChoice.bind(this,4)}>
                        <dt>5、您是否投保过或正在申请其他公司人寿保险？</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio4" defaultChecked /><label for="radio4"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio4"/><label for="radio4"></label>
                            </p>
                            <p className="is-fill-in">
                                <span>保险公司</span>
                                <input type="number" placeholder="公司名称"/>
                            </p>
                        </dd>
                    </dl>
                    <dl onClick={this.myChoice.bind(this,5)}>
                        <dt>6、被保人的医疗支付方式</dt>
                        <dd>
                            <p>
                                <span>公费医疗</span>
                                <input type="radio" name="radio5" defaultChecked /><label for="radio5"></label>
                            </p>
                            <p>
                                <span>社会医疗保险</span>
                                <input type="radio" name="radio5" /><label for="radio5"></label>
                            </p>
                            <p>
                                <span>商业医疗保险</span>
                                <input type="radio" name="radio5" /><label for="radio5"></label>
                            </p>
                            <p>
                                <span>自费</span>
                                <input type="radio" name="radio5" /><label for="radio5"></label>
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>7、被保险人是否从事潜水、跳伞、滑翔、攀岩、探险、武术比赛、摔跤比赛、特技表演、赛马、赛车、私人性质飞行活动（乘客身份搭乘民航客机除外）等带有危险性的活动。</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio6" defaultChecked /><label for="radio6"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio6"/><label for="radio6"></label>
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>8、您的祖父母、双亲、配偶、子女或兄弟姐妹中是否曾患肿瘤、癌症、心脏病、中风、高血压、糖尿病、精神病、抑郁症、乙型或其他类型肝炎（包括病毒携带者）、结核病、白血病；或任何遗传疾病？是否有早于60岁因疾病去世者？</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio7" defaultChecked /><label for="radio7"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio7"/><label for="radio7"></label>
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>9、本人已完全阅读并了解上述“年长客户购买保险特别提示”的内容和含义，理解所揭示的风险，将根据自身情况理性谨慎选择保险产品，并愿意承担可能出现的风险及损失。</dt>
                        <dd>
                            <p>
                                <span>否</span>
                                <input type="radio" name="radio8" defaultChecked /><label for="radio8"></label>
                            </p>
                            <p className='noChoice'>
                                <span>是</span>
                                <input type="radio" name="radio8"/><label for="radio8"></label>
                            </p>
                        </dd>
                    </dl>
                    
                </div>
                <div className="on-submit" onClick={this.OnSubmit.bind(this)}>
                    <button className="submit-btn">提交</button>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Insurance/>, document.getElementById("root"))
