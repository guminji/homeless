/**
 * Created by guminji on 2019/9/24.
 */
import React,{Component} from 'react';
require('./header.less');
/**
 * 方法说明
 * @method 方法名
 * @for 所属类名
 * @param {function} success 上传文件
 * @return {返回值类型} 返回值说明
 */
export default class header extends Component{
    constructor(props){
        super(props)
        this.initData();
    }
    //初始化数据
    initData(){
        this.state = {

        }
    }
    componentDidMount(){

    }

    //渲染方法
    render(){

        return(
            <div id="header-component" >
                <div className="titles" >发布帖子</div>
                <div className="btnContainer">
                    <div className="goBack" onClick={()=>{this.props.history.goBack()}}>返回</div>
                    <div className="upload" onClick={this.props.upload}>发布</div>
                </div>
            </div>
        )
    }
}