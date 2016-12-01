import React from 'react';
import Slide from 'src/components/Slide';
import Container from 'src/components/Container';
import TabBar from 'src/components/TabBar';
import {
    Link
} from 'react-router';
const App = React.createClass({
    render: function() {
        let {
            location,
            children,
            params
        } = this.props;
        let transition = children.props.transition || 'slide-fr';

        return (
            <Container fill={true} column={true} withPadding={false}>
                <Slide transition={transition}>
                    {React.cloneElement(children, {key: location.key})}
                </Slide>
                <TabBar>
                    <TabBar.Item
                        active={!params.component} 
                        icon="home" 
                        component={Link} 
                        to='/'
                        title='首页'>
                    </TabBar.Item>
                    <TabBar.Item
                        icon="about" 
                        active={params.component === 'About'} 
                        component={Link} 
                        to='/About'
                        title="关于">
                    </TabBar.Item>
                </TabBar>
            </Container>
        );
    }
});

export default App;