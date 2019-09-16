/**
 * Created by guminji on 2019/9/9.
 */
//整个项目的入口文件
var React = require('react');
var ReactDom = require('react-dom');
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { browserHistory , IndexRoute, hashHistory} from 'react-router';
import routes from './router/router-config.js'; //路由配置
import {login} from './page'; //页面

//引入样式
require("../css/login.less");
require("../css/index.css");
require("../css/common.less");

//引入自适应rem font-size变化
function resetWidth() {

    // 兼容ie浏览器 document.body.clientWidth

    var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;

    console.log(baseWidth);

    // 默认的设置是375px(ip6)的根元素设为100px, 其他的手机都相对这个进行调整

    document.documentElement.style.fontSize = baseWidth / 750 * 100 + 'px'

}

resetWidth();

window.addEventListener('resize', function () {

    resetWidth();

})

//渲染页面
ReactDom.render(
    routes,
    document.getElementById('root')
)
