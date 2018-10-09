import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS } from 'immutable';
import { IndexRoute, browserHistory } from 'react-router';
import $ from 'jquery';
import { Icon, Row, Col, Button, } from 'antd';



class ExceptionPage extends Component {

  render() {
    return (
      <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
        <p>404</p>
      </QueueAnim>
    );
  }
}
export default ExceptionPage;
