import React from 'react';
import DocumentTitle from 'react-document-title';
import Container from 'src/components/Container';
import TabBar from 'src/components/TabBar';
const TabBarPage = React.createClass({
    render() {
        return (
            <DocumentTitle title="TabBar">
                <Container style={{padding: '0', margin: '0 -15px'}}>
                    <TabBar>
                        <TabBar.Item active={true} icon="home" key={1}>
                           
                        </TabBar.Item>
                        
                        <TabBar.Item icon = "close" key={2}>
                        </TabBar.Item>
                    </TabBar>
                </Container>
            </DocumentTitle>
        );
    }
});

export default TabBarPage;