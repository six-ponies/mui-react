/**
 * Button
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-01
 */

import React from 'react';
import classnames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

const Button = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        block: React.PropTypes.bool,
        componentClass: elementType,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        onClick: React.PropTypes.func,
        type: React.PropTypes.oneOf(['button', 'submit', 'reset'])
    },
    getDefaultProps: function() {
        return {
            block: false,
            active: false,
            disabled: false
        };
    },
    render: function() {
        const {
            active,
            disabled,
            className,
            href,
            type,
            block,
            componentClass,
            ...props
        } = this.props;
        const Component = componentClass || 'button';
        const fullClassName = classnames('btn', className, {
            'btn-block': block,
            'active': active,
            'disabled': disabled
        });
        if (href) {
            return (
                <a {...props} href={href} className={fullClassName}></a>
            );
        }
        return (
            <Component {...props} type={type || 'button'} className={fullClassName} />
        );
    }
});

export default Button;