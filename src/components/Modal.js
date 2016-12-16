/**
 * @file This file contains Modal Component
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date 2016-11-04
 */
import React from 'react';
import {
    unmountComponentAtNode,
    unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import Backdrop from './Backdrop';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

function noop() {}
/**
 * Modal component
 */
export const Modal = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool,
        type: React.PropTypes.string,
        title: React.PropTypes.node,
        footer: React.PropTypes.node,
        closeByBackdrop: React.PropTypes.bool,
        classPrefix: React.PropTypes.string,
        onDismissed: React.PropTypes.func,
        onClosed: React.PropTypes.func,
        boxShadow: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            boxShadow: true,
            closeByBackdrop: true,
            classPrefix: 'modal',
            onDismissed: noop,
            onClosed: noop
        };
    },
    getInitialState() {
        return {
            isOpen: this.props.isOpen
        };
    },
    componentWillReceiveProps(nextProps) {
        let isOpen = this.state.isOpen;
        if (!isOpen && nextProps.isOpen) {
            this.openModal();
        } else if (isOpen && !nextProps.isOpen) {
            this.closeModal();
        }
    },

    onDismissed() {
        var shouldClose = this.props.onDismissed();
        if (shouldClose === undefined || shouldClose) {
            this.closeModal();
        }
        console.log('bool ' + shouldClose);
    },
    onClosed() {
        var shouldClose = this.props.onClosed();
        if (shouldClose === undefined || (shouldClose && !shouldClose.then)) {
            this.closeModal();
        } else if (shouldClose && shouldClose.then) {
            shouldClose.then((data) => {
                if (data) {
                    this.closeModal();
                }
            })
        }
        console.log('bool ' + shouldClose);
    },

    /**
     * Open Modal
     */
    openModal() {
        if (!this.state.isOpen)
            this.setState({
                isOpen: true
            });
    },

    /**
     * Close Modal
     */
    closeModal() {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            });
        }
    },

    renderBackdrop() {
        let {
            closeByBackdrop
        } = this.props;
        let {
            isOpen
        } = this.state;
        if (closeByBackdrop) {
            return <Backdrop isOpen={isOpen} onClick={this.onDismissed}></Backdrop>
        } else {
            return <Backdrop isOpen={isOpen}></Backdrop>
        }
    },
    render() {
        let {
            isOpen
        } = this.state;
        let {
            title,
            children,
            type,
            footer,
            boxShadow,
            classPrefix
        } = this.props;
        let modalClass = classnames(classPrefix, {
            'box-shadow': boxShadow,
            'in': isOpen
        });
        return <ReactCSSTransitionGroup
                    component="div"
                    transitionName={classPrefix+'-transition'}
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                >
                {

                    this.state.isOpen ?
                        (
                            <div onTouchMove={(e) => {e.preventDefault();}} key="modal">
                                <div className={modalClass}>
                                    <Header classPrefix={classPrefix}>{title}</Header>
                                    <Body classPrefix={classPrefix}>{children}</Body>
                                    <Footer classPrefix={classPrefix} footer={footer} type={type} onDismissed={this.onDismissed} onClosed={this.onClosed}></Footer>
                                </div>
                                {this.renderBackdrop()}
                            </div>
                        ) : <span key="none"></span>
                }
                </ReactCSSTransitionGroup>
    }
});

/**
 * Modal.Header
 */
const Header = React.createClass({
    propTypes: {
        classPrefix: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            classPrefix: 'modal'
        };
    },
    render() {
        let {
            classPrefix,
            ...props
        } = this.props;
        return (
            <div className={`${classPrefix}-header`} {...props}></div>
        );
    }
});

/**
 * Modal.Body
 */
const Body = React.createClass({
    propTypes: {
        classPrefix: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            classPrefix: 'modal'
        };
    },
    render() {
        let {
            children,
            classPrefix
        } = this.props;
        return (
            <div className={`${classPrefix}-body`}>{children}</div>
        );
    }
});

/**
 * Modal.Footer
 */
const Footer = React.createClass({
    propTypes: {
        classPrefix: React.PropTypes.string,
        type: React.PropTypes.string,
        footer: React.PropTypes.node,
        onClosed: React.PropTypes.func,
        onDismissed: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            classPrefix: 'modal',
            type: 'alert'
        };
    },
    render() {
        let {
            type,
            classPrefix,
            footer,
            onDismissed,
            onClosed
        } = this.props;
        if (!footer) {
            if (type === 'alert') {
                footer = <Button block={true} style={{marginBottom: '0'}} onClick={onClosed}>确定</Button>
            } else if (type === 'confirm') {
                footer = <ButtonGroup justified={true}><Button onClick={onClosed}>是</Button><Button onClick={onDismissed}>否</Button></ButtonGroup>
            } else if (type === 'dialog') {
                footer = <ButtonGroup justified={true}><Button onClick={onClosed}>确定</Button><Button onClick={onDismissed}>取消</Button></ButtonGroup>
            }
        }
        return (
            <div className={`${classPrefix}-footer`}>
                {footer}
            </div>
        );
    }
});


/**
 * ModalPortal Component
 * This is used to wrap the Modal component and not like Modal, ModalPortal will 
 * be rendered into the body-element.
 * This is useful on IOS, since position:fixed will be disturbed by overflow:hidden
 */
const ModalPortal = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            isOpen: false
        };
    },
    componentDidMount() {
        this.node = document.createElement('div');
        this.node.className = 'modal-portal';
        document.body.appendChild(this.node);
        this.renderModal(this.props);
    },
    componentWillReceiveProps(nextProps) {
        this.renderModal(nextProps);
    },

    /**
     * remove this node both from dom and react-dom
     */
    componentWillUnmount() {
        unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
    },
    renderModal(props) {
        this.portal = renderSubtreeIntoContainer(
            this,
            <Modal {...props}></Modal>,
            this.node
        );
    },
    render() {
        return null
    }
});

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;


export default ModalPortal;