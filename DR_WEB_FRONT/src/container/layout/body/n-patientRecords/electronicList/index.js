import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import ScrollArea from 'components/scrollArea';
import ElectronicRight from '../electronicRight';
import 'antd/lib/button/style';
import './index.less';
import getResource from 'commonFunc/ajaxGetResource';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        arr: [],//后台数据
        valueColor: {0: 'selectColor'},
        show:'显示',
        i: '',//左侧key
    };
  }
  
  componentWillMount () {
    var patientid = this.props.patientid;
    let params = {
      url: 'BuPatientCaseController/getPatient',
      data: {
        patientid: patientid
      }
    };
    let that = this;
    function callBack(res){
        if(res.result){
            console.log('成功')
            var data = that.state.data;
            data.push(res.data[0]);
            that.setState({
                arr: res.data,
                i: 0,
                data
            })
      }else{
        that.setState({data: []});
      }
    };
    getResource(params, callBack);
  }

  handClickShow () {
      this.setState({
        data: this.state.arr
      })
  }

  //点击左侧List,div
  handClickList =  (i) => {
    console.log('zhixing',i)
      let obj={};
      obj[i]='selectColor';
      this.setState({
        valueColor: obj,
        i:i
      })
  }


  render() { 
    var { data, valueColor, arr, show, i } = this.state;
    let ctsorgidDic = this.props.ctsorgidDic;
    let upstamp = this.props.upstamp;
    let patientname = this.props.patientname;
    let sexDic = this.props.sexDic;
    let birthday = this.props.birthday;
    let patienttypeDic = this.props.patienttypeDic;
    console.log('jhdus',data)
    // console.log('jhduscdsfsd',arr)
    // console.log('i',i)
    var lodeData = data.map((item, i)=>{
        return (
            <ListData key={i} className= {this.state.valueColor[i]} onClick={()=>this.handClickList(i)}>
                <First>{upstamp.substr(0,10)}|{item.orgidDic}|医师：{item.doctorname}|{item.casetype == 1? '初诊':'复诊'}</First>
                <Second>诊断：{item.buDiagnosisInfo.diagnosisDesc}</Second>
            </ListData>
        )
    });
    console.log(lodeData);
    return (
    <Container>
        <CenterArea id="eleBingLi">
            <Row>
                <Col span={6}>
                    <ScrollArea height={100}>
                        <ListBorder className="listRightLine">
                            {lodeData}
                            <ShowHidden onClick={this.handClickShow.bind(this)}>{data.length == 1? '显示':'隐藏'}<Patientname>{patientname}</Patientname>更多病例信息>></ShowHidden>
                        </ListBorder>
                    </ScrollArea>
                </Col>   
                <Col span={16} offset={1}>
                    <ScrollArea height={100}>
                        <ElectronicRight data={data} i={i} patientname={patientname} sexDic={sexDic} birthday={birthday}  patienttypeDic={patienttypeDic} upstamp={upstamp} />
                    </ScrollArea>
                </Col>
            </Row>  
        </CenterArea>
      </Container>
    )
  }
}
const Container = styled.div`
  
`;
const Title = styled.div`
    border: 1px solid;
    border-color: rgba(204, 204, 204, 1);
    background-color: rgb(242, 242, 242);
    width: 100%;
    height: 50px;
    position: relative;
`;
const Ele = styled.span`
    color: rgb(51, 51, 51);
    font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    position: absolute;
    margin-top: 0.5rem;
    margin-left: 5rem;
`;
const BingCenter = styled.span`
    color: #0a6ecb;
`;
const ImgStyle = styled.div`
    margin-top: 0.5rem;
`;
const ImageWidth = styled.img`
    width: 3rem;
`;
const RuturnBack = styled.div`
    color: #0a6ecb;
    font-size: 15px;
    margin-top: 0.5rem;
`;
const CenterArea = styled.div`
    width: 100%;
`;
const Patientname = styled.span`
    color: #0a6ecb;
`;
const ListBorder = styled.div`
    width: 100%;
    height: 56rem;
    background-color: rgb(242,242,242);
    border: 1px solid;
    border-top:none;
    border-left:none;
    border-bottom:none; 
    border-image: -webkit-linear-gradient( #0a6ecb, #5599FF) 30 30;
	border-image: -moz-linear-gradient( #0a6ecb, #99BBFF) 30 30;
	border-image: linear-gradient( #0a6ecb, #CCDDFF) 30 30;
`;
const ListData = styled.div`
    width: 100%;
    height: 5rem;
    border:1px solid #ccc;
    border-top:none;
    border-left:none;
    border-right:none; 
`;
const First = styled.p`
    
`;
const Second = styled.p`
    
`;
const ShowHidden = styled.div`
    
`;
/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历父组件
*/
