/**
 * Created by guminji on 2019/9/22.
 */
//全局变量
import toast from './component/common/toast' ;
import ajax from './api/fetch' ;
import cookie from 'react-cookies'
global.cookie = cookie;//cookie操作对象
global.toast = toast;//公共toast层
global.ajax = ajax;//网络请求方法