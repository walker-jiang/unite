import React, {Component} from 'react';
import styled from 'styled-components';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { Radio, Form, Row, Col, Select} from 'antd';
import radioSty from 'components/antd/style/radio';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class CarefulItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      YESNO: [], // 是否
      ispregnancy: '', // 是否孕期
    };
    this.ispregnancyHandler = this.ispregnancyHandler.bind(this);
  };
  componentWillMount(){
    this.getDictData('YESNO');
  }
  /**
   * [getDictData 表单字典数据]
   * @param  {[type]} dictNo [字典类型]
   * @return {[type]}        [undefined]
   */
  getDictData(dictNo){
    let self = this;
    let params = {
      url: 'BaDatadictController/getData',
      data: {
        dictNo: dictNo
      },
    };
    function callBack(res){
      if(res.result){
        let arr = res.data.baDatadictDetailList;
        self.setState({ [dictNo]: arr, ispregnancy: arr[0].value });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  ispregnancyHandler(e){
    this.setState({ ispregnancy: e.target.value })
  };
  render() {
    const { getFieldDecorator, initialValue} = this.props;
    const ispregnancy = this.state.ispregnancy;
    const formItemLayoutBehind = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 19 },
        sm: { span: 19 },
      },
     };
    const YESNO = this.state.YESNO;
    if(window.sex == '1'){
      initialValue.isperiod = '02';
      initialValue.ispregnancy = '02';
    }
    return (
      <Row>
        <Col span={8} offset={1}>
          <FormItem
            {...formItemLayoutBehind}
            colon={false}
            label="是否经期"
            >
            {getFieldDecorator('isperiod', {
              initialValue: YESNO.length ? ( initialValue.isperiod ? initialValue.isperiod : YESNO[0].value ) : ''
            })(
              <SpecRadioGroup disabled={window.sex == '1'}>
              {
                YESNO.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
              }
              </SpecRadioGroup>
            )}
          </FormItem>
        </Col>
        <Col span={8} offset={1}>
          <FormItem
            {...formItemLayoutBehind}
            colon={false}
            label="是否孕期"
            >
            {getFieldDecorator('ispregnancy', {
              initialValue: YESNO.length ? ( initialValue.ispregnancy ? initialValue.ispregnancy : YESNO[0].value ) : ''
            })(
              <SpecRadioGroup onChange={this.ispregnancyHandler} disabled={window.sex == '1'}>
              {
                YESNO.map(item => <Radio value={item.value} key={item.value}>{item.vname}</Radio>)
              }
              </SpecRadioGroup>
            )}
          </FormItem>
        </Col>
        {
          ispregnancy == '01' && window.sex != '1'?
          <Col span={5} offset={1}>
            <FormItem
              colon={false}
              >
                {getFieldDecorator('gestationalWeeks', {
                  initialValue: initialValue.gestationalWeeks ? initialValue.gestationalWeeks : 1
                })(
                  <Select>
                    <Option value={1}>1个月</Option>
                    <Option value={2}>2个月</Option>
                    <Option value={3}>3个月</Option>
                    <Option value={4}>4个月</Option>
                    <Option value={5}>5个月</Option>
                    <Option value={6}>6个月</Option>
                    <Option value={7}>7个月</Option>
                    <Option value={8}>8个月</Option>
                    <Option value={9}>9个月</Option>
                    <Option value={10}>10个月</Option>
                  </Select>
                )}
              </FormItem>
            </Col> : null
        }
      </Row>
    );
  }
}
const SpecRow = styled(Row)`
  margin-bottom: 15px;
  .ant-form-item {
    margin-bottom: 4px;
  }
`;
const SpecRadioGroup = styled(RadioGroup)`
  ${radioSty.borderRadioGroup}
`;
/*
@作者：姜中希
@日期：2018-09-04
@描述：病情病历确认界面经期 孕期组件
*/
