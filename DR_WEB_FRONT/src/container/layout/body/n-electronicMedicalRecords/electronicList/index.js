import React, { Component } from 'react';
import { List, Button, Skeleton, Row, Col } from 'antd';
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
    // this.handClickList = this.handClickList.bind(this);
  }
  
  componentWillMount () {
    // var data = this.state.data;
    // var arr = this. state.arr;  
    // var first = data.push(arr[0]);
    // console.log('hahah',this.props.patientid)
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
        // that.setState({data: []});
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
    var patientname = this.props.patientname;
    var sex = this.props.sex;
    var birthday = this.props.birthday;
    var patienttypeDic = this.props.patienttypeDic;
    var examDate = this.props.examDate;
    var casetype = this.props.casetype;
    console.log('jhdus',data)
    console.log('jhduscdsfsd',arr)
    console.log('i',i)
    var lodeData = data.map((item, i)=>{
        return (
            <ListData key={i} className= {this.state.valueColor[i]} onClick={()=>this.handClickList(i)}>
                <First>{item.ctstamp.substr(0,10)}|永顺医师馆|医师：{item.doctorname}|{item.casetype}</First>
                <Second>诊断：{item.ctstamp.substr(0,10)}</Second>
            </ListData>
        )
    });
    console.log(lodeData);
    return (
    <Container>
        <Title>
          <Ele>病例中心>电子病历详情</Ele>
        </Title>
        <CenterArea>
            <ScrollArea height={100}>
                <Row>
                    <Col span={6}>
                        <ListBorder className="listRightLine">
                            {lodeData}
                            <ShowHidden onClick={this.handClickShow.bind(this)}>{data.length == 1? '显示':'隐藏'}刘德华更多病例信息>></ShowHidden>
                        </ListBorder>
                    </Col>
                    <Col span={16} offset={1}>
                        <ElectronicRight data={data} i={i} patientname={patientname} sex={sex} birthday={birthday}  patienttypeDic={patienttypeDic} examDate={examDate} casetype={casetype}/>
                    </Col>
                </Row>
            </ScrollArea>    
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
const CenterArea = styled.div`
    width: 100%;
    height: 900px;
`;
const ListBorder = styled.div`
    width: 100%;
    height: 56rem;
    background-color: rgb(242,242,242);
    overflow-x: hidden;
    overflow-y: scroll;
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
