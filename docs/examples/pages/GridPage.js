import React from 'react';
import DocumentTitle from 'react-document-title';
import Container from 'src/components/Container';
import Grid from 'src/components/Grid';
import Col from 'src/components/Col';
const GridPage = React.createClass({
    render: function() {
        return (
            <DocumentTitle title='Grid'>
                <Container className='example-grid'>
                    <p>普通网格</p>
                    <Grid>
                        <Col>0</Col>
                        <Col>1</Col>
                        <Col>2</Col>
                        <Col>3</Col>
                        <Col>4</Col>
                        <Col>5</Col>
                        <Col>6</Col>
                    </Grid>
                    <p>指定比例网格</p>
                    <Grid>
                        <Col cols={2}>2</Col>
                        <Col cols={4}>4</Col>
                    </Grid>

                    <p>自动换行 wrap="wrap"</p>
                    <Grid wrap="wrap">
                        <Col cols={5}>5</Col>
                        <Col cols={1}>1</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                    <p>自动换行 wrap="wrap-reverse"</p>
                    <Grid wrap="wrap-reverse">
                        <Col cols={5}>5</Col>
                        <Col cols={1}>1</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                    <p>等分网格</p>
                    <Grid avg={3}>
                        <Col>2</Col>
                        <Col>2</Col>
                        <Col>2</Col>
                        <Col>2</Col>
                        <Col>2</Col>
                        <Col>2</Col>
                        <Col>2</Col>
                        <Col>2</Col>
                    </Grid>
                    <p>默认左对齐</p>
                    <Grid>
                        <Col cols={2}>2</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                    <p>右对齐</p>
                    <Grid align="right">
                        <Col cols={2}>2</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                    <p>居中对齐</p>
                    <Grid align="center">
                        <Col cols={2}>2</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                    <p>两端对齐</p>
                    <Grid align="between">
                        <Col cols={2}>2</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                    <p>平均分布</p>
                    <Grid align="around">
                        <Col cols={2}>2</Col>
                        <Col cols={2}>2</Col>
                    </Grid>
                </Container>
            </DocumentTitle>
        );
    }
});

export default GridPage;