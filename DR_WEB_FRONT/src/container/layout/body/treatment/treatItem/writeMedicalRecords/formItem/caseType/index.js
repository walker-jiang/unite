import React, {Component} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Radio, Form, Row, Col} from 'antd';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CaseType extends Component {
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
        if(dictListObj){
          self.props.changeTabs(window.casetype_global ? window.casetype_global : ( dictListObj.casetype.length ? ( self.props.initialValue ? self.props.initialValue : dictListObj.casetype[0].value ) : ''));
        }
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
            label="初复诊："
          >
          {getFieldDecorator('casetype', {
            initialValue: window.casetype_global ? window.casetype_global : ( casetype.length ? ( initialValue ? initialValue : casetype[0].value ) : '') // initialValue == '1' && '1' || initialValue == '2'  && '2' || '0'
          })(
            <RadioGroup >
            {
              casetype.map(item => <Radio key={item.value} onClick={(e) => { this.props.changeTabs(e.target.value) }} value={item.value}>{item.vname}</Radio>)
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
  border-bottom: 1px solid #D7D7D7;
  border-top: 1px solid #D7D7D7;
  margin-bottom: 15px;
  .ant-form-item {
    margin-bottom: 4px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-04
@描述：书写诊疗单界面初复诊表单项
*/
export default withRouter(CaseType);
