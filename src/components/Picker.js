/**
 * @file This file contains scroll picker components
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date 2016-11-02
 */
import React from 'react';
import className from 'classnames';

import Button from './Button';

let PickerMixin = {
    closePicker: function() {
        this.setState({
            isPickerOpen: false
        });
        this.props.onClose();
    },
    confirmPicker: function() {
        let {
            selectedIndexGroup,
            optionsGroup
        } = this.state;
        let selectedValue = [];
        for (let i = 0; i < optionsGroup.length; i++) {
            selectedValue.push(optionsGroup[i][selectedIndexGroup[i] || 0]);
        }
        this.props.onSelected(selectedValue);
        this.closePicker();
    }
};

/**
 * BackDrop component
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-02
 */
export const BackDrop = React.createClass({
    render: function() {
        let {
            isOpen,
            ...props
        } = this.props;
        let backdropClass = className('pop-picker-backdrop', {
            'in': isOpen
        });
        // e.preventDefault() in onTouchMove is used to prevent background scrolling
        return (
            <div className={backdropClass} onTouchMove={(e) => {e.preventDefault()}} {...props}></div>
        )
    }
});

/**
 * PickerColumn component
 * Component of a column of options
 * @author mayingcong <mayingcong@xingxy.cn>
 * @date   2016-11-02
 */
export const PickerColumn = React.createClass({
    propTypes: {
        columnIndex: React.PropTypes.number,
        defaultIndex: React.PropTypes.number,
        options: React.PropTypes.array,
        onSelected: React.PropTypes.func
    },

    shouldStopInertialMove: false,

    getInitialState: function() {
        return {
            startScrollTranslate: 0,
            isPicking: false,
            ...this.calInitialState(this.props)
        };
    },

    getDefaultProps: function() {
        return {
            itemHeight: 36,
            lineNum: 5,
            options: [],
            selectedIndex: 0
        }
    },

    /**
     * Compute state due to props
     * @param  {Object}
     * @return {Object}
     */
    calInitialState: function(props) {
        let {
            options,
            itemHeight,
            selectedIndex
        } = props;
        return {
            itemHeight,
            selectedIndex,
            minTranslate: -itemHeight * (options.length - 1),
            maxTranslate: 0,
            scrollTranslate: -itemHeight * selectedIndex
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this.calInitialState(nextProps));
    },

    /**
     * calculate index according to scroll height
     * @param  {number}
     * @return {number}
     */
    calElementHighLight: function(scrollTranslate) {
        let {
            itemHeight
        } = this.state;
        let index = Math.round(Math.abs(scrollTranslate / itemHeight));
        this.setState({
            selectedIndex: index
        });
        return index;
    },

    /**
     * Touch start event callback
     * @event
     * @param  {Event}
     */
    handleTouchStart: function(e) {
        const startTouchY = e.targetTouches[0].pageY;
        this.setState(({
            scrollTranslate
        }) => ({
            isPicking: true,
            startTouchY,
            transitionDuration: 0,
            startScrollTranslate: scrollTranslate
        }));
        this.updateInertialFlag(e, true);
    },

    /**
     * TouchMove event callback
     * @event
     * @param  {Event}
     */
    handleTouchMove: function(e) {
        e.preventDefault();
        const touchY = e.targetTouches[0].pageY;
        const {
            isPicking,
            minTranslate,
            maxTranslate,
            startTouchY,
            startScrollTranslate
        } = this.state;
        const {
            itemHeight
        } = this.props;
        if (!isPicking) return;
        let nextScrollTranslate = startScrollTranslate + touchY - startTouchY;
        // calculate translate distance if exceeding [minTranslate, maxTranslate]
        if (nextScrollTranslate < minTranslate - 1.5 * itemHeight) {
            nextScrollTranslate = minTranslate - 1.5 * itemHeight;
        } else if (nextScrollTranslate > maxTranslate + 1.5 * itemHeight) {
            nextScrollTranslate = maxTranslate + 1.5 * itemHeight;
        }
        this.setState({
            scrollTranslate: nextScrollTranslate
        });
        this.calElementHighLight(nextScrollTranslate);
        this.updateInertialFlag(e);
    },

    /**
     * TouchEnd event callback
     * @event
     * @param  {Event}
     */
    handleTouchEnd: function(e) {
        this.setState({
            isPicking: false
        });
        this.startInertialScroll(e);
    },

    /**
     * TouchCancel event callback
     * @event
     * @param  {Event}
     */
    handleTouchCancel: function(e) {
        e.preventDefault();
        this.setState({
            isPicking: false
        });
        this.startInertialScroll(e);
    },

    /**
     * Get prepared for inertial scroll, which means getting inertial distance and duration
     * @param  {Event}
     */
    startInertialScroll: function(e) {
        let point = e.changedTouches ? e.changedTouches[0] : e;
        let nowTime = e.timeStamp || Date.now();
        let velocity = (point.pageY - this.state.lastMoveStart) / (nowTime - this.state.lastMoveTime); // 最后一段时间手指滑动速度
        let direction = velocity > 0 ? -1 : 1; // decelaration direction
        let decelaration = direction * 0.0006 * -1;
        let duration = Math.abs(velocity / decelaration); // time for decelaration
        let distance = velocity * duration / 2; // distance during decelaration
        let {
            itemHeight,
            scrollTranslate,
            minTranslate,
            maxTranslate
        } = this.state;
        if (distance === 0) {
            // if distance equals 0, there is no need to scrollDist, just do endScroll
            this.endScroll();
            return;
        }
        let oldDistance = distance;
        if (scrollTranslate + distance < minTranslate - itemHeight) {
            distance = minTranslate - scrollTranslate - itemHeight;
            duration = duration * (distance / oldDistance) * 0.6;
        } else if (scrollTranslate + distance > maxTranslate + itemHeight) {
            distance = maxTranslate - scrollTranslate + itemHeight;
            duration = duration * (distance / oldDistance) * 0.6;
        }
        this.scrollDist(this.state.scrollTranslate, distance, duration);
    },

    /**
     * Translate animation 
     * @param  {number}
     * @param  {number} 
     * @param  {number}
     */
    scrollDist: function(startTranslate, distance, duration) {
        let self = this;
        self.shouldStopInertialMove = false;
        let frameInterval = 13;
        let stepCount = duration / frameInterval;
        let stepIndex = 0;
        (function inertiaMove() {
            if (self.shouldStopInertialMove) return;
            let newDistance = self.quartEaseOut(stepIndex, startTranslate, distance, stepCount);
            self.setState({
                scrollTranslate: newDistance
            });
            self.calElementHighLight(newDistance);
            stepIndex++;
            if (stepIndex > stepCount - 1 || newDistance < self.minTranslate || newDistance > self.maxTranslate) {
                self.endScroll();
                return;
            }
            setTimeout(inertiaMove, frameInterval);
        })(startTranslate, distance, duration);
    },
    quartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },

    /**
     * Move to the rigth place after inertial scroll
     */
    endScroll: function() {
        const {
            minTranslate,
            maxTranslate,
            scrollTranslate,
            itemHeight
        } = this.state;
        let finalTranslate = scrollTranslate;
        let transitionDuration = 150;
        if (scrollTranslate < minTranslate) {
            finalTranslate = minTranslate;
        } else if (scrollTranslate > maxTranslate) {
            finalTranslate = maxTranslate;
        } else {
            finalTranslate = -itemHeight * Math.round(-scrollTranslate / itemHeight);
            transitionDuration = 100;
        }
        this.setState({
            transitionDuration,
            scrollTranslate: finalTranslate
        });
        this.triggerSelect(this.calElementHighLight(finalTranslate));
    },

    /**
     * Update the shouldStopInertialMove flag
     * @param  {Event}
     * @param  {Boolean}
     */
    updateInertialFlag: function(e, isStart) {
        let point = e.targetTouches ? e.targetTouches[0] : e;
        if (isStart) {
            this.setState({
                lastMoveTime: e.timeStamp || Date.now(),
                lastMoveStart: point.pageY
            });
            this.shouldStopInertialMove = true;
        } else {
            let nowTime = e.timeStamp || Date.now();
            if (nowTime - this.state.lastMoveTime > 300) {
                this.setState({
                    lastMoveTime: nowTime,
                    lastMoveStart: point.pageY
                });
                this.shouldStopInertialMove = true;
            }
        }
    },

    /**
     * Trigger select action
     * @param  {number} finally selected index
     */
    triggerSelect: function(index) {
        let {
            options
        } = this.props;
        this.props.onSelected(options[index], index, this.props.columnIndex);
    },

    /**
     * Set selectedIndex and scrollTranslate
     * @param  {number}
     */
    selectItem: function(index) {
        const {
            itemHeight
        } = this.state;
        this.setState({
            selectedIndex: index,
            scrollTranslate: -itemHeight * index,
            transitionDuration: 150
        });
        this.triggerSelect(index);
    },

    /**
     * Render every single option
     * @return {Array}
     */
    renderItem: function() {
        let {
            options
        } = this.props;
        let {
            selectedIndex
        } = this.state;
        let self = this;
        !selectedIndex && (selectedIndex = 0);
        return options.map((option, index) => {
            const className = index === selectedIndex ? 'highlight' : '';
            return (
                <li key={index} className={className} onClick={()=> {self.selectItem(index)}}>{option.name}</li>
            );
        });
    },
    render: function() {
        const translateString = `translate3d(0, ${this.state.scrollTranslate}px, 0)`;
        const style = {
            MsTransform: translateString,
            MozTransform: translateString,
            OTransform: translateString,
            WebkitTransform: translateString,
            transform: translateString
        };
        style.transitionDuration = this.state.transitionDuration + 'ms';
        return (
            <ul className="pop-picker-scroller" 
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                onTouchCancel={this.handleTouchCancel}
                style={style}
            >
                {this.renderItem()}
            </ul>
        );
    }
});

/**
 * PickerHeader component which stands an the head of each Picker
 */
export const PickerHeader = React.createClass({
    propTypes: {
        closePicker: React.PropTypes.func,
        confirmPicker: React.PropTypes.func,
        colorStyle: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            closePicker: function() {},
            confirmPicker: function() {},
            colorStyle: 'primary'
        };
    },

    render: function() {
        const {
            closePicker,
            confirmPicker,
            colorStyle
        } = this.props;
        let btnClass = className('btn-xs', 'btn-' + colorStyle);
        return (
            <div className="pop-picker-header" onTouchMove={(e) => {e.preventDefault()}}>
                <Button className="btn-xs" onClick={closePicker}>取消</Button> 
                <Button className={btnClass} style={{'float':'right'}} onClick={confirmPicker}>确定</Button>
            </div>
        );
    }
});

/**
 * Picker component which contains PickerHeader, PickerColumn and BackDrop
 */
const Picker = React.createClass({
    mixins: [PickerMixin],
    propTypes: {
        className: React.PropTypes.string,
        colorStyle: React.PropTypes.string,
        columnNum: React.PropTypes.number,
        selectedIndexGroup: React.PropTypes.array,
        isCascading: React.PropTypes.bool,
        isPickerOpen: React.PropTypes.bool,
        itemHeight: React.PropTypes.number,
        lineNum: React.PropTypes.number,
        optionsGroup: React.PropTypes.array,
        onChange: React.PropTypes.func,
        onClose: React.PropTypes.func,
        onSelected: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            isPickerOpen: this.props.isPickerOpen,
            ...this.filterOptions()
        }
    },

    getDefaultProps: function() {
        return {
            className: '',
            selectedIndexGroup: null, // default selected index array
            isPickerOpen: false, // whether to open picker. true means open
            isCascading: false, // whether the column is cascadable
            columnNum: -1, // how many columns to display. Default -1, means to display all arrays you provided
            lineNum: 5, // how many lines to display
            itemHeight: 36, // height of each item
            optionsGroup: [], // options to display
            onChange: function() {},
            onClose: function() {},
            onSelected: function() {}
        };
    },

    /**
     * filter options for different use(whether cascading or not)
     */
    filterOptions: function() {
        let {
            selectedIndexGroup,
            isCascading,
            columnNum,
            optionsGroup
        } = this.props;

        // if state exits and selectedIndecGroup exits, use this.state.selectedIndexGroup instead
        // selectedIndexGroup = (this.state && this.state.selectedIndexGroup) || (selectedIndexGroup && Array.isArray(selectedIndexGroup) ? selectedIndexGroup : [0]);
        selectedIndexGroup = selectedIndexGroup || [];
        if (isCascading) {
            // if column is cascadable, get displayed column options due to default selected index
            columnNum = columnNum === -1 ? 1 : columnNum;
            let columnList = [];
            for (let i = 0, optionList = optionsGroup; i < columnNum; i++) {
                columnList.push(optionList);
                selectedIndexGroup[i] = selectedIndexGroup[i] || 0;
                optionList = optionList[selectedIndexGroup[i]].children || [];
            }
            return {
                optionsGroup: columnList,
                selectedIndexGroup
            };
        } else {
            let columnList = [];
            if (columnNum === -1) {
                // if not set columnNum, default to display all arrays you provided
                if (Array.isArray(optionsGroup[0])) {
                    columnList = optionsGroup;
                } else {
                    columnList.push(optionsGroup);
                }
            } else {
                let length = Array.isArray(optionsGroup[0]) ? optionsGroup.length : 1;
                for (let i = 0; i < columnNum && i < length; i++) {
                    columnList.push(optionsGroup[i]);
                }
            }
            return {
                optionsGroup: columnList,
                selectedIndexGroup
            };
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            isPickerOpen: nextProps.isPickerOpen,
            ...this.filterOptions()
        });
    },

    /**
     * Callback when item selected
     * @event
     * @param  {Object}
     * @param  {number} index of selected item
     * @param  {number} index of selected column
     */
    onChange: function(selectedValue, itemIndex, columnIndex) {
        const {
            columnNum,
            isCascading
        } = this.props;
        let {
            optionsGroup,
            selectedIndexGroup
        } = this.state;
        if (isCascading) {
            // change children column
            for (let i = columnIndex + 1; i < columnNum; i++) {
                if (i === columnIndex + 1) {
                    optionsGroup[i] = optionsGroup[i - 1][itemIndex].children || [];
                } else {
                    optionsGroup[i] = optionsGroup[i - 1][0].children || [];
                }
                selectedIndexGroup[i] = selectedIndexGroup[i] < optionsGroup[i].length ? selectedIndexGroup[i] : 0;

            }
        }
        selectedIndexGroup[columnIndex] = itemIndex;
        this.setState({
            optionsGroup,
            selectedIndexGroup
        });
    },

    /**
     * Render PickerColumn
     */
    renderColumns: function() {
        let {
            optionsGroup,
            selectedIndexGroup
        } = this.state;

        return (
            <div className="pop-picker-container">
                {
                    optionsGroup.length ? optionsGroup.map((value, index) => (
                        <div className="pop-picker-inner" key={index}>
                            <PickerColumn
                                columnIndex={index}
                                selectedIndex={(selectedIndexGroup && typeof selectedIndexGroup[index] === 'number' ? selectedIndexGroup[index] : 0)}
                                itemHeight={this.props.itemHeight}
                                onSelected={this.onChange}
                                options={value}
                            ></PickerColumn>
                            <div className="pop-picker-rule pop-picker-rule-bg"></div>
                        </div>
                    )) : ''
                }
            </div>
        );
    },
    render: function() {

        let popPickerClass = className('pop-picker', this.props.className, {
            'in': this.state.isPickerOpen
        });
        let {
            lineNum,
            itemHeight
        } = this.props;
        let popPickerBodyStyle = {
            'boxSizing': 'content-box',
            height: lineNum * itemHeight + 'px'
        };
        return (
            <div>
                <div className={popPickerClass} onTouchMove={(e) => {e.preventDefault()}}>
                    <PickerHeader colorStyle={this.props.colorStyle} confirmPicker={this.confirmPicker} closePicker={this.closePicker}></PickerHeader>
                    <div className="pop-picker-body" style={popPickerBodyStyle}>
                        {this.renderColumns()}
                    </div>
                </div>
                <BackDrop isOpen={this.state.isPickerOpen} onClick={() => {this.closePicker();}}></BackDrop>
            </div>
        );
    }
});


/**
 * Date Picker Component
 */
export const DatePicker = React.createClass({
    mixins: [PickerMixin],
    PropTypes: {
        startTime: React.PropTypes.string,
        endTime: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            selectedIndexGroup: [0, 0],
            ...this.computeState(this.props)
        };
    },
    getDefaultProps: function() {
        return {

        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            isPickerOpen: nextProps.isPickerOpen
        });
    },
    /**
     * Get Date Options for Picker
     * @param  {Date} start date time for Picker
     * @param  {Date} end date time for Picker
     * @param  {Date} selected time
     * @param  {number} slice start index
     * @param  {number} slice end index
     * @return {Object}
     */
    getDateOptionsGroup: function(startTime, endTime, selectedTime, startIndex, endIndex) {
        let year = [];
        let month = [];
        let date = [];
        let hour = [];
        let minute = [];
        let second = [];
        let optionsGroup = [year, month, date, hour, minute, second];
        let selectedIndexGroup = [0, 0, 0, 0, 0, 0];
        let titles = ['年', '月', '日', '时', '分', '秒', '时段'];
        for (let i = startTime.getFullYear(); i <= endTime.getFullYear(); i++) {
            if (selectedTime.getFullYear() === i) selectedIndexGroup[0] = i - startTime.getFullYear();
            year.push({
                id: i,
                name: i
            });
        }
        for (let i = 1; i <= 12; i++) {
            if (selectedTime.getMonth() + 1 === i) selectedIndexGroup[1] = i - 1;
            month.push({
                id: i,
                name: i < 10 ? ('0' + i) : i
            });
        }
        for (let i = 1; i <= this.getDaysofMonth(selectedTime); i++) {
            if (selectedTime.getDate() === i) selectedIndexGroup[2] = i;
            date.push({
                id: i,
                name: i < 10 ? ('0' + i) : i
            });
        }
        for (let i = 0; i <= 23; i++) {
            if (selectedTime.getHours() + 1 === i) selectedIndexGroup[3] = i;
            hour.push({
                id: i,
                name: i < 10 ? ('0' + i) : i
            });
        }
        for (let i = 0; i <= 59; i++) {
            if (selectedTime.getMinutes() + 1 === i) selectedIndexGroup[4] = i;
            minute.push({
                id: i,
                name: i < 10 ? ('0' + i) : i
            });
        }
        for (let i = 1; i <= 59; i++) {
            if (selectedTime.getSeconds() + 1 === i) selectedIndexGroup[5] = i;
            second.push({
                id: i,
                name: i < 10 ? ('0' + i) : i
            });
        }
        return {
            optionsGroup: optionsGroup.slice(startIndex, endIndex),
            selectedIndexGroup: selectedIndexGroup.slice(startIndex, endIndex),
            titles: titles.slice(startIndex, endIndex)
        }
    },

    /**
     * Get total days of a month
     * @param  {Date}
     * @return {number}
     */
    getDaysofMonth: function(dateTime) {
        let year = dateTime.getFullYear();
        let month = dateTime.getMonth() + 1;
        return (new Date(year, month, 0)).getDate();
    },

    /**
     * Compute state due to props
     * @param  {Object} the props of this component
     * @return {[type]}
     */
    computeState: function(props) {
        let startTime = props.startTime ? new Date(props.startTime) : new Date('1910');
        let currentTime = new Date();
        let endTime = props.endTime ? (new Date(props.endTime)) : (new Date(currentTime.getFullYear() + 5, currentTime.getMonth() + 1, currentTime.getDate()));
        switch (props.type) {
            case 'date':
                return this.getDateOptionsGroup(startTime, endTime, currentTime, 0, 3);
            case 'time':
                return this.getDateOptionsGroup(startTime, endTime, currentTime, 3, 6);
            case 'month':
                return this.getDateOptionsGroup(startTime, endTime, currentTime, 0, 2);
            case 'hour':
                return this.getDateOptionsGroup(startTime, endTime, currentTime, 0, 4);
            case 'minute':
                return this.getDateOptionsGroup(startTime, endTime, currentTime, 0, 5);
            default:
                return this.getDateOptionsGroup(startTime, endTime, currentTime, 0, 6);
        }
    },
    onChange: function(selectedValue, itemIndex, columnIndex) {
        const {
            columnNum,
            isCascading
        } = this.props;
        let {
            optionsGroup,
            selectedIndexGroup
        } = this.state;
        if (isCascading) {
            for (let i = columnIndex + 1; i < columnNum; i++) {
                if (i == columnIndex + 1)
                    optionsGroup[i] = optionsGroup[i - 1][itemIndex].children || [];
                else
                    optionsGroup[i] = optionsGroup[i - 1][0].children || [];
            }
        }
        selectedIndexGroup[columnIndex] = itemIndex;
        this.setState({
            optionsGroup,
            selectedIndexGroup
        })
    },
    renderInner: function() {
        let {
            optionsGroup,
            selectedIndexGroup
        } = this.state;
        let self = this;
        return (
            <div className="pop-picker-container">
                {
                    optionsGroup.length ? optionsGroup.map((value, index) => (
                        <div className="pop-picker-inner" key={index}>
                            <PickerColumn
                                columnIndex={index}
                                options={value}
                                defaultIndex={selectedIndexGroup[index]}
                                onSelected={self.onChange}
                            ></PickerColumn>
                            <div className="pop-picker-rule pop-picker-rule-bg"></div>
                        </div>
                    )) : ''
                }
            </div>
        );
    },
    render: function() {
        let backdropClass = className('pop-picker-backdrop', {
            'in': this.state.isPickerOpen
        });
        let popPickerClass = className('pop-picker', {
            'in': this.state.isPickerOpen
        });
        return (
            <div>
                <div className={popPickerClass} >
                    <PickerHeader confirmPicker={this.confirmPicker} closePicker={this.closePicker}></PickerHeader>
                    <div className="pop-picker-title">
                        {this.state.titles.map((value, index) => <div key={index}>{value}</div>)}
                    </div>
                    <div className="pop-picker-body">
                        {this.renderInner()}
                    </div>
                </div>
                {this.state.isPickerOpen? <div className={backdropClass} onClick={this.closePicker}></div> : ''}
                
            </div>
        );
    }
});
export default Picker;