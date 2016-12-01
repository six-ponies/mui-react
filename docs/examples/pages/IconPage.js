import React from 'react';
import DocumentTitle from 'react-document-title';
import Grid from 'src/components/Grid';
import Col from 'src/components/Col';
import Icon from 'src/components/Icon';
const icons = ['add', 'appreciate', 'back', 'calendar', 'close', 'delete', 'edit', 'form', 'friend', 'friend_add', 'group', 'home', 'list', 'loading', 'lock', 'mark', 'message', 'more', 'move', 'my', 'profile', 'question', 'right', 'round_check', 'round_close', 'search', 'settings', 'text', 'time', 'unfold', 'unlock'];

const IconPage = React.createClass({
    render() {
        return (
            <DocumentTitle title='Icon'>
                <Grid avg={3} style={{'textAlign': 'center', 'color': '#797979'}}>
                    {
                        icons.map((icon, index) => {
                            return (
                                <Col key={index}>
                                    <Icon name={icon} style={{fontSize: '2rem'}}></Icon>
                                    <div>
                                        {icon}
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Grid>
            </DocumentTitle>
        );
    }
});

export default IconPage;