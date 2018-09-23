import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import IllHisEnterPop from './illHisEnterPop';

const FormItem = Form.Item;

export default class Index extends Component {
  /**
   * [getFormItemProps 根据不同标题返回对应表单ID]
   * @param  {[type]} title [标题]
   * @return {[type]}       [表单ID]
   */
  getFormItemProps(title){
    switch(title){
      case '现病史':
        return 'hpi';
      break;
      case '过敏史':
        return 'allergichistory';
      break;
      case '既往史':
        return 'pasthistory';
      break;
      case '个人史':
        return 'personhistory';
      break;
      case '月经婚育史':
        return 'moHistory';
      break;
      case '家族史':
        return 'familyhistory';
      break;
    };

  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue ,title} = this.props;
    let label_prop  = this.getFormItemProps(title);
    return (
      <Row className='height'>
        <Col>
          <FormItem
            colon={false}
            {...formItemLayout}
            label={title +' ：'}
            className='height' >
            {getFieldDecorator(label_prop, {
              initialValue: initialValue,
            })(
              <IllHisEnterPop title={title} />
            )}
          </FormItem>
        </Col>
      </Row>
    );
  }
}
/*
@作者：姜中希
@日期：2018-06-25
@描述：书写诊疗单界面病史表单组件
*/
