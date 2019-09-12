/**
 * Created by guminji on 2019/9/9.
 */
//整个项目的入口文件
var React = require('react');
var ReactDom = require('react-dom');

//require("../css/common.less");
require("../css/index.css");
require("../css/common.less")

ReactDom.render(<h1>hello world</h1>,
    document.getElementById('root')
);
//require("./static/css/index.css");
//var test = require('./js/test.js');
//console.log('aaa');