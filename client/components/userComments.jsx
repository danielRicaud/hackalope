import React from 'react';
import { connect } from 'react-redux';
import { Route, browserHistory, Redirect } from 'react-router';
import { commentsByAll} from '../actions/index.js';
import { createStore , bindActionCreators} from 'redux';


//Required Material-UI components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const UserComments = ({comments, dispatch}) => {

  const renderComments = () => {
    return comments.map(comment => {
      return (
        <li key = {comment._id} >

           <Card>
            <CardHeader
              title={comment.body}
              subtitle={comment.createdAt}
              avatar="https://avatars0.githubusercontent.com/u/8547538?v=3&s=460"
            />
            <CardText>
              {comment._id}
            </CardText>
          </Card>
        </li>
      );
    })
  };
  return (
    <div style={{ width: "100%", marginRight: 'auto', marginLeft: 'auto' }} >
      <ul style={{ 'listStyleType': 'none' }}>
      {renderComments()}
      </ul>
    </div>
  )
};
function mapStateToProps(state) {
  return {
    userComments: state.userComments
  }
};
export default connect(mapStateToProps)(UserComments);
