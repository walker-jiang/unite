import React, { Component } from 'react'; // 引入了React和PropTypes
import './style/homeIndex.less';
import styled from 'styled-components';
import ColItem from '../../component/Form/ColItem';
import { Row, Col, Button, Input, Select, Form, Radio, Tag  } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
// import tagsSty from 'components/antd/style/tags';
import getResource from 'commonFunc/ajaxGetResource';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class HomeIndex extends Component {
  state = {
    visible: false,
    addVisible: false,
    data: [
      { key: '1',1: '1',2: 32 },
      { key: '2',1: '2',2: 42 },
      { key: '3',1: '3',2: 32 },
      { key: '4',1: '4',2: 32 },
      { key: '5',1: '5',2: 32 },
      { key: '6',1: '6',2: 32 }
    ],
    value: 1,
  }

  componentWillMount () {
    let params = {
      url: 'tcmCmdrugsOrg/getCenterHerbalMedicineList',
      server_url: config_InteLigenTreatManagement_url,
      contentType: 'application/x-www-form-urlencoded;charset=utf-8',
      traditional: true, // 可以传递数组参数
      data: {
        orgCode: 10000
      }
    };
    //let that = this;
    function callBack(res){
      console.log('%%%%%',res)
      //   if(res.result){
      //       console.log('成功')
      //       var data = that.state.data;
      //       data.push(res.data[0]);
      //       that.setState({
      //           arr: res.data,
      //           i: 0,
      //           data,
      //       })
      // }else{
      //   // that.setState({data: []});
      // }
    };
    getResource(params, callBack);
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  log(e) {
    console.log(e);
  }
  
  preventDefault(e) {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
  }

  render() {
    
    return (
      <HomeIndexL className='HomeIndex_home'>
        <HomeIndex_div className='HomeIndex_home_div'>
          <HomeIndex_divP>中成药信息匹配</HomeIndex_divP><hr/><hr className='hr1' />
        </HomeIndex_div>
        <CenterContant>
          <Row>
            <Col span={12} className="HomeIndex_centerLine" >
              <HomeIndex_contentLeftDiv>
                <HomeIndex_contentLeft>
                  <HomeIndex_h2FontSize>本院用药目录</HomeIndex_h2FontSize>
                  <Button type="primary" size="large" style={{width:"117px",height:"24px", border: "none",borderRadius:"5px",fontSize: "14px",background:"rgba(102, 204, 0, 1)",color:"#FFFFFF"}} >一键自动匹配</Button>
                  <Button type="primary" size="large" style={{width:"117px",height:"24px", border: "none",borderRadius:"5px",fontSize: "14px",background:"rgba(102, 204, 0, 1)",color:"#FFFFFF",marginLeft: "0.5rem"}} >更新本院药库</Button>
                </HomeIndex_contentLeft>
                <HomeIndex_radioGroup> 
                  <HomeIndex_radioChoose>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio value={1}>全部</Radio>
                      <Radio value={2}>已匹配</Radio>
                      <Radio value={3}>未匹配</Radio>
                    </RadioGroup> 
                  </HomeIndex_radioChoose>
                  <InputWidthDiv>
                  <InputWidth
                    placeholder="在本院用药目录中查找中药"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                  </InputWidthDiv>
                </HomeIndex_radioGroup>
                <HomeIndex_contentImport className="disableScoll" >
                    <Div_p_row>
                      <Div_content>A</Div_content>
                      <Div_contentP>
                        阿魏
                        (已匹配<Tag closable onClose={this.log.bind(this)}>Tag 2</Tag>
                        <Tag closable onClose={this.preventDefault.bind(this)}>Prevent Default</Tag>)
                        {/* (已匹配<SpecTag closable onClose={this.log.bind(this)}>gssa</SpecTag>) */}
                      </Div_contentP>
                      <Div_contentP>艾叶</Div_contentP>
                    </Div_p_row>
                    <Div_p_row>
                      <Div_content>B</Div_content>
                      <Div_contentP>巴豆1</Div_contentP>
                      <Div_contentP>巴豆2</Div_contentP>
                      <Div_contentP>八角茴香</Div_contentP>
                    </Div_p_row>
                    <Div_p_row>
                      <Div_content>C</Div_content>
                      <Div_contentP>苍耳子</Div_contentP>
                      <Div_contentP>苍术</Div_contentP>
                      <Div_contentP>草果</Div_contentP>
                      <Div_contentP>草乌</Div_contentP>
                      <Div_contentP>草豆蔑</Div_contentP>
                    </Div_p_row>
                    <Div_p_row>
                      <Div_content>D</Div_content>
                      <Div_contentP>大腹皮</Div_contentP>
                      <Div_contentP>大黄</Div_contentP>
                      <Div_contentP>大蓟</Div_contentP>
                      <Div_contentP>大莉炭</Div_contentP>
                      <Div_contentP>大青</Div_contentP>
                    </Div_p_row>
                </HomeIndex_contentImport>
              </HomeIndex_contentLeftDiv>  
            </Col>
            <Col span={12}>
              <HomeIndex_contentRightDiv>
                  <HomeIndex_contentRight>
                    <HomeIndex_h2FontSizeRight>系统中药库</HomeIndex_h2FontSizeRight>
                    <Button type="primary" size="large" style={{width:"117px",height:"24px", border: "none",borderRadius:"5px",fontSize: "14px",background:"rgba(102, 204, 0, 1)",color:"#FFFFFF"}} >一键自动匹配</Button>
                    <Button type="primary" size="large" style={{width:"117px",height:"24px", border: "none",borderRadius:"5px",fontSize: "14px",background:"rgba(102, 204, 0, 1)",color:"#FFFFFF",marginLeft: "0.5rem"}} >更新本院药库</Button>
                  </HomeIndex_contentRight>
                  <HomeIndex_radioGroupRight> 
                    <HomeIndex_radioChooseRight>
                      <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>全部</Radio>
                        <Radio value={2}>已匹配</Radio>
                        <Radio value={3}>未匹配</Radio>
                      </RadioGroup> 
                    </HomeIndex_radioChooseRight>  
                    <InputWidthDiv>
                    <InputWidthRight
                      placeholder="在本院用药目录中查找中药"
                      onSearch={value => console.log(value)}
                      enterButton
                    />
                    </InputWidthDiv>
                  </HomeIndex_radioGroupRight>
                  <HomeIndex_contentImportRight className="disableScoll">
                      <Div_p_row>
                        <Div_contentRight>A</Div_contentRight>
                        <Div_contentPRight>
                          阿魏
                          (已匹配<Tag closable onClose={this.log.bind(this)}>Tag 2</Tag>
                          <Tag closable onClose={this.preventDefault.bind(this)}>Prevent Default</Tag>)
                        </Div_contentPRight>
                        <Div_contentPRight>艾叶</Div_contentPRight>
                      </Div_p_row>
                      <Div_p_row>
                        <Div_contentRight>B</Div_contentRight>
                        <Div_contentPRight>巴豆1</Div_contentPRight>
                        <Div_contentPRight>巴豆2</Div_contentPRight>
                        <Div_contentPRight>八角茴香</Div_contentPRight>
                      </Div_p_row>
                      <Div_p_row>
                        <Div_contentRight>C</Div_contentRight>
                        <Div_contentPRight>苍耳子</Div_contentPRight>
                        <Div_contentPRight>苍术</Div_contentPRight>
                        <Div_contentPRight>草果</Div_contentPRight>
                        <Div_contentPRight>草乌</Div_contentPRight>
                        <Div_contentPRight>草豆蔑</Div_contentPRight>
                      </Div_p_row>
                      <Div_p_row>
                        <Div_contentRight>D</Div_contentRight>
                        <Div_contentPRight>大腹皮</Div_contentPRight>
                        <Div_contentPRight>大黄</Div_contentPRight>
                        <Div_contentPRight>大蓟</Div_contentPRight>
                        <Div_contentPRight>大莉炭</Div_contentPRight>
                        <Div_contentPRight>大青</Div_contentPRight>
                      </Div_p_row>
                  </HomeIndex_contentImportRight>
                </HomeIndex_contentRightDiv>  
            </Col>
          </Row>
        </CenterContant>
      </HomeIndexL>
    );
  }
}

// const SpecTag = styled(Tag)`
//   ${tagsSty.yelloGreen}
// `;

const HomeIndexL = styled.div`
  
`;

const HomeIndex_div = styled.div`
  
`;

const HomeIndex_divP = styled.p`
  
`;

const CenterContant = styled.div`
  
`;

const HomeIndex_contentLeftDiv = styled.div`
  margin-left: 1rem;
`;

const HomeIndex_contentLeft = styled.div`

`;

const HomeIndex_radioGroup = styled.div`
  margin-top: 0.5rem;
`;

const HomeIndex_radioChoose = styled.div`
  width: 50%;
  float: left;
`;

const InputWidthDiv = styled.div`
  width: 49%;
  float: left;
  margin-bottom: 1rem;
`;

const InputWidth = styled(Search)`
  
`;

const HomeIndex_contentImport = styled.div`
  border: 1px solid rgba(121, 121, 121, 1);
  overflow-x: hidden;
  overflow-y: visible;
  width: 498px;
  height: 38rem;
  margin-top: 1rem;
`;

const Div_p_row = styled.div`

`;

const Div_content = styled.div`
  width: 100%;
  height: 21px;
  border: 1px solid;
  border: none;
  background-color: #f2f2f2;
`;

const Div_contentP = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #f2f2f2;
  background-color: #ffffff;
`;

const HomeIndex_contentRightDiv = styled.div`
  margin-left: 1rem;
`;

const HomeIndex_contentRight = styled.div`

`;

const HomeIndex_radioGroupRight = styled.div`
  margin-top: 0.5rem;
`;

const HomeIndex_radioChooseRight = styled.div`
  width: 50%;
  float: left;
`;

const InputWidthRight = styled(Search)`
  width: 15rem;
  margin-left: 3.5rem;
`;

const HomeIndex_contentImportRight = styled.div`
  border: 1px solid rgba(121, 121, 121, 1);
  overflow-x: hidden;
  overflow-y: visible;
  width: 498px;
  height: 38rem;
  margin-top: 1rem;
`;

const Div_contentRight = styled.div`
  width: 100%;
  height: 21px;
  border: 1px solid;
  border: none;
  background-color: #f2f2f2;
`;

const Div_contentPRight = styled.div`
  width: 100%;
  height: 30px;
  borderBottom: 1px solid #f2f2f2;
  background-color: #ffffff;
`;

const HomeIndex_h2FontSize = styled.h2`
  font-size: 16px;
  margin-top: 0.5rem;
`;

const HomeIndex_h2FontSizeRight = styled.h2`
  font-size: 16px;
  margin-top: 0.5rem;
`;


const HomeIndexIndex = Form.create()(HomeIndex);
export default HomeIndexIndex;
