import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';
let TabBar = React.createClass({
    propTypes: {
        classPrefix: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            classPrefix: 'tabbar'
        }
    },
    render() {
        let {
            classPrefix,
            ...props
        } = this.props;
        return (
            <nav className={classPrefix} {...props}></nav>
        );
    }
});

let TabBarItem = React.createClass({
    propTypes: {
        component: React.PropTypes.any,
        classPrefix: React.PropTypes.string,
        active: React.PropTypes.bool,
        icon: React.PropTypes.string,
        href: React.PropTypes.string,
        title: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            component: 'span',
            classPrefix: 'tabbar',
            active: false
        }
    },
    renderTitle() {
        let {
            title,
            classPrefix
        } = this.props;
        return title ? (<span className={`${classPrefix}-title`}>{title}</span>) : null;
    },
    renderIcon() {
        let {
            icon
        } = this.props;
        return icon ? (
            <Icon name={this.props.icon}></Icon>
        ) : null;
    },
    render() {
        let {
            classPrefix,
            active,
            component: Component,
            ...props
        } = this.props;
        Component = this.props.href ? 'a' : Component

        delete props.icon;
        delete props.title;

        let itemClass = classnames(`${classPrefix}-item`, {
            'active': active
        });
        return (
            <Component className={itemClass} {...props}>{this.renderIcon()}{this.renderTitle()}</Component>
        );
    }
});

TabBar.Item = TabBarItem;
export default TabBar;