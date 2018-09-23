import React, { Component } from 'react';
import { List, Button, Skeleton, Row, Col } from 'antd';
import styled from 'styled-components';
import ScrollArea from 'components/scrollArea';
import ElectronicRight from '../electronicRight';
import 'antd/lib/button/style';
import './index.less';
import getResource from 'commonFunc/ajaxGetResource';
import { color } from 'echarts/lib/export';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        arr: [1,2,3],
        valueColor: {0: 'selectColor'},
    };
    // this.handClickList = this.handClickList.bind(this);
  }
  
  componentWillMount () {
    var data = this.state.data;
    var arr = this. state.arr;  
    var first = data.push(arr[0]);

  }

  handClickShow () {
      this.setState({
          data: this.state.arr
      })
  }

  handClickList (i) {
    //   let that=this
      let obj={};
      obj[i]='selectColor';
      this.setState({
        valueColor: obj,
      })
  }

  render() { 
    var { data, valueColor } = this.state;
    var lodeData = data.map((item, i)=>{
        return <ListData key={i} className= {this.state.valueColor[i]} onClick={()=>this.handClickList(i)}>{item}</ListData>
    });
    return (
    <Container>
        <Title>
          <Ele>病例中心>电子病历详情</Ele>
        </Title>
        <CenterArea>
            <ScrollArea height={200}>
                <Row>
                    <Col span={6}>
                        <ListBorder className="listRightLine">
                            {lodeData}
                            <ShowHidden onClick={this.handClickShow.bind(this)}>显示刘德华更多病例信息>></ShowHidden>
                        </ListBorder>
                    </Col>
                    <Col span={17} offset={1}>
                        <ElectronicRight/>
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
    height: 4rem;
    border:1px solid #ccc;
    border-top:none;
    border-left:none;
    border-right:none; 
`;
const ShowHidden = styled.div`
    
`;
/*
@作者：王崇琨
@日期：2018-09-12
@描述：电子病历父组件
*/
