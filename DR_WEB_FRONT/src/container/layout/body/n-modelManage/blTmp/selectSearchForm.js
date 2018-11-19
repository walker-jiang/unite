import React, {Component} from 'react';
import { Form, Row, Col, Input } from 'antd';
import YSelectSearch from '../YSelectSearch.js';

import { 
  getList, //获取模板分类 
} from '../service.js';

const DEFAULT_USERID = sessionStorage.getItem('userid');
const DEFAULT_ORGID = sessionStorage.getItem('orgid');
const getDataParam={ temtype: 0, personid: DEFAULT_USERID, orgid: DEFAULT_ORGID, provid: 1 }
const FormItem = Form.Item;

export default class SelectSearchForm extends Component {
  render() {
    const { getFieldDecorator, formItemLayout, selectItemObj, disabled = false} = this.props;
    let parentidInitialValue = {};
    if('temmanageid' in selectItemObj) {
            parentidInitialValue = {value: selectItemObj['temmanageid'], item: [selectItemObj]}
        } else {
            parentidInitialValue = {value: "", item: []};
        }
    return (
      <Row>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            className='height'
            label="模板分类"
          >
          {getFieldDecorator('temmanageid', {
            initialValue: parentidInitialValue,
            rules: [{ required: true, message: '请输入分类'}],
          })(
            <YSelectSearch allowClear={true}
                placeholder="模板名称"
                style={{ 'width': '100%'}}
                remoteService={getList}
                paramData={getDataParam}
                fieldKey='temmanageid'
                fieldName='temname'
                getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
          )}
          </FormItem>
        </Col>
      </Row>
    );
  }
}