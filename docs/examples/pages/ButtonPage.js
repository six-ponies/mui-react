import React from 'react';
import DocumentTitle from 'react-document-title';
import Button from 'src/components/Button';
import ButtonGroup from 'src/components/ButtonGroup';
const ButtonPage = React.createClass({
    getInitialState() {
        return {
            onClick: 0,
            onTouchStart: 0,
            onTouchEnd: 0
        };
    },
    onClick: function(e) {
        console.log('click 事件响应时间：' + e.timeStamp);
        this.setState({
            onClick: e.timeStamp
        })
    },
    onTouchStart: function(e) {
        console.log('touchstart 事件响应时间 ' + e.timeStamp);
        this.setState({
            onTouchStart: e.timeStamp
        })
    },
    onTouchEnd: function(e) {
        console.log('touchend 事件响应时间 ' + e.timeStamp);
        this.setState({
            onTouchEnd: e.timeStamp
        });
        let self = this;
        setTimeout(function() {
            let {
                onClick,
                onTouchStart,
                onTouchEnd
            } = self.state;
            alert('onTouchStart 事件响应时间：' + onTouchStart + '\n' + 'click 事件响应时间：' + onClick + '\n' + 'onTouchEnd 事件响应时间：' + onTouchEnd);
        }, 1000);
    },
    render: function() {
        return (
            <DocumentTitle title="Button">
                <div>
                    <div>
                        <p>颜色样式</p>
                        <div className="colorful-btn-container">
                            <Button onClick={this.onClick} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>Default</Button>
                            <Button className="btn-primary">Primary</Button>
                            <Button className="btn-secondary">Secondary</Button>
                            <Button className="btn-success">Success</Button>
                            <Button className="btn-warning">Warning</Button>
                            <Button className="btn-alert">Alert</Button>
                        </div>
                    </div>
                    <div>
                        <p>大小样式</p>
                        <div>
                            <Button className="btn-xs">xs button</Button>
                            <Button className="btn-xs btn-primary">xs button</Button>
                        </div>
                        <div>
                            <Button className="btn-sm">sm button</Button>
                            <Button className="btn-sm btn-primary">sm button</Button>
                        </div>
                        <div>
                            <Button className="btn">default button</Button>
                            <Button className="btn btn-primary">default button</Button>
                        </div>
                        <div>
                            <Button className="btn-lg">lg button</Button>
                            <Button className="btn-lg btn-primary">lg button</Button>
                        </div>
                        <div>
                            <Button className="btn-xl">xl button</Button>
                            <Button className="btn-xl btn-primary">xl button</Button>
                        </div>
                    </div>
                    <div>
                        <p>块级样式</p>
                        <div>
                            <Button block={true}>Default Block</Button>
                        </div>
                        <div>
                            <Button className="btn-primary" block={true}>Primary Block</Button>
                        </div>
                    </div>
                    <div>
                        <p>指定按钮标签</p>
                        <div>
                            <Button componentClass="div">div</Button>
                            <Button componentClass="span">span</Button>
                        </div>
                    </div>
                    <div>
                        <p>按钮状态</p>
                        <div>
                            <Button className="btn-primary" disabled={true}>disabled</Button>
                            <Button className="btn-primary">normal</Button>
                            <Button className="btn-primary" active={true}>active</Button>
                        </div>
                    </div>
                    <div>
                        <p>镂空按钮</p>
                        <div>
                            <Button className="btn-primary btn-hollow">Primary</Button>
                            <Button className="btn-secondary btn-hollow">Secondary</Button>
                            <Button className="btn-hollow">Default</Button>
                            <Button className="btn-success btn-hollow">Success</Button>
                            <Button className="btn-warning btn-hollow">Warning</Button>
                            <Button className="btn-alert btn-hollow">Alert</Button>
                        </div>
                    </div>
                    <div>
                        <p>链接按钮</p>
                        <div>
                            <Button className="btn-primary" href="" >超链接</Button>
                            <Button className="btn-primary" href="http://www.baidu.com" disabled={true}>超链接</Button>
                        </div>
                    </div>
                    <div>
                        <p>按钮组</p>
                        <ButtonGroup>
                            <Button>左</Button>
                            <Button>中</Button>
                            <Button>右</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <p>可变大小按钮组</p>
                        <ButtonGroup>
                            <Button>左</Button>
                            <Button>中</Button>
                            <Button>右</Button>
                        </ButtonGroup>
                        <ButtonGroup size='lg'>
                            <Button>左</Button>
                            <Button>中</Button>
                            <Button>右</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <p>两端对齐按钮组</p>
                        <ButtonGroup justified={true}>
                            <Button>左</Button>
                            <Button>中</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

export default ButtonPage;