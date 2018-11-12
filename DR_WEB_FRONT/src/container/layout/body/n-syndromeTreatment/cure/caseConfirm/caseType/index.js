import React, {Component} from 'react';
import styled from 'styled-components';
import { Radio, Form, Row, Col} from 'antd';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      casetype: []
    };
  };
  componentWillMount(){
    this.getDictList(['casetype']);
  };
  /**
   * [getDictList 获取字典列表]
   * @param  {[type]} DictTypeList [字典项数组]
   * @return {[type]}              [undefined]
   */
  getDictList(DictTypeList){
    let self = this;
    let params = {
      url: 'BaDatadictController/getListData',
      data: {
        dictNoList: DictTypeList
      },
    };
    function callBack(res){
      if(res.result){
        let dictListObj = {};
        res.data.forEach(item => {
          dictListObj[item.dictno.toLowerCase()] = item.baDatadictDetailList;
        });
        self.setState({...dictListObj});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue} = this.props;
    const casetype = this.state.casetype;
    return (
      <SpecRow>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            colon={false}
            label="就诊类型："
          >
          {getFieldDecorator('casetype', {
            initialValue: initialValue
          })(
            <RadioGroup >
            {
              casetype.map(item => <Radio key={item.value} value={item.value}>{item.vname}</Radio>)
            }
            </RadioGroup>
          )}
          </FormItem>
        </Col>
      </SpecRow>
    );
  }
}
const SpecRow = styled(Row)`
  .ant-form-item {
    margin-bottom: 4px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-04
@描述：病情病历确认界面就诊类型组件
*/
