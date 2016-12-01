import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import * as ShallowTestUtils from 'react-shallow-testutils';
import ReactDOM from 'react-dom';
import {
    Picker,
    PickerHeader,
    PickerColumn,
    DatePicker
} from 'components/Picker';
import Button from 'components/Button';
describe('<Picker>', () => {
    it('Should output a div', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <PickerHeader>
            </PickerHeader>
        );
        assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    });
    describe('<PickerHeader>', () => {

        describe('Default PickerHeader', () => {
            let renderer = ReactTestUtils.createRenderer(),
                pickerHeader,
                inner;
            beforeEach(() => {
                renderer.render(
                    <PickerHeader></PickerHeader>
                );
                pickerHeader = renderer.getRenderOutput();
                inner = pickerHeader.props.children;
            });
            it('Should render div components with class equals to pop-picker-header', () => {
                assert.equal(pickerHeader.type, 'div');
                assert.equal(pickerHeader.props.className, 'pop-picker-header');

            });
            it('Should contain two Button Components', () => {
                assert.equal(inner.length, 2);
                assert.equal(inner[0].type, Button);
                assert.equal(inner[1].type, Button);
            });
            it('Should the first Button className equals btn-xs', () => {
                assert.equal(inner[0].props.className, 'btn-xs');
            });
            it('Should the first Button className equals btn-xs btn-primary', () => {
                assert.equal(inner[1].props.className, 'btn-xs btn-primary');
            });
        });

        describe('Success PickerHeader', () => {
            let renderer = ReactTestUtils.createRenderer(),
                pickerHeader,
                inner;

            function closePicker() {

            }

            function confirmPicker() {

            }
            beforeEach(() => {
                renderer.render(
                    <PickerHeader colorStyle="success" closePicker={closePicker} confirmPicker={confirmPicker}></PickerHeader>
                );
                pickerHeader = renderer.getRenderOutput();
                inner = pickerHeader.props.children;
            });
            it('Should contain function', () => {
                assert.equal(inner[0].props.onClick, closePicker);
                assert.equal(inner[1].props.onClick, confirmPicker);
            });
            it('Should render a PickerHeader with a Button whose className contains btn-success', () => {
                assert(inner[1].props.className.match(/\bbtn-success\b/));
            });
        });
    });
});