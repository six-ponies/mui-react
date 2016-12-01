import React from 'react';

import Slide from 'src/components/Slide';
import Container from 'src/components/Container';
import * as Pages from './pages/index';

let {
    IndexPage,
    ...Components
} = Pages;
const Detail = React.createClass({
    render() {
        let component = this.props.params.component;

        if (component) {
            component = component.charAt(0).toUpperCase() + component.slice(1);
        }

        let Component = Components[component];

        return (
            <Slide.Item>
                <Container scrollable={true}>
                    <Component></Component>
                </Container>
            </Slide.Item>
        );
    }
});

export {
    IndexPage,
    Detail
};