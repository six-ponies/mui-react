import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Backdrop from 'components/Backdrop';

describe('<Backdrop>', () => {
    it('Should render a div with className of backdrop', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Backdrop></Backdrop>
        );
        let node = ReactDOM.findDOMNode(instance);

        assert.equal(node.nodeName, 'DIV');
        assert.equal(node.className, 'backdrop');
    });

    it('Should contain in', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Backdrop isOpen={true}></Backdrop>
        );
        let node = ReactDOM.findDOMNode(instance);
        ReactTestUtils.Simulate.touchMove(node);
        assert(node.className.match(/\bin\b/));
    });
});