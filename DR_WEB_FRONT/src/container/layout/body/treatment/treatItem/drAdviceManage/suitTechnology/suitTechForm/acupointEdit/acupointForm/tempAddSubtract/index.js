import React, {Component} from 'react';
import styled from 'styled-components';
import QuickInput from 'components/dr/input/quickInput';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class TempAddSubtract extends Component {
  constructor(props){
    super(props);
    this.state = {
      showResult: false,
      substractData: [], // 临症加减数据
    };
    this.showResult = this.showResult.bind(this);
    this.hideResult = this.hideResult.bind(this);
  };
  /** [getSubstract 获取临症加减数据] */
  getSubstract(keyword){
    let params = {
      url: 'tcmTreatdiseaseSt/getIdNameList',
      server_url: 'http://10.192.1.115:8765/TCMAE/',
      data: {
        TreatdiseaseStName: keyword
      }
    };
    let that = this;
    function success(res) {
      if(res.result){
        let substractData = res.data;
        that.setState({ substractData })
      }
    };
    ajaxGetResource(params, success);
  };
  showResult(value){
    this.getSubstract(value);
    this.setState({
      showResult: true
    });
  };
  hideResult(){
    this.setState({
      showResult: false
    });
  };
  getValue(e){
    this.setState({
      showResult: false,
    });
    this.props.onChange(e.target.innerText);
  };
  render() {
    let showResult = this.state.showResult;
    let substractData = this.state.substractData;
    let value = this.state.value;
    return (
      <SpecQuickInput placeholder='请选择或者输入症候首字母' {...this.props} displayed={this.showResult}>
      {
        showResult?
        (
          <Result>
          {
            substractData.map((item, index) => <Line key={index} onClick={(e)=>{this.getValue(e)}}>{item.treatdiseaseName}</Line>)
          }
          </Result>
        )
        :null
      }
      </SpecQuickInput>
    );
  }
}
const SpecQuickInput = styled(QuickInput)`
  ::-webkit-input-placeholder { /* WebKit browsers */
      color: rgb(153, 153, 153);
  }
`;
const Result = styled.div`
  position: absolute;
  width: 100%;
  min-height: 20px;
  z-index: 3;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  color: rgba(0,0,0,0.65);
  background: white
`;
const Line = styled.p`
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background: #e6f7ff
  }
`;
/*
@作者：马晓敏
@日期：2018-07-10
@描述：临症加减
*/
