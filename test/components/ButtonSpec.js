import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Button from 'components/Button';

describe('<Button>', () => {
    it('Should output a button', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Button>
                Title
            </Button>
        );
        assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'BUTTON');
    });

    it('Should have type=button by default', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Button>
                Title
            </Button>
        );
        assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'button');
    });

    it('Should show the type if passed one', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Button type="submit">
                Title
            </Button>
        );
        assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'submit');
    });

    it('Should output an anchor if called with a href', () => {
        let href = '/url';
        let instance = ReactTestUtils.renderIntoDocument(
            <Button href={href}>
                Title
            </Button>
        );
        assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'A');
        assert.equal(ReactDOM.findDOMNode(instance).getAttribute('href'), href);
    });
    it('Should call onClick callback', (done) => {
        let doneOp = () => {
            done();
        };
        let instance = ReactTestUtils.renderIntoDocument(
            <Button onClick={doneOp}>
                Title
            </Button>
        );
        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
    });
});