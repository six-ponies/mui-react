import React from 'react';
import DocumentTitle from 'react-document-title';
import List from 'src/components/List';
import Container from 'src/components/Container';

const ListPage = React.createClass({
    handleChange: function(e) {
        this.setState({
            text: e.target.value
        });
    },
    render: function() {
        let rightIcon = <i className="iconfont iconfont-right"></i>;
        let singleDog = <img width="32" src={require('../../images/singleDog.jpg')} alt="It is a single dog"/>
        let singleDogM = <img width="48" src={require('../../images/singleDog.jpg')} alt="It is a single dog"/>
        let singleDogLg = <img width="80" src={require('../../images/singleDog.jpg')} alt="It is a single dog"/>
        return (
            <DocumentTitle title="ListPage">
                <Container scrollable={true} style={{margin: '-15px -15px', 'padding': '15px 0'}}>
                    <p style={{padding: '0 15px'}}>静态列表</p>
                    <List>
                        <List.Item title="Item 1"></List.Item>
                        <List.Item title="Item 2"></List.Item>
                        <List.Item title="Item 3"></List.Item>
                        <List.Item title="Item 4"></List.Item>
                        <List.Item title="Item 5" right={rightIcon}></List.Item>
                        <List.Item title="Item 6" right={rightIcon} mid="方案制定中"></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>边框左侧留空（borderPadding:left）</p>
                    <List borderPadding="left">
                        <List.Item title="Item 1"></List.Item>
                        <List.Item title="Item 2" right={rightIcon}></List.Item>
                        <List.Item title="Item 3" right={rightIcon} mid="方案制定中"></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>边框右侧留空（borderPadding:right）</p>
                    <List borderPadding="right">
                        <List.Item title="Item 1"></List.Item>
                        <List.Item title="Item 2" right={rightIcon}></List.Item>
                        <List.Item title="Item 3" right={rightIcon} mid="方案制定中"></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>边框两侧留空（borderPadding:both）</p>
                    <List borderPadding="both">
                        <List.Item title="Item 1"></List.Item>
                        <List.Item title="Item 2" right={rightIcon}></List.Item>
                        <List.Item title="Item 3" right={rightIcon} mid="方案制定中"></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>包含链接列表</p>
                    <List>
                        <List.Item href="http://www.baidu.com" title="Item 1" right={rightIcon}></List.Item>
                        <List.Item href="http://www.baidu.com" title="Item 2" right={rightIcon}></List.Item>
                        <List.Item href="http://www.baidu.com" title="Item 3" right={rightIcon}></List.Item>
                        <List.Item href="http://www.baidu.com" title="Item 4" right={rightIcon}></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>小的图文列表</p>
                    <List>
                        <List.Item media={singleDog} title="single dog"></List.Item>
                        <List.Item href="http://www.baidu.com" media={singleDog} title="single dog" right={rightIcon}></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>中等的图文列表</p>
                    <List>
                        <List.Item 
                            media={singleDogM} 
                            right={rightIcon} 
                            title="single dog" 
                            subtitle="这是一只单身狗" 
                        ></List.Item>
                        <List.Item 
                            href="http://www.vikilife.com/128346.html"
                            media={singleDogM} 
                            right={rightIcon} 
                            title="single dog" 
                            subtitle="这是一只单身狗" 
                        ></List.Item>
                    </List>
                    <p style={{padding: '0 15px'}}>大的图文列表</p>
                    <List>
                        <List.Item 
                            media={singleDogLg} 
                            title="single dog" 
                            subtitle="这是一只单身狗" 
                            content="从前有只很可爱的汪星人，因为单身太久，所以被称为单身狗。
                            这只单身狗受不了身边的秀恩爱，拿着骨头就离家出了走，心想：我一定也能找到真爱。
                            于是他开始游历各国。"
                        ></List.Item>
                        <List.Item 
                            href="http://www.vikilife.com/128346.html"
                            media={singleDogLg} 
                            title="single dog" 
                            subtitle="这是一只单身狗" 
                            content="从前有只很可爱的汪星人，因为单身太久，所以被称为单身狗。
                            这只单身狗受不了身边的秀恩爱，拿着骨头就离家出了走，心想：我一定也能找到真爱。
                            于是他开始游历各国。"
                        ></List.Item>
                    </List>
                </Container>
            </DocumentTitle>
        );
    }
});

export default ListPage;