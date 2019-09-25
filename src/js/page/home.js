/**
 * Created by guminji on 2019/9/17.
 */
/**
 * 首页类
 * @home 类名
 * @param {string}
 * @param {string}
 */

import React,{Component} from 'react';
import Carousel from '../component/silder.js';
import Nav from '../component/home/nav.js';
import List from '../component/home/list/homeList.js';
import NavFooter from '../component/home/footer/nav-footer.js';
require('../../css/page/home.less');
export default class home extends Component{
    constructor(props){
        super(props)
        this.state = {
            informations:[
                {imageUrl:'./static/images/test/lunbo1.jpeg',url:'index'},
                {imageUrl:'./static/images/test/lunbo2.jpeg',url:'./details/test2'},
                {imageUrl:'./static/images/test/lunbo3.jpeg',url:'./details/test3'},
                {imageUrl:'./static/images/test/lunbo1.jpeg',url:'./details/test1'},
            ],
            navs:[
                {imageUrl:'./static/images/home/icon_billbord.png',url:'index',title:'热榜'},
                {imageUrl:'./static/images/home/icon_emtion.png',url:'',title:'心情'},
                {imageUrl:'./static/images/home/icon_season.png',url:'',title:'季节'},
                {imageUrl:'./static/images/home/icon_present.png',url:'',title:'礼包'},
            ]


        }
        this.state.informations.concat(this.state.informations[0]);
        toast.loading('加载中',50000);
        this.getList();
    }
    getList(){
        ajax('./api/unauth/getList',{
            method:'post',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            mode:'cors',
            cache:'default'
        }).then((res)=>{
            //设置cookie
            console.log('success',res);
            //this.state.list = res.data;
            this.setState({
                list:res.data
            });
            toast.info('加载完成',500);
        },(res)=>{
            console.log('fail',res)
        })
    }

    componentDidUpdate(){
        //toast.loading('加载中',50000)
    }
    //渲染方法
    render(){
        console.log('renderHome');
        return(
            <div id="home">
                <div className="">
                    <Carousel history={this.props.history} informations={this.state.informations} />
                </div>
                <Nav history={this.props.history} navs={this.state.navs} />
                <div className="titleContainer">
                    <span className="title">定制推荐</span>
                    <span className="more" onClick={()=>{this.props.history.push('recommand/list')}}>了解更多</span>
                </div>
                {this.state.list&&<List list={this.state.list} />}
                <NavFooter />
            </div>

        )
    }
}
