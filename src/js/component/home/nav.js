/**
 * Created by guminji on 2019/9/20.
 */
import React,{Component} from 'react';
//css样式引入
require('../../../css/component/home/nav.less');
export default class home extends Component{

    constructor(props){
        super(props)
    }
    //渲染方法
    render(){
        var navs = this.props.navs;
        console.log('navs',navs);
        var navsContent = navs.map((nav,index)=>
                <li onClick={()=>{this.props.history.push(nav.url)}} key = {index}>
                    <img src={nav.imageUrl}/>
                    <p>{nav.title}</p>
                </li>

        )
        return(
            <div className="nav">
                <ul>
                    {navsContent}
                </ul>
            </div>
        )
    }
}