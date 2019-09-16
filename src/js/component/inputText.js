/**
 * Created by guminji on 2019/9/15.
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