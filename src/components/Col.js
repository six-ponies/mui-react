/** 
 * @file Col used with Grid to build grid system
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-01
 */
import React from 'react';
import classnames from 'classnames';

const Col = React.createClass({
    propTypes: {
        cols: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
        offset: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6])
    },
    render: function() {
        let {
            cols,
            offset,
            ...props
        } = this.props;
        cols = cols ? cols > 6 ? 6 : cols : 0;
        offset = offset ? offset > 6 ? 6 : offset : 0;
        let colClass = classnames('col', {
            [`col-${cols}`]: cols,
            [`col-offset-${offset}`]: offset
        });
        return (
            <div className={colClass} {...props}>
            </div>
        );
    }
});

export default Col;