import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Col from 'components/Col';

describe('<Col>', () => {
    it('Should render a div with class named col', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.equal(ele.nodeName, 'DIV');
        assert.equal(ele.className, 'col');
    });
    it('Should contain class named col-1', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col cols={1}></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bcol-1\b/));
    });
    it('Should contain class named col-6', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col cols={6}></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bcol-6\b/));
    });
    it('Should contain class named col-6', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col cols={7}></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bcol-6\b/));
    });
    it('Should not contain class named col-0', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col cols={0}></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(!ele.className.match(/\bcol-0\b/));
    });
    it('Should not contain class named col-offset-1', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col offset={1}></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bcol-offset-1\b/));
    });
    it('Should contain class named col-offset-6', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Col offset={7}></Col>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bcol-offset-6\b/));
    });
});