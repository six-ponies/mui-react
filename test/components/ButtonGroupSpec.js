import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import ButtonGroup from 'components/ButtonGroup';

describe('<ButtonGroup>', () => {
    it('Should render a div with a class named btn-group', () => {
        let instance = ReactTestUtils.renderIntoDocument(
                <ButtonGroup></ButtonGroup>
            ),
            ele = ReactDOM.findDOMNode(instance);
        assert.equal(ele.nodeName, 'DIV');
        assert.equal(ele.className, 'btn-group');
    });
    it('Should contain a class named btn-group-xs', () => {
        let instance = ReactTestUtils.renderIntoDocument(
                <ButtonGroup size="xs"></ButtonGroup>
            ),
            ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bbtn-group-xs\b/));
    });
    it('Should contain a class named btn-group-sm', () => {
        let instance = ReactTestUtils.renderIntoDocument(
                <ButtonGroup size="sm"></ButtonGroup>
            ),
            ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bbtn-group-sm\b/));
    });
    it('Should contain a class named btn-group-lg', () => {
        let instance = ReactTestUtils.renderIntoDocument(
                <ButtonGroup size="lg"></ButtonGroup>
            ),
            ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bbtn-group-lg\b/));
    });
    it('Should contain a class named btn-group-xl', () => {
        let instance = ReactTestUtils.renderIntoDocument(
                <ButtonGroup size="xl"></ButtonGroup>
            ),
            ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bbtn-group-xl\b/));
    });
    it('Should contain a class named btn-group-justified', () => {
        let instance = ReactTestUtils.renderIntoDocument(
                <ButtonGroup justified={true}></ButtonGroup>
            ),
            ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bbtn-group-justified\b/));
    });
});