import React from 'react';
import DocumentTitle from 'react-document-title';
import Container from 'src/components/Container';
import List from 'src/components/List';
import Slide from 'src/components/Slide';
const IndexPage = React.createClass({
    getDefaultProps() {
        return {
            transition: 'slide-fl'
        };
    },
    render: function() {
        let rightIcon = <i className="iconfont iconfont-right"></i>
        return (
            <Slide.Item>
                <DocumentTitle title="react-mui">
                    <Container scrollable={true} withPadding={false}>
                        <List>
                            <List.Item href="#/ButtonPage" title='Button' right={rightIcon}></List.Item>
                            <List.Item href="#/GridPage" color="primary" title='Grid' right={rightIcon}></List.Item>
                            <List.Item href="#/ListPage" title='List' right={rightIcon}></List.Item>
                            <List.Item href="#/PickerPage" title='Picker' right={rightIcon}></List.Item>
                            <List.Item href="#/ModalPage" title='ModalPage' right={rightIcon}></List.Item>
                            <List.Item href="#/TabBarPage" title='TabBarPage' right={rightIcon}></List.Item>
                            <List.Item href="#/IconPage" title='IconPage' right={rightIcon}></List.Item>
                        </List>
                    </Container>                
                </DocumentTitle>
            </Slide.Item>
        );
    }
});

export default IndexPage;