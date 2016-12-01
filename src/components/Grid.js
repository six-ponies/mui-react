/**
 * @file This file exports Grid component
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-01
 */
import React from 'react';
import classnames from 'classnames';

const Grid = React.createClass({
    propTypes: {
        component: React.PropTypes.node,
        wrap: React.PropTypes.oneOf(['wrap', 'wrap-reverse']),
        align: React.PropTypes.oneOf(['right', 'center', 'between', 'around']),
        avg: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            component: 'div'
        }
    },
    render: function() {
        let {
            component: Component,
            wrap,
            align,
            avg,
            ...props
        } = this.props;
        let base = 'row';
        let rowClass = classnames(base, {
            [`${base}-${wrap}`]: wrap,
            [`${base}-${align}`]: align,
            [`${base}-avg-${avg}`]: avg
        });
        return (
            <Component className={rowClass} {...props}></Component>
        );
    }
});

export default Grid;