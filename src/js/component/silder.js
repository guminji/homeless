/**
 * Created by guminji on 2019/9/17.
 */
/**
 * 轮播类
 * @constructor 类名
 * @param {boolean} arrow 是否需要箭头
 * @param {array} informations 轮播图的数据
 */
import React,{Component} from 'react';
//css样式引入
require('../../css/component/home/silder.less');
export default class carousel extends Component{
    constructor(props){
        super(props);
        this.curPage = 1;//当前的轮播页数 初始化默认为第一张开始
        this.allNum = this.props.informations.length-1;//轮播图总数
        this.sildering = false;//是否正在轮播中 默认初始化时候不在滚动
        this.canAutoSilder = true;//能否自动播放 某些情况下不能自动播放
        this.state={
            left:0, //container的left属性 用于控制动画左右移动
            perWidth:'100%',//每张轮播图的宽度
            carouselContainerStyle:{}//自适应长度 不同的图片数量不同的长度
        }
        this.state.resetProps= {}//初始量 还未用到
    }
    //元素被插入后的回调
    componentDidMount() {
        //当没有动作时候就是自动播放
        this.autoSilder();
    }
    //跳转页面
    /**
     * 方法说明
     * @turnPage
     * @params {number} curPage 当前的轮播的页数
     * @params {number} gotoPage 需要跳转的轮播页面
     * @return {null}
     */
    turnPage(curPage = 0,gotoPage = 1) {
        //获取插件是否正在轮播的状态 状态为正在播放时候自动忽略下一步播放的指令
        curPage = curPage||this.curPage;
        if (!!this.getSilderingState()) return;
        //当指令滚动到当前页的时候 直接忽略
        if(curPage == gotoPage) return;
        //滚动时候去除自动播放的定时器
        this.autoTimer&&clearTimeout(this.autoTimer);//消除定时器自动滚动效果
        //定义轮动的方向
        var direction = curPage<gotoPage?'left':'right';
        //滚动页数
        var silderNum = Math.abs(curPage - gotoPage);
        //滚动距离
        var distance = direction=='left'?-silderNum*100:silderNum*100;
        //执行动画
        this.anmation(distance,gotoPage);
    }
    //跳转上一页
    goNext(){
        this.turnPage(this.curPage,this.curPage+1);
    }
    //跳转下一页
    goPre(){
        var gotoPage = (this.curPage-1<=0)?this.allNum:this.curPage-1;
        this.turnPage(this.curPage,gotoPage)
    }
    //滚动动画函数
    /**
     * 方法说明
     * @anmation 滚动动画
     * @for 所属类名
     * @param {number} distance 滚动的距离 有正负值 正值表示向右滚动 负值表示向左滚动
     * @param {number} goPage 最终滚动到轮播的索引值 用于动画播放完之后 状态的更新
     * @return {null} 返回值说明
     */
    anmation(distance = 100,goPage = 2){
        //设置轮播图的播放状态为正在执行中 防止其他动作相互影响
        this.setSilderingState(true);
        //设置一次轮播动画的时间 默认为500毫秒
        var time =this.props.time||200;
        //以10毫秒为单位 作为一次timer函数的时间间隔
        var times = time/20;
        //执行一次timer函数所移动的距离
        var perDistance = distance/times;
        var moveTime = 0;//累计动画值 用于判断何时动画结束的状态
        //timer函数 用于滚动轮播图 使其达到滚动的动画效果
        this.timer = setInterval(()=>{
            //判断条件 动画是或否完成
            if(moveTime>=times){
                //已完成动画
                //清除动画继续执行
                clearInterval(this.timer);
                //当滚动到最后一页时候需要 把left和curPage还原以便下一次正常播放(轮播效果达到自然会在最后放置第一张图 做动画的时候达到无缝滚动的效果)
                if(goPage>this.allNum){
                    this.curPage = 1;
                    this.state.left = 0;
                }else{
                    this.curPage = goPage;
                }
                //设置状态更新
                this.setState({
                    left:(this.state.left)
                })
                //动画播放完成 设置可以轮播状态
                this.setSilderingState(false);
                //自动播放函数
                this.autoSilder();
                return;
            }
            //未完成动画
            //设置状态更新
            this.setState({
                left:(this.state.left+perDistance)
            })
            //动画数累计加1
            moveTime++
        },20)
    }
    //获取轮播图动画状态
    getSilderingState(){
        return this.sildering;
    }
    //设置轮播图动画执行状态 true||false 表示是否正在滚动中
    setSilderingState(state){
        this.sildering = state;
    }
    //设置页面滚动到某一页
    setcurPage(num){
        this.curPage = num;
    }

    componentWillUnmount() {
        //清除两个计时器 防止内存泄露
        this.timer&&clearInterval(this.timer);
        this.autoTimer&&clearTimeout(this.autoTimer);
    }
    //自动轮播
    autoSilder(){
        //判断状态是否需要自动播放
        if(!!this.getSilderingState()||!this.canAutoSilder) return;
        //去除上一次的定时器
        this.autoTimer&&clearTimeout(this.autoTimer);
        this.autoTimer = setTimeout(()=>{
            this.turnPage(this.curPage,this.curPage+1);
        },2000)
    }
    //操作绑定区域
    touchStart(e){
        this.startX = e.touches[0].clientX;

    }
    touchMove(e){
        this.endX = e.touches[0].clientX;
    }
    touchEnd(){
        let distance = Math.abs(this.startX - this.endX);
        if (distance > 50) {

            if (this.startX > this.endX) {
                //console.log('向左滑动');
                this.goNext();
            } else {
                //console.log('向右滑动');
                this.goPre();
            }
        }
    }

    createDots(dotsNum){
        var dotsList=[];
        for(var i=0;i<dotsNum;i++){
            if(i == this.curPage-1){
                var text = (<span className="dots active" key={'dots-'+i+1} onClick={this.turnPage.bind(this,'',i+1)}></span>)
            }else{
                var text = (<span className="dots" key={'dots-'+i+1} onClick={this.turnPage.bind(this,'',i+1)}></span>)
            }
            dotsList.push(text);
        }
        return dotsList;
    }
    swiperPage(url){
        this.props.history.push(url)
    }
    //渲染方法
    render(){
        var informations = this.props.informations;
        informations.concat([informations[0]]);
        this.state.carouselContainerStyle ={width:(this.props.informations.length*100+'%'),left:(this.state.left+'%')}
        this.state.perWidth = {width:(100/this.props.informations.length+'%')}
        //console.log('informations',informations);
        var informationList = informations.map((information,index)=>
            <div className="informationList" key={"information"+index} style={this.state.perWidth}>
                <img src={information.imageUrl} onClick={this.swiperPage.bind(this,information.url)} />
            </div>
        )
        var dotsList =this.createDots(informations.length-1);

        //console.log('informationList',informationList);
        return(
            <div className="carousel" onTouchStart={this.touchStart.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchEnd={this.touchEnd.bind(this)} >
                {this.props.arrow?<div className="leftArrow" onTouchStart={this.goPre.bind(this)}>点我</div>:''}
                {this.props.arrow?<div className="rightArrow" onTouchStart={this.goNext.bind(this)}>点我</div>:''}
                <div className="carouselContainer" style={this.state.carouselContainerStyle}>
                    {informationList}
                </div>
                <div className="dotsContainer">
                    {dotsList}
                </div>
            </div>

        )
    }
}