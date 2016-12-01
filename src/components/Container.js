import React from 'react';
import classnames from 'classnames';
import assign from 'core-js/library/fn/object/assign';
/**
 * Container
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-01
 */
const Container = React.createClass({
    propTypes: {
        fill: React.PropTypes.bool,
        scrollable: React.PropTypes.bool,
        className: React.PropTypes.string,
        column: React.PropTypes.bool,
        withPadding: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            column: false,
            scrollable: false,
            fill: false,
            withPadding: true
        };

    },
    render: function() {
        let {
            fill,
            scrollable,
            className,
            column,
            withPadding,
            ...props
        } = this.props;
        let containerClass = classnames('container', className, {
            'fill': fill,
            'scrollable': scrollable,
            'column': column
        });
        if (!withPadding) {
            assign(props, {
                style: {
                    padding: '0'
                }
            });
        }
        return (
            <div className={containerClass} {...props}></div>
        );
    }
});

export default Container;