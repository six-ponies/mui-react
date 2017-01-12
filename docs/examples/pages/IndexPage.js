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
        let hrefList = ['ButtonPage', 'GridPage', 'ListPage', 'PickerPage', 'ModalPage', 'TabBarPage', 'IconPage', 'ChryLoaderPage'];
        let rightIcon = <i className="iconfont iconfont-right"></i>
        return (
            <Slide.Item>
                <DocumentTitle title="react-mui">
                    <Container scrollable={true} withPadding={false}>
                        <List>
                            {
                                hrefList.map((item, index) =>  (<List.Item key={index} href={`#/${item}`} title={item} right={rightIcon}></List.Item>))
                            }
                        </List>
                    </Container>                
                </DocumentTitle>
            </Slide.Item>
        );
    }
});

export default IndexPage;