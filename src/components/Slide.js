/**
 * @file This file exports a Slide component
 * @author mayingcong <mayingcong@xingxy.cn>
 * @deprecated  2016-11-03
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TRANSITION_TIME = 300;
const Slide = React.createClass({
    render() {
        let {
            transition,
            ...props
        } = this.props;
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="slide-container"
                transitionName={transition}
                transitionEnterTimeout={TRANSITION_TIME}
                transitionLeaveTimeout={TRANSITION_TIME}
                {...props}
            >
            </ReactCSSTransitionGroup>
        );
    }
});

const SlideItem = React.createClass({
    render() {
        return (
            <div className="slide" {...this.props}></div>
        );
    }
});

Slide.Item = SlideItem;

export default Slide;