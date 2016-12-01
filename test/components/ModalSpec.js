import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import ModalPortal, {
    Modal
} from 'components/Modal';
import Backdrop from 'components/Backdrop';
describe('<Modal>', () => {
    describe('<Modal.Header>', () => {
        let node;
        beforeEach(() => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<Modal.Header classPrefix="modal">Test Modal.Header</Modal.Header>);
            node = renderer.getRenderOutput();
        });
        it('Should render a div containing classes named modal-header', () => {
            assert.equal(node.type, 'div');
            assert.equal(node.props.className, 'modal-header');
        });
        it('Should have a title named Test Modal.Header', () => {
            assert.equal(node.props.children, 'Test Modal.Header');
        });
    });
    describe('<Modal.Body>', () => {
        let node;
        beforeEach(() => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<Modal.Body classPrefix="modal">Test Modal.Body</Modal.Body>);
            node = renderer.getRenderOutput();
        });
        it('Should render a div containing classes named modal-body', () => {
            assert.equal(node.type, 'div');
            assert.equal(node.props.className, 'modal-body');
        });
        it('Should have a title named Test Modal.Header', () => {
            assert.equal(node.props.children, 'Test Modal.Body');
        });
    });
    describe('<Modal.Footer>', () => {
        it('Should render a div containing class named modal-footer', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<Modal.Footer></Modal.Footer>);
            let node = renderer.getRenderOutput();
            assert.equal(node.type, 'div');
            assert.equal(node.props.className, 'modal-footer');
        });
        it('Should contain a Button', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<Modal.Footer></Modal.Footer>);
            let node = renderer.getRenderOutput();
            let Buttons = node.props.children;
            // assert.equal(Buttons, 1);
            assert.equal(Buttons.type, Button);
        });
        it('Should contain a ButtonGroup with two Buttons', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<Modal.Footer type="confirm"></Modal.Footer>);
            let node = renderer.getRenderOutput();
            let ButtonGroups = node.props.children;
            let Buttons = ButtonGroups.props.children;
            assert.equal(ButtonGroups.type, ButtonGroup);
            assert(ButtonGroups.props.justified);
            assert.equal(Buttons.length, 2);
            assert.equal(Buttons[0].type, Button);
            assert.equal(Buttons[0].props.children, '是');
            assert.equal(Buttons[1].props.children, '否');
        });
        it('Should render a dialog containing a ButtonGroup with two Buttons', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<Modal.Footer type="dialog"></Modal.Footer>);
            let node = renderer.getRenderOutput();
            let ButtonGroups = node.props.children;
            let Buttons = ButtonGroups.props.children;
            assert.equal(ButtonGroups.type, ButtonGroup);
            assert(ButtonGroups.props.justified);
            assert.equal(Buttons.length, 2);
            assert.equal(Buttons[0].type, Button);
            assert.equal(Buttons[0].props.children, '确定');
            assert.equal(Buttons[1].props.children, '取消');
        });
    });
    it('Should contain a Backdrop and a box of Header, Body and Footer', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Modal title="Alert" isOpen={true}>This is an Alert Modal</Modal>)
        let instance = renderer.getRenderOutput();
        let children = instance.props.children;
        assert.equal(children[0].props.className, 'modal box-shadow in');
        assert.equal(children[0].props.children[0].type, Modal.Header);
        assert.equal(children[0].props.children[1].type, Modal.Body);
        assert.equal(children[0].props.children[2].type, Modal.Footer);
        assert.equal(children[1].type, Backdrop);
        assert.ok(children[1].props.isOpen);
    });
    it('Should contain a className in', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Modal title="Alert" isOpen={true}>This is an Alert Modal</Modal>)
        let instance = renderer.getRenderOutput();
        let children = instance.props.children;
        assert.ok(children[0].props.className.match(/\bin\b/));
        assert.ok(children[1].props.isOpen);
    });
    it('Should contain a className in when props isOpen changes to true', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Modal></Modal>
        );
        let modalDom = ReactDOM.findDOMNode(instance);
        let modal = modalDom.querySelector('.modal');
        let backdrop = modalDom.querySelector('.backdrop');
        assert.ok(!modal.className.match(/\bin\b/));
        assert.ok(!backdrop.className.match(/\bin\b/));
        instance.componentWillReceiveProps({
            isOpen: true
        });
        assert.ok(modal.className.match(/\bin\b/));
        assert.ok(backdrop.className.match(/\bin\b/));
    });
    it('Should remove "in" if Backdrop clicked', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Modal isOpen={true} ></Modal>
        );
        let modalDom = ReactDOM.findDOMNode(instance);
        let modal = modalDom.querySelector('.modal');
        let backdrop = modalDom.querySelector('.backdrop');
        assert.ok(modal.className.match(/\bin\b/));
        assert.ok(backdrop.className.match(/\bin\b/));
        ReactTestUtils.Simulate.click(backdrop);
        // assert.equal(modal.className, 'modal');
        assert.ok(!modal.className.match(/\bin\b/));
        assert.ok(!backdrop.className.match(/\bin\b/));
    });
    it('Should not remove "in" if Backdrop clicked', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Modal isOpen={true} closeByBackdrop={false}></Modal>
        );
        let modalDom = ReactDOM.findDOMNode(instance);
        let modal = modalDom.querySelector('.modal');
        let backdrop = modalDom.querySelector('.backdrop');
        assert.ok(modal.className.match(/\bin\b/));
        assert.ok(backdrop.className.match(/\bin\b/));
        ReactTestUtils.Simulate.click(backdrop);
        // assert.equal(modal.className, 'modal');
        assert.ok(modal.className.match(/\bin\b/));
        assert.ok(backdrop.className.match(/\bin\b/));
    });
    describe('<ModalPortal>', () => {
        it('Should return null', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<ModalPortal></ModalPortal>);
            let modalPortal = renderer.getRenderOutput();
            assert.equal(modalPortal, null);
        });
        it('Should render a modal', () => {
            let instance = ReactTestUtils.renderIntoDocument(
                <ModalPortal></ModalPortal>
            );
            let modalPortal = document.body.querySelector('.modal-portal');
            let modal = modalPortal.querySelector('.modal');
            assert.equal(modalPortal.nodeName, "DIV");
            assert.equal(modal.nodeName, "DIV");
        });
    });
});