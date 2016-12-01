import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
// import ReactDOM from 'react-dom';
import List from 'components/List';

describe('<List>', () => {
    it('Should render a DIV with class named list-group', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<List></List>);
        let list = renderer.getRenderOutput();
        assert.equal(list.type, 'div');
        assert.equal(list.props.className, 'list-group');
    });
    it('Should contain class named border-padding-left', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<List borderPadding="left"></List>);
        let list = renderer.getRenderOutput();
        assert.ok(list.props.className.match(/\bborder-padding-left\b/));
    });
    it('Should contain class named border-padding-right', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<List borderPadding="right"></List>);
        let list = renderer.getRenderOutput();
        assert.ok(list.props.className.match(/\bborder-padding-right\b/));
    });
    it('Should contain class named border-padding-both', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<List borderPadding="both"></List>);
        let list = renderer.getRenderOutput();
        assert.ok(list.props.className.match(/\bborder-padding-both\b/));
    });
    describe('<List.Item>', () => {
        it('Should render a div with class named list-group-item', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item></List.Item>);
            let item = renderer.getRenderOutput();
            assert.equal(item.type, 'div');
            assert.equal(item.props.className, 'list-group-item');
        });
        it('Should contain a div with class named list-group-item-left', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item title="test"></List.Item>);
            let item = renderer.getRenderOutput();
            let children = item.props.children;
            assert.equal(children.length, 3);
            assert.equal(children[0].type, 'div');
            assert.equal(children[1], null);
            assert.equal(children[2], null);
            assert.equal(children[0].props.className, 'list-group-item-left');
            assert.equal(children[0].props.children, 'test');
        });
        it('Should contain  div with class named list-group-item-right-expand', () => {
            let media = (<img src="" alt="" />);
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item media={media} title="test"></List.Item>);
            let item = renderer.getRenderOutput();
            let children = item.props.children;
            assert.equal(children.length, 3);
            assert.equal(children[0].type, 'div');
            assert.equal(children[1], null);
            assert.equal(children[0].props.className, 'list-group-item-left');
            assert.equal(children[0].props.children, media);
            assert.equal(children[2].type, 'div');
            assert.equal(children[2].props.className, 'list-group-item-right-expand');
            assert.equal(children[2].props.children[0].props.className, 'list-group-item-title-row');
            assert.equal(children[2].props.children[0].props.children[0].props.className, 'list-group-item-title');
            assert.equal(children[2].props.children[0].props.children[0].props.children, 'test');
        });
        it('Should render a a with class named list-group-item', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item href='#/test'></List.Item>);
            let item = renderer.getRenderOutput();

            assert.equal(item.type, 'a');
            assert.equal(item.props.className, 'list-group-item');
        });

        it('Should contain a div with class named list-group-item-right', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item right="test"></List.Item>);
            let item = renderer.getRenderOutput();
            let right = item.props.children[2];
            assert.equal(right.type, 'div');
            assert.equal(right.props.className, 'list-group-item-right');
            assert.equal(right.props.children, 'test');
        });

        it('Should contain a div with class named list-group-item-mid', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item mid="middle"></List.Item>);
            let item = renderer.getRenderOutput();
            let mid = item.props.children[1];
            assert.equal(mid.type, 'div');
            assert.equal(mid.props.className, 'list-group-item-mid');
            assert.equal(mid.props.children, 'middle');
        });

        it('Should contain a div with class named list-group-item-center', () => {
            let renderer = ReactTestUtils.createRenderer();
            renderer.render(<List.Item mid="center" shouldCenter={true}></List.Item>);
            let item = renderer.getRenderOutput();
            let mid = item.props.children[1];
            assert.equal(mid.type, 'div');
            assert.equal(mid.props.className, 'list-group-item-center');
            assert.equal(mid.props.children.type, 'div');
            assert.equal(mid.props.children.props.children, 'center');
        });
    });
});