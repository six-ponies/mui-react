/**
 * @file This file contains Backdrop component, which is used in Modal and Picker
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date 2016-11-10
 */

import React from 'react';
import classnames from 'classnames';

const Backdrop = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            isOpen: false
        };
    },
    render: function() {
        let {
            isOpen,
            ...props
        } = this.props;
        let backdropClass = classnames('backdrop', {
            'in': isOpen
        });
        // e.preventDefault() in onTouchMove is used to prevent background scrolling
        return (
            <div className={backdropClass} onTouchMove={(e) => {e.preventDefault()}} {...props}></div>
        )
    }
});

export default Backdrop;