import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { getDiagnoseText } from 'commonFunc/transform';
import finish from './finish.png';
import right from './right.png';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      buDiagnosisList: [], // 诊断数据
      dataSource: [], // 处方数据
    };
  };
  componentWillMount(){
    this.getDiagnoseData();
    this.getOrderData();
  };
  /** [getDiagnoseData 组件初始化获取加载诊断数据] */
  getDiagnoseData(){
    let self = this;
    let params = {
      url: 'BuDiagnosisInfoController/getData',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        registerid: this.props.registerid
      },
    };
    function callBack(res){
      if(res.result && res.data){ // 获取当前诊断明细数据
        let { buDiagnosisList, ...buDiagnosisInfo } = res.data;
        self.setState({
          buDiagnosisList: buDiagnosisList,
        });
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getOrderData 获取医嘱数据] */
  getOrderData(){
    let registerid = this.props.registerid;
    let self = this;
    let params = {
      url: 'BuOrderController/getBuOrderByRegisterId',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        registerid: registerid,
      },
    };
    function callBack(res){
      if(res.result){
        let dataSource = res.data;
        if(dataSource){
          dataSource.forEach((item) => {
            self.getOrderDetailData(item.orderid);
          });
        }
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  getOrderDetailData(orderid){
    let params = {
      url: 'BuOrderController/getData',
      server_url: config_InteLigenTreat_url + 'TCMAE/',
      data: {
        orderid: orderid
      }
    };
    let that = this;
    function callBack(res) {
      if(res.result){
        let dataSource = this.state.dataSource;
        dataSource.push(res.data);
        this.setState({ dataSource });
      }
    };
    ajaxGetResource(params, callBack);
  };
  getOrderTypeDic(orderTypr){

  };
  render() {
    let { dataSource, buDiagnosisList } = this.state;
    return (
        <Container >
          <Finish src={finish} />
          <FinishTip>辩证论治已完成</FinishTip>
          <Content>
            <RightTip><Right src={right} />已确认诊断结果：（成功加入该患者诊断）</RightTip>
            <Line>{getDiagnoseText(buDiagnosisList)}</Line>
            <RightTip><Right src={right} />已确认治疗方案：（成功加入该患者医嘱）</RightTip>
            {
              dataSource.map((item, index) => {
                <Line>{index + 1}.{item.ordertype}：</Line>
              })
            }
            <Line>1.中药处方：</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;药单：金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;用法/频次：口服/一日2次</Line>
            <Line>2.中成药处方：感冒清热颗粒 | 口服 | 1日2次</Line>
            <Line>3.中医适宜技术：适宜技术类型：针刺 |  取穴：大椎、合谷、风池</Line>
            <RightTip><Right src={right} />已确认诊断结果：（成功加入该患者诊断）</RightTip>
            <Line>感冒/风寒感冒</Line>
            <RightTip><Right src={right} />已确认治疗方案：（成功加入该患者医嘱）</RightTip>
            <Line>1.中药处方：</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;药单：金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;用法/频次：口服/一日2次</Line>
            <Line>2.中成药处方：感冒清热颗粒 | 口服 | 1日2次</Line>
            <Line>3.中医适宜技术：适宜技术类型：针刺 |  取穴：大椎、合谷、风池</Line>
          </Content>
          <ActionButton>
            <SureButton type="primary">关闭并返回HIS</SureButton>
            <BorderLink type="primary" onClick={() => {this.props.onStep(-1)}}>查看辨证论治详情>></BorderLink>
          </ActionButton>
        </Container>
    )
  }
}

const Container = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Finish = styled.img`
  width: 73px;
  height: 79px;
`;
const FinishTip = styled.p`
  margin: 20px;
  font-weight: 650;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.847058823529412);
  line-height: 32px;
`;
const Content = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Right = styled.img`
  margin: 5px;
`;
const RightTip = styled.div`
  height: 28px;
  width: 450px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Line = styled.div`
  height: 28px;
  width: 450px;
  padding-left: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ActionButton = styled.div`
  margin-top: 40px;
`;
const BorderLink = styled(Button)`
  ${buttonSty.white}
  border: none !important;
  rgb(22, 155, 213);
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-10-16
@描述：完成
*/
