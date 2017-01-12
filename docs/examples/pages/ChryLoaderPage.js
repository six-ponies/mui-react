import React from 'react';
import DocumentTitle from 'react-document-title';
import Container from 'src/components/Container';
import ChryLoading from 'src/components/ChryLoading';
const ChryLoaderPage = React.createClass({
    render() {
        let size = ['sm', 'lg', 'xl', 'xxl'];
        let divStyle = {
            'verticalAlign': 'middle'
        };
        return (
            <DocumentTitle title="ChryLoader">
                <Container scrollable={true}>
                    {
                        size.map((item, index) => (
                            <div style={divStyle} key={index}>
                                <span style={{marginRight: '20px'}}>{item} loader</span><ChryLoading size={item}></ChryLoading>
                            </div>))
                    }
                </Container>
            </DocumentTitle>
        )
    }
});

export default ChryLoaderPage;