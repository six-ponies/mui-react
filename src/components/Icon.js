import React from 'react';
import classnames from 'classnames';
const Icon = React.createClass({
    propTypes: {
        component: React.PropTypes.node,
        classPrefix: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            classPrefix: 'iconfont',
            component: 'i'
        }
    },
    render() {
        let {
            classPrefix,
            component: Component,
            name,
            ...props
        } = this.props;
        let iconClass = classnames(classPrefix, {
            [`${classPrefix}-${name}`]: name
        })
        return (
            <Component className={iconClass} {...props}></Component>
        );
    }
});

export default Icon;