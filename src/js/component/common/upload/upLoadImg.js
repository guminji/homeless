/**
 * Created by guminji on 2019/9/24.
 */
import React,{Component} from 'react';
require('./upLoadImg.less');
/**
 * 方法说明
 * @method 方法名
 * @for 所属类名
 * @param {function} success 上传文件
 * @return {返回值类型} 返回值说明
 */
export default class upLoadImg extends Component{
    constructor(props){
        super(props)
        this.initData();
    }
    //初始化数据
    initData(){
        this.state = {
            photos:[],
        }
    }
    componentDidMount(){
        this.props.onRef(this);
        console.log(this); // ->将child传递给this.props.onRef()方法
    }
    //添加图片
    addPicture(event){
        console.log('上传的图片',event.target.files);
        var length = event.target.files.length;
        var loadNum = 0;
        var files = event.target.files;
        function allLoad(){
            this.setState({
                photos:this.state.photos
            })
        }
        for(var i=0;i<event.target.files.length;i++){
            var fr = new FileReader();
            var file = event.target.files[i];
            this.state.photos.push(event.target.files[i])
            fr.onloadend = (e) =>{
                file.imgUrl = e.target.result;
                //this.state.photos.push({imgUrl:e.target.result})
                loadNum++
                if(loadNum == length){
                    console.log('获取完毕');
                    allLoad.apply(this);
                }
            };
            fr.readAsDataURL(file);
        }


    }
    upload(sucess,fail){
        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        for(var i=0, f; f=this.state.photos[i]; i++){
            formData.append('files', f);
        }
        xhr.onreadystatechange =  (e) =>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    this.props.resolve(JSON.parse(xhr.responseText));
                }else {
                    this.props.reject(JSON.parse(xhr.responseText));
                }
            }
        }

        xhr.open('POST', '/api/upload', true);
        xhr.send(formData);
    }
    //上传图片

    //渲染方法
    render(){
        var photoList = this.state.photos.map((photo)=>
            <div className="photos">
                <img src={photo.imgUrl} />
            </div>
        )
        return(
            <div className="uploadImg">
                {photoList}
                <div className="photos button" onClick={()=>{this.refs.test.click()}}>+</div>
                <input ref="test" type="file" onChange={this.addPicture.bind(this)} style={{display:'none'}}/>
            </div>
        )
    }
}