import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Grid from 'components/Grid';

describe('<Grid>', () => {
    it('Should render a div with a class equals row', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid>
            </Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.equal(ele.nodeName, 'DIV');
        assert.equal(ele.className, 'row');
    });
    it('Should container a class named row-wrap', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid wrap="wrap"></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-wrap\b/));
    });
    it('Should container a class named row-wrap-reverse', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid wrap="wrap-reverse"></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-wrap-reverse\b/));
    });
    it('Should container a class named row-right', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid align="right"></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-right\b/));
    });
    it('Should container a class named row-center', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid align="center"></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-center\b/));
    });
    it('Should container a class named row-between', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid align="between"></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-between\b/));
    });
    it('Should container a class named row-around', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid align="around"></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-around\b/));
    });
    it('Should container a class named row-avg-1', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Grid avg={1}></Grid>
        );
        let ele = ReactDOM.findDOMNode(instance);
        assert.ok(ele.className.match(/\brow-avg-1\b/));
    });
});