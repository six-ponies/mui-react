import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Container from 'components/Container';

describe('<Container>', () => {
    it('Should render a div with a class equals container', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Container>
            </Container>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.equal(ele.nodeName, 'DIV');
        assert.equal(ele.className, 'container');
    });
    it('Should have fill class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Container fill={true}>
            </Container>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bfill\b/));
        assert.ok(ele.className.match(/\bcontainer\b/));
    });
    it('Should have scrollable class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Container scrollable={true}>
            </Container>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\bscrollable\b/));
        assert.ok(ele.className.match(/\bcontainer\b/));
    });
});