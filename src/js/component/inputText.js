/**
 * 输入框类
 * @inputText 类名
 * @className {string} 样式名字
 * @value {string} 初始化的内容
 * @onChange {function} 改变内容时候的回调函数
 * placeholder {string} 输入框提示语
 */
import React,{ Component } from 'react';

export default class inputText extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <input type="text" className={this.props.className} value={this.props.name} placeholder={this.props.placeholder} onChange={this.props.changeFn}/>
        )
    }
}