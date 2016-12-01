import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Icon from 'components/Icon';

describe("<Icon>", () => {
    it("Should render a i with class name iconfont", () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Icon></Icon>);
        let icon = renderer.getRenderOutput();
        assert.equal(icon.type, 'i');
        assert.equal(icon.props.className, 'iconfont');
    });
    it("Should render a span with class name iconfont", () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Icon component="span"></Icon>);
        let icon = renderer.getRenderOutput();
        assert.equal(icon.type, 'span');
        assert.equal(icon.props.className, 'iconfont');
    });
    it("Should contain iconfont-home", () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Icon name="home"></Icon>);
        let icon = renderer.getRenderOutput();
        assert.ok(icon.props.className.match(/\biconfont-home\b/));
    });
});