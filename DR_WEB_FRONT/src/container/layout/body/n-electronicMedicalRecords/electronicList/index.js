import React, { Component } from 'react';
import { Row, Col } from 'antd';
import $ from 'jquery';
import styled from 'styled-components';
import ScrollArea from 'components/scrollArea';
import ElectronicRight from '../electronicRight';
import 'antd/lib/button/style';
import './index.less';
import bingLi from '../images/bingLi.png'
import printImages from "../images/print.png";
import xian from "../images/xian.png";
import exportFile from "../images/exportFile.png";
import comeBack from "../images/comeBack.png";
import Addtip from '../images/addtip.png';
import getResource from 'commonFunc/ajaxGetResource';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        arr: [],//后台数据
        valueColor: {0: 'selectColor'},
        show: true,
        disable: true,
        i: '',//左侧key
        orgidDic: '',//机构名称
    };
    this.handClickShow = this.handClickShow.bind(this)
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
                data,
            })
      }else{
        // that.setState({data: []});
      }
    };
    getResource(params, callBack);
  }

  //点击控制显示隐藏 ，控制显示list长度
  handClickShow () {
      if(this.state.show){
        this.setState({
            data: this.state.arr,
            show: false
        })
      }else{
        let datas=[]
        datas.push(this.state.data[0])
        this.setState({
            data: datas,
            show: true
        })
      }
      
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

  printClick(){
    // 打印
    // var LODOP=getLodop();
    // LODOP.SET_PRINT_PAGESIZE(2,2100,2970,"A4");
    // LODOP.SET_PRINT_STYLE("FontSize",12);
    // LODOP.SET_PRINT_STYLE("Bold",1);
    // LODOP.ADD_PRINT_HTM(0,0,1000,1900,document.getElementById("testResult").innerHTML);
    // LODOP.PREVIEW();
    //LODOP.PRINT();
    window.print()
  }

  pdfClick(){
    // 导出PDF
    var pdf = new jsPDF('p', 'mm', 'a4');
        var print_content = $('#eleBingLi');
        var filename = '测评结果.pdf';
        $('#eleBingLi').css("background", "#fff")
        pdf.addHTML($('#eleBingLi'), function(){
            pdf.output("save", filename)
        })
  }

  //返回电子病历表格
  onClickBack () {
    let pram = 1;
    this.props.onToggle(pram);
  }

  render() { 
    var { data, valueColor, arr, show, i, orgidDic, disable } = this.state;
    var patientname = this.props.patientname;
    var sex = this.props.sex;
    var birthday = this.props.birthday;
    var patienttypeDic = this.props.patienttypeDic;
    var examDate = this.props.examDate;
    var casetype = this.props.casetype;
    var orgidDic;
    if(data[i] != undefined) {
        orgidDic = data[i].orgidDic;
    }
    // console.log('jhduscdsfsd',arr)
    console.log('data',data)
    let center;
    if(data == [] ||　data == undefined || data == null || data['0'] == undefined ) {
        console.log('null');
        
        center =
            <NullData> 
                <TipImg src={Addtip} />
                <TipTitle>该患者还没有电子病历</TipTitle>
            </NullData>
    } else {
        console.log('notnull');
        
        var lodeData = data.map((item, i)=>{
            return (
                <ListData key={i} className= {this.state.valueColor[i]} onClick={()=>this.handClickList(i)}>
                    <First>{item.ctstamp.substr(0,10)}|{item.orgidDic}|医师：{item.doctorname}|{item.casetype == 1? '初诊':'复诊'}</First>
                    <Second>诊断：{item.buDiagnosisInfo.diagnosisDesc}</Second>
                </ListData>
            )
        });
        center =
        <Row>
            <Col span={7}>
                <ScrollArea height={100}>
                    <ListBorder className="listRightLine">
                        {lodeData}
                        <ShowHidden onClick={this.handClickShow}>{show == true? '显示':'隐藏'}<Patientname>{patientname}</Patientname>更多病例信息>></ShowHidden>
                    </ListBorder>
                </ScrollArea>    
            </Col>
            <Col span={15} offset={1}>
                <ScrollArea height={100}>
                    <ElectronicRight data={data} i={i} patientname={patientname} sex={sex} birthday={birthday}  patienttypeDic={patienttypeDic} examDate={examDate} casetype={casetype} orgidDic={orgidDic} />
                </ScrollArea>
            </Col>
        </Row>
    }
    console.log(lodeData);
    return (
    <Container>
        <Title>
          <Row>
            <Col span={6}>
                <ImgBingLi src={bingLi}/>
                <Ele>
                    <BingCenter>病例中心</BingCenter><BingCenterIcon>></BingCenterIcon><DianXiang>电子病历详情</DianXiang>
                </Ele>
            </Col>
            <Col span={4}>
                <ImgStyle>
                    <ImgOne src={printImages} id="snapshotButton"
                    onClick={this.printClick.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <ImgTwo src={xian}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <ImgThree src={exportFile}
                    onClick={this.pdfClick.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                </ImgStyle>    
            </Col>
            <Col span={2} offset={12}>
                <RuturnBack onClick={this.onClickBack.bind(this)}>
                    <ImageWidth src={comeBack}/>
                    返回
                </RuturnBack>
            </Col>
          </Row>
        </Title>
        <CenterArea id="eleBingLi">
            {center}
        </CenterArea>
      </Container>
    )
  }
}

const ImgBingLi = styled.img`
    width: 2rem;
    position: absolute;
    margin-top: 1rem;
    margin-left: 0.5rem;
`;
const Container = styled.div`
  
`;
const Title = styled.div`
    border: 1px solid;
    border-color: rgba(204, 204, 204, 1);
    background-color: rgb(242, 242, 242);
    width: 100%;
    margin-left: 0.3rem;
    height: 50px;
    position: relative;
    margin-bottom: 0.1rem;
`;
const Ele = styled.span`
    color: rgb(51, 51, 51);
    font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    position: absolute;
    margin-top: 0.5rem;
    margin-left: 3.1rem;
`;
const BingCenter = styled.span`
    color: #0a6ecb;
    font-size: 16px;
    cursor:pointer;
`;
const BingCenterIcon = styled.span`
    margin-left: 13px;
`;
const DianXiang = styled.span`
    margin-left: 13px;
    font-size: 16px;
`;
const ImgStyle = styled.div`
    margin-top: 0.5rem;
`;
const ImgOne = styled.img`
    cursor:pointer;
`;
const ImgTwo = styled.img`
    
`;
const ImgThree = styled.img`
    cursor:pointer;
`;
const ImageWidth = styled.img`
    width: 3rem;
`;
const RuturnBack = styled.div`
    color: #0a6ecb;
    font-size: 15px;
    margin-top: 0.5rem;
    cursor:pointer;
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
    margin-left: 0.1rem;
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
    height: 5rem;
    width: 99%;
    margin-left: 0.3rem;
    border:1px solid #ccc;
    border-top:none;
    border-left:none;
    border-right:none; 
    cursor:pointer;
    color: #0a6ecb;
    background-color: #ffffff;
`;
const First = styled.p`
    
`;
const Second = styled.p`
    
`;
const ShowHidden = styled.div`
    margin-left: 0.3rem;
    margin-top: 15px;
    cursor:pointer;
`;
const TipImg = styled.img`
  width: 109px;
  height: 130px;
  margin-left: 44%;
`;
const TipTitle = styled.div`
  font-size: 16px;
  color: #666666;
  text-align: center;
  line-height: 24px;
`;
const NullData = styled.div`
  width: 100%;
  margin-top: 17rem;
  margin-bottom: 17rem;
`;
/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历父组件
*/
