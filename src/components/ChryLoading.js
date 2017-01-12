import React from 'react';
import classnames from 'classnames';
const ChryLoading = React.createClass({

    render() {
        let {
            size
        } = this.props;
        let chryClassName = classnames('chry-load', {
            [`chry-load-${size}`]: size
        });
        return (
            <div className={chryClassName}>
                <div className="line">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
});

export default ChryLoading;