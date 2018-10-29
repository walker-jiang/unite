import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import { getDiagnoseText } from 'commonFunc/transform';
import finish from './finish.png';
import right from './right.png';

export default class Finish extends Component {
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
        registerid: window.registerID
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
    let self = this;
    let params = {
      url: 'BuOrderController/getBuOrderByRegisterId',
      server_url: config_InteLigenTreat_url+'TCMAE/',
      data: {
        registerid: window.registerID,
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
        let dataSource = that.state.dataSource;
        dataSource.push(res.data);
        that.setState({ dataSource });
      }
    };
    ajaxGetResource(params, callBack);
  };
  /**
   * [getOrderTypeDic 获取医嘱组件]
   * @param  {[type]} item  [医嘱对象]
   * @param  {[type]} index [索引]
   * @return {[type]}       [组件]
   */
  getOrderTypeDic(item, index){
    switch (item.ordertype) {
      case 1:
        return (
          <Line key={item.orderid}>{index + 1}.检验处方：</Line>
        );
        break;
      case 2:
        return (
          <Line key={item.orderid}>{index + 1}.检查处方：</Line>
        );
        break;
      case 3:
        return (
          <div>
            <Line key={item.orderid}>{index + 1}.中药处方：</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;药单：{this.getHerbalNames(item.buOrderDtlList)}</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;用法/频次：{item.buRecipe.treatway}/{item.buRecipe.freqname}</Line>
          </div>
        );
      case 4:
        return (
          <div>
            <Line key={item.orderid}>{index + 1}.中成药/西药处方：</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;{this.getChMedicineNames(item.buOrderDtlList)}</Line>
          </div>
        );
        break;
      case 5:
        let suitTechData = [];
        item.buOrdmedical.buOrdmedicalSuitList.forEach((itemChild) => {
          itemChild.buOrderDtlList.forEach((itemChildChild) => {
            suitTechData.push(itemChildChild); // 遍历出医嘱明细项
          });
        })
        suitTechData.concat(item.buOrderDtlList);
        return (
          <div>
            <Line key={item.orderid}>{index + 1}.适宜技术处方：</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;{this.getSuitTechNames(suitTechData)}</Line>
          </div>
        );
        break;
      case 6:
        return (
          <Line key={item.orderid}>{index + 1}.西医治疗处方：</Line>
        );
        break;
      case 7:
        return (
          <Line key={item.orderid}>{index + 1}.材料处方：</Line>
        );
        break;
      default:
    }
  };
  getHerbalNames(herbalData = []){
    let herbalNames = herbalData.map((item) => item.itemname + item.count + 'g');
    return herbalNames.join('、');
  };
  getChMedicineNames(medicineData = []){
    let medicineNames = medicineData.map((item) => item.itemname + ' | ' + item.usagename + ' |  ' + item.freqname);
    return medicineNames.join('、');
  };
  getSuitTechNames(suitTechData = []){
    let suitTechNames = suitTechData.map((item) => {
      let acunames = [];
      if(item.buImtreatprelistStAcupoints){
        acunames = item.buImtreatprelistStAcupoints.map( itemChild => itemChild.acuname); // 穴位
      }
      return '适宜技术类型：' + item.itemname + ' | ' + '取穴：' +  acunames.join('、')
    });
    return suitTechNames.join('，');
  };
  render() {
    let { dataSource, buDiagnosisList } = this.state;
    console.log('dataSource', dataSource);
    return (
        <Container >
          <FinishImg src={finish} />
          <FinishTip>辩证论治已完成</FinishTip>
          <Content>
            <RightTip><Right src={right} />已确认诊断结果：（成功加入该患者诊断）</RightTip>
            <Line>{getDiagnoseText(buDiagnosisList)}</Line>
            <RightTip><Right src={right} />已确认治疗方案：（成功加入该患者医嘱）</RightTip>
            {
              dataSource.map((item, index) => {
                return this.getOrderTypeDic(item, index)
              })
            }
            {
              // <Line>1.中药处方：</Line>
              // <Line>&nbsp;&nbsp;&nbsp;&nbsp;药单：金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g</Line>
              // <Line>&nbsp;&nbsp;&nbsp;&nbsp;用法/频次：口服/一日2次</Line>
              // <Line>2.中成药处方：感冒清热颗粒 | 口服 | 1日2次</Line>
              // <Line>3.中医适宜技术：适宜技术类型：针刺 |  取穴：大椎、合谷、风池</Line>
              // <RightTip><Right src={right} />已确认诊断结果：（成功加入该患者诊断）</RightTip>
              // <Line>感冒/风寒感冒</Line>
              // <RightTip><Right src={right} />已确认治疗方案：（成功加入该患者医嘱）</RightTip>
              // <Line>1.中药处方：</Line>
              // <Line>&nbsp;&nbsp;&nbsp;&nbsp;药单：金银花10g、柴胡10g、栀子20g、枸杞10g、党参10g、黄芪20g</Line>
              // <Line>&nbsp;&nbsp;&nbsp;&nbsp;用法/频次：口服/一日2次</Line>
              // <Line>2.中成药处方：感冒清热颗粒 | 口服 | 1日2次</Line>
              // <Line>3.中医适宜技术：适宜技术类型：针刺 |  取穴：大椎、合谷、风池</Line>
            }
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
const FinishImg = styled.img`
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
