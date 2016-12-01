import React from 'react';
import {
    Router,
    Route,
    hashHistory,
    IndexRoute
} from 'react-router';
import ReactDOM from 'react-dom';
import Fastclick from 'fastclick';
import App from './examples/App';
import {
    IndexPage,
    Detail
} from './examples/Detail';
import '../src/styles/react-mui.scss';
import './styles/docs.scss';
// activate fastclick
Fastclick.attach(document.body);
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IndexPage}></IndexRoute>
            <Route path=":component" component={Detail}></Route>
        </Route>
    </Router>,
    document.getElementById('app'));