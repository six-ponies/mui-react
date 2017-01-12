import React from 'react';
import ChryLoading from 'src/components/ChryLoading';
const About = React.createClass({
    render() {
        return (
            <div>
                <h3>关于mui-react</h3>
                <p style={{textIndent: '2em'}}>
                    mui-react是基于React的移动端Web组件库。不同于react-bootstrap，mui-react更侧重在移动端的性能表现。
                </p>
                <ul>
                    <li>mui-react的栅格系统是基于弹性盒子（flexbox）建立的，更加灵活轻便</li>
                    <li>mui-react添加了移动端比较常见的滚动选择器（scroll picker）</li>
                    <li>mui-react的Icon库基于<a href="http://www.iconfont.cn/plus">iconfont</a>建立。iconfont是阿里妈妈MUX倾力打造的矢量图标管理、交流平台。</li>
                </ul>
                <h3>版本介绍</h3>
                <p style={{textIndent: '2em'}}>
                    当前版本为{`${__VERSION__}`}，可到<a href="https://github.com/lordisback/react-mui">Github</a>上获取最新版本
                </p>
            </div>
        );
    }
});

export default About;