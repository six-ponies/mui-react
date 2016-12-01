import React from 'react';
import DocumentTitle from 'react-document-title';
import Picker from 'src/components/Picker';
import Button from 'src/components/Button';
import addressList from '../addressList';

const list1 =
    [{
        id: 1,
        name: '上海'
    }, {
        id: 2,
        name: '北京'
    }, {
        id: 3,
        name: '天津'
    }, {
        id: 4,
        name: '深圳'
    }, {
        id: 5,
        name: '广州'
    }, {
        id: 6,
        name: '香港'
    }, {
        id: 7,
        name: '台湾'
    }, {
        id: 8,
        name: '杭州'
    }, {
        id: 9,
        name: '重庆'
    }, {
        id: 10,
        name: '成都'
    }];
const list2 = [
    [{
        id: 1,
        name: '上海'
    }, {
        id: 2,
        name: '北京'
    }, {
        id: 3,
        name: '天津'
    }, {
        id: 4,
        name: '深圳'
    }, {
        id: 5,
        name: '广州'
    }, {
        id: 6,
        name: '香港'
    }, {
        id: 8,
        name: '杭州'
    }],
    [{
        'id': 1,
        'name': '直辖市'
    }, {
        'id': 1,
        'name': '特别行政区'
    }, {
        'id': 1,
        'name': '省府城市'
    }]
];
const ButtonPickerGroup = React.createClass({
    getInitialState: function() {
        return {
            openPicker: false,
            selectedValue: ''
        };
    },
    getDefaultProps: function() {
        return {
            colorStyle: 'primary'
        }
    },
    render: function() {
        let {
            openPicker,
            selectedValue
        } = this.state;
        let buttonClass = 'btn-' + this.props.colorStyle;
        return (
            <div>
                <Button className={buttonClass} block={true} style={{'marginLeft': 0}} onClick={() => {this.setState({openPicker: true})}}>{this.props.children}</Button>
                <p>您所选择的是：{selectedValue}</p>
                <Picker 
                    {...this.props}
                    isPickerOpen={openPicker} 
                    onClose={()=>{
                        // something you wanna do when scroll picker is closed
                        this.setState({
                            openPicker: false
                        })
                    }}
                    onSelected={(value) => {
                        // The return value is organised like [{id: 1, name: 'foo'},...]

                        // You must set the openPicker to false, otherwise the scroll picker
                        // won't shut down himself!!
                        // TODO:: how to shut down himself ??
                        this.setState({
                            selectedValue: value.reduce((pre, cur)=> {
                                return pre + ' ' + cur.name;
                            }, ''),
                            openPicker: false
                        })
                    }} 
                ></Picker>
            </div>
        );
    }
});

const PickerPage = React.createClass({
    getInitialState: function() {
        return {
            index: [0]
        };
    },
    componentDidMount: function() {

    },
    render: function() {
        let marginBottom = {
            marginBottom: '40px'
        };
        return (
            <DocumentTitle title="Picker">
                <div>
                    <div style={marginBottom}>
                        <p>普通选择</p>
                        <ButtonPickerGroup optionsGroup={list1} selectedIndexGroup={[1]}>一级选择</ButtonPickerGroup>
                        <ButtonPickerGroup optionsGroup={list2} selectedIndexGroup={[3,2]}>二级选择</ButtonPickerGroup>
                    </div>
                    <div  style={marginBottom}>
                        <p>动态设置选择器默认选中选项</p>
                        <Button 
                            onClick={()=>{this.setState({
                                index: [parseInt(Math.random() * 10)]
                            })}}
                        > 点击修改 </Button> 选择器默认选中的位置：{list1[this.state.index[0]].name}
                        <ButtonPickerGroup optionsGroup={list1} selectedIndexGroup={this.state.index}>动态设置选择器默认选中选项</ButtonPickerGroup>
                    </div>
                    <div style={marginBottom}>
                        <p>级联选择</p>
                        <ButtonPickerGroup optionsGroup={addressList} isCascading={true} columnNum={2} >二级联动</ButtonPickerGroup>
                        <ButtonPickerGroup optionsGroup={addressList} isCascading={true} columnNum={3} >三级联动</ButtonPickerGroup>
                    </div>
                    <div style={marginBottom}>
                        <p>控制选择器显示行数(只能显示奇数行)</p>
                        <ButtonPickerGroup optionsGroup={list1}>默认显示5行</ButtonPickerGroup>
                        <ButtonPickerGroup optionsGroup={list1} lineNum={3}>显示3行</ButtonPickerGroup>
                        <ButtonPickerGroup optionsGroup={list1} lineNum={4}>即使选择显示4行，但实际还显示3行</ButtonPickerGroup>
                    </div>
                    <div style={marginBottom}>
                        <p>控制选择器外观样式</p>
                        <ButtonPickerGroup optionsGroup={list1} colorStyle="success">success</ButtonPickerGroup>
                        <ButtonPickerGroup optionsGroup={list1} colorStyle="warning">显示3行</ButtonPickerGroup>
                        <ButtonPickerGroup optionsGroup={list1} colorStyle="alert">即使选择显示4行，但实际还显示3行</ButtonPickerGroup>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

export default PickerPage;