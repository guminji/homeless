/**
 * Created by guminji on 2019/9/13.
 */
import React from 'react'
//import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
//import { isLogin } from '@configs/common'
import { login,register} from '../page'
//
//import * as base from '@pages/base' // 基础
//import * as sysSet from '@pages/set' // 设置中心-系统设置
//import * as menu from '@pages/menu' // 菜单
var routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={login} />
            <Route exact path="/register" component={register} />
        </Switch>
    </Router>
)
export default routes;