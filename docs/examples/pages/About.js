import React from 'react';
import ChryLoading from 'src/components/ChryLoading';
const About = React.createClass({
    render() {
        return (
            <div>
                <h3>关于react-mui</h3>
                <p style={{textIndent: '2em'}}>
                    react-mui是基于React的移动端Web组件库。不同于react-bootstrap，react-mui更侧重在移动端的性能表现。
                </p>
                <ul>
                    <li>react-mui的栅格系统是基于弹性盒子（flexbox）建立的，更加灵活轻便</li>
                    <li>react-mui添加了移动端比较常见的滚动选择器（scroll picker）</li>
                    <li>react-mui的Icon库基于<a href="http://www.iconfont.cn/plus">iconfont</a>建立。iconfont是阿里妈妈MUX倾力打造的矢量图标管理、交流平台。</li>
                </ul>
                <h3>版本介绍</h3>
                <p style={{textIndent: '2em'}}>
                    当前版本为{`${__VERSION__}`}，可到<a href="https://github.com/lordisback/react-mui">Github</a>上获取最新版本
                </p>

                <ChryLoading size="sm"></ChryLoading>
                <ChryLoading></ChryLoading>
                <ChryLoading size="lg"></ChryLoading>
                <ChryLoading size="xl"></ChryLoading>
                <ChryLoading size="xxl"></ChryLoading>
            </div>
        );
    }
});

export default About;