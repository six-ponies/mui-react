/**
 * List
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-01
 */

import React from 'react';
import classnames from 'classnames';

const List = React.createClass({
    propTypes: {
        classPrefix: React.PropTypes.string,
        borderPadding: React.PropTypes.oneOf(['none', 'left', 'right', 'both'])
    },
    getDefaultProps: function() {
        return {
            classPrefix: 'list-group',
            borderPadding: 'none'
        };
    },
    render: function() {
        let {
            classPrefix,
            borderPadding,
            ...props
        } = this.props,
            listGroupClass = classnames(classPrefix, {
                [`border-padding-${borderPadding}`]: borderPadding !== 'none'
            });
        return (
            <div className={listGroupClass} {...props}></div>
        );
    }
});

const ListItem = React.createClass({
    propTypes: {
        classPrefix: React.PropTypes.string,
        title: React.PropTypes.node,
        subtitle: React.PropTypes.node,
        content: React.PropTypes.node,
        right: React.PropTypes.node,
        mid: React.PropTypes.node,
        href: React.PropTypes.string,
        shouldCenter: React.PropTypes.bool,
        color: React.PropTypes.string,
        media: React.PropTypes.node
    },
    getDefaultProps: function() {
        return {
            classPrefix: 'list-group-item',
            shouldCenter: false
        };
    },

    /**
     * Render left component
     * @param  {React.ProtoTypes.node} media 
     * @param  {React.ProtoTypes.node} title 
     * @return {Object}      
     */
    renderLeft(media, title) {
        let classPrefix = this.props.classPrefix;
        if (media) {
            return <div className={`${classPrefix}-left`}>{media}</div>
        } else if (title) {
            return <div className={`${classPrefix}-left`}>{title}</div>
        } else {
            return null;
        }
    },

    /**
     * Render right component
     * @param  {React.ProtoTypes.node} media    
     * @param  {React.ProtoTypes.node} title    
     * @param  {React.ProtoTypes.node} subtitle 
     * @param  {React.ProtoTypes.node} content  
     * @param  {React.ProtoTypes.node} right    
     * @return {Object}       
     */
    renderRight(media, title, subtitle, content, right) {
        let classPrefix = this.props.classPrefix;
        if (media) {
            return (
                <div className={`${classPrefix}-right-expand`}>
                    <div className={`${classPrefix}-title-row`}><div className={`${classPrefix}-title`}>{title}</div>{right}</div>
                    {subtitle ? <div className={`${classPrefix}-subtitle`}>{subtitle}</div> : null }   
                    {content ? <div className={`${classPrefix}-content`}>{content}</div> : null}
                </div>
            )
        } else if (right) {
            return <div className={`${classPrefix}-right`}>{right}</div>;
        } else {
            return null;
        }
    },

    /**
     * Render middle component
     * @param {Object} mid Component you want to render into the middle of the List
     * @param {Boolean} shouldCenter Whether the mid component should be put in the right center of the List
     * @return {Object} Wrapped middle component
     */
    renderMid(mid, shouldCenter) {
        let classPrefix = this.props.classPrefix;
        if (!mid) {
            return null;
        } else if (shouldCenter) {
            // fuck center requirement
            return <div className={`${classPrefix}-center`}><div>{mid}</div></div>;
        } else {
            return <div className={`${classPrefix}-mid`}>{mid}</div>
        }
    },
    render: function() {
        let {
            title,
            subtitle,
            content,
            right,
            mid,
            media,
            classPrefix,
            href,
            shouldCenter,
            color,
            ...props
        } = this.props,
            itemClassName = classnames(classPrefix, {
                [`${classPrefix}-${color}`]: color
            }),
            Component = 'div';

        if (href) {
            Component = 'a';
            props.href = href;
        }
        delete props.children;
        return (
            <Component className={itemClassName} {...props}>
                {this.renderLeft(media, title)}
                {this.renderMid(mid, shouldCenter)}
                {this.renderRight(media, title, subtitle, content,right)}
            </Component>
        );
    }
});

List.Item = ListItem;
export default List;