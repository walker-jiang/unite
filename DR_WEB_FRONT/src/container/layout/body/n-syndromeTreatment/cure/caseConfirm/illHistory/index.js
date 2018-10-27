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
    };
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue ,title, disabled = false, isRequired = false} = this.props;
    let label_prop  = this.getFormItemProps(title);
    return (
      <Row>
        <Col>
          <FormItem
            colon={false}
            {...formItemLayout}
            label={title +' ：'}>
            {getFieldDecorator(label_prop, {
              initialValue: initialValue,
              rules: [{
                required: isRequired, message: '请输入现病史',
              }],
            })(
              <IllHisEnterPop disabled={disabled} title={title} />
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
