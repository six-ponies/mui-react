import React from 'react';
import classnames from 'classnames';

/**
 * ButtonGroup
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-01
 */
const ButtonGroup = React.createClass({
    propTypes: {
        size: React.PropTypes.oneOf(['xs', 'sm', 'lg', 'xl']),
        justified: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            justified: false
        }
    },
    render() {
        let {
            size,
            justified,
            ...props
        } = this.props;
        let classPrefix = 'btn-group';
        let buttonGroupClass = classnames(classPrefix, {
            [`${classPrefix}-${size}`]: size,
            [`${classPrefix}-justified`]: justified
        });
        // if (justified) {
        //     props.children = props.children.map((value, key) => {
        //         return (<div className={classPrefix}>{value}</div>);
        //     });
        // }
        return (
            <div className={buttonGroupClass} {...props}></div>
        );
    }
});

export default ButtonGroup;