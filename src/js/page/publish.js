/**
 * Created by guminji on 2019/9/24.
 */
import React,{Component} from 'react';
import Upload from '../component/common/upload/upLoadImg';
import Header from '../component/common/header/header.js';

require('../../css/page/publish.less')
export default class publish extends Component{
    constructor(props){
        super(props)
        this.initData()
    }
    //初始化数据
    initData(){
        this.state ={
            title:'',
            content:'',
            pictures:[]
        }
    }
    reject(){
        toast.warn('上传照片失败')
    }
    success(photos){
        photos.forEach((photo,index)=>{
            this.state.pictures.push(photo.path)
        })
        //this.state.pictures = photos
        ajax('./api/unauth/publish',{
            method:'post',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:JSON.stringify({
                title:this.state.title,
                content:this.state.content,
                photos:this.state.pictures,
            }),
            mode:'cors',
            cache:'default'
        }).then((res)=>{
            //设置cookie
            this.props.history.push('index')
        },(res)=>{
            toast.warn('上传失败')
            console.log('fail',res)
        })
    }
    upload(photos){
        this.child.upload();
    }
    onRef(ref){
        this.child = ref;
    }
    //渲染方法
    render(){
        return(
                <div id="publish">
                    <Header upload={this.upload.bind(this)} history={this.props.history}/>
                    <div className="title">
                        <input type="text" placeholder="输入标题"  onChange={(e)=>{this.state.title = e.target.value}}/>
                    </div>
                    <div className="content">
                        <textarea  placeholder="正文内容.."  onChange={(e)=>{this.state.content = e.target.value}} />
                    </div>
                    <Upload onRef = {this.onRef.bind(this)} resolve = {this.success.bind(this)} reject={this.reject.bind(this)} />
                </div>


        )
    }
}