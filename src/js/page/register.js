/**
 * Created by guminji on 2019/9/13.
 */
import React, { Component } from 'react'
import InputText from '../component/inputText';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class register extends Component {
    constructor(){
        super();
        this.state ={
            name:'',
            psd:''
        }
    }
    //改变用户名
    changeName(event){
        this.setState({name: event.target.value})
        console.log("name",event.target.value);
        //this.state.name = name;
    }
    //修改密码
    changePassword(event){
        this.setState({psd:event.target.value});
    }
    //提交信息
    submit(){
        //提交信息
        console.log('information',this.state);
    }
    render() {
        return (
            <div id="login">
                <div className="container">
                    <div className="logo"></div>
                    <div className="form">
                        <div className="textContainer">
                            <i className="userIcon"></i>
                            <InputText className = "loginText" placeholder ="请输入" changeFn={this.changeName.bind(this)} name={this.state.name} />
                        </div>
                        <div className="textContainer">
                            <i className="pswIcon"></i>
                            <input type="password" className="loginPsw" value={this.psd} placeholder="输入密码" onChange={this.changePassword.bind(this)}/>
                        </div>
                        <div className="submit" onClick={this.submit.bind(this)}>
                            <p>登录</p>
                        </div>
                        <div className="otherFn clearfix">
                            <p onClick={()=> {this.props.history.push('./register')}}>注册</p>
                            <p onClick={()=> {this.props.history.push('./changePwd')}}>忘记密码</p>
                        </div>
                    </div>
                </div>
            </div>
            //<h1>Hello</h1>
        );
    }
}
//export default class Login extends Component {
//    constructor(props, context) {
//        super(props)
//        this.state = {
//            //loading: false,
//            //isCertificates: false,
//            //show: true,
//        }
//    }
//    onClickSend(){
//        console.log('hello world!')
//    }
//
//    render(){
//        return (
//            <div className="page">
//                示范页面
//                <div>
//                    <Button onClick={this.onClickSend}>发送</Button>
//                </div>
//            </div>
//        )
//    }
//}