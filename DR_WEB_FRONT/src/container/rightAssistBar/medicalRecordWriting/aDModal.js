import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select, DatePicker, Table, Spin } from 'antd';
import PopModal from '../pubilcModule/basePop.js';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import tableSty from 'components/antd/style/table';
// const Search = Input.Search;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.visible,
      count:0,//表格行数
      isSelect:false,//table是否被选中
      tableSource: [], // 检验项目数据数组''
      isQuery:true,
    };
  };
  componentWillReceiveProps(nextProps){
    this.setState({ visible:nextProps.visible })
  }
  introduce = (record) => {
    this.props.changeDate(record);
  }
  queryTable = (keyword) => {
    let self = this;
    self.setState({ isQuery:false },()=>{
      setTimeout(()=>{
          let params = {
            url: 'BaDiseaseController/getList',
            data: {
              keyword: keyword,
            },
          };
          function callBack(res){
            if(res.result && res.data){
              console.log("获取中医列表==================",res.data);
              if(res.data.length != 0){
                res.data.forEach((item,index)=>{
                  res.data[index]['status'] = false;
                })
              }
              self.setState({ tableSource:res.data,isQuery:true });
            }else{
              console.log('异常响应信息', res);
              self.setState({ isQuery:true });
            }
          };
          function callBackError(res){
            self.setState({ isQuery:true });
          }
          ajaxGetResource(params, callBack, callBackError);
      },100);
    });
  }
  /** [getColumns 获取表格数据 ] */
  getColumns = () => {
    const columns = [{
      title: '诊断码',
      dataIndex: 'discode',
      width:'40%',
      key: 'discode',
      //render: (text, record) => record.medicalname ? record.medicalname : record.orderSuitname
    },  {
      title: '名称',
      dataIndex: 'disname',
      width:'40%',
      key: 'disname',
    },  {
      title: '操作',
      width:'20%',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            style={{background:'#0A6ECB',borderRadius:50,height:23,margin:2}}
            type="primary"
            onClick={()=>{ this.introduce(record) }}
          >
            引入
          </Button>
        </span>
      ),
    }];
    return columns;
  };
  // handleKeyDown = (e) => {
  //   if(e.keyCode == 40){ //向下
  //     var count = this.state.count;
  //     count++;
  //     var tableSource = this.state.tableSource;
  //     console.log("跳转到table",tableSource);
  //     tableSource.forEach((item,index)=>{
  //       tableSource[index].status = false;
  //     })
  //     tableSource[count].status = true;
  //     this.setState({ isSelect:true, tableSource:tableSource,count:count });
  //   }else{
  //     console.log("无效按键");
  //   }
  // }
  render() {
    let { visible, tableSource, isQuery, isSelect, count } = this.state;
    console.log("visible===",visible);
    let columns = this.getColumns();
    return (
      <Container>
        <PopModal visible={visible} title='选择疾病' onClose={this.props.closeModal}>
        <div className="ADModal">
          <div className="tab">
            <Row>
              <Col span={24}>
                <Input
                  type='text'
                  //onKeyDown={this.handleKeyDown}
                  autoFocus={true}
                  placeholder="请输入疾病关键字或者疾病编码"
                  onClick={this.stopBubling}
                  onChange={e => {console.log("value======",e);this.queryTable(e.target.value)}}
                />
              </Col>
            </Row>
          </div>
        </div>
          {
            isQuery
            ?
            <SpecTable
              style={{margin:10}}
              rowClassName={(record, index)=>{
                return record.status ? 'checked' : 'unSelected';
              }}
              locale={{emptyText: '暂无项目数据' }}
              columns={columns}
              dataSource={tableSource}
              pagination={false}
            >
            </SpecTable>
            :
            <center style={{marginTop:50}}>
              <div className="example"><Spin/>&nbsp;&nbsp;&nbsp;正在加载中,请稍后...</div>
            </center>
          }

          <Footer>
            {/*<SureButton type="primary" onClick={this.closeModal}>引入</SureButton>*/}
            <CancelButton type="primary" onClick={this.props.closeModal}>取消</CancelButton>
          </Footer>
        </PopModal>
      </Container>
    );
  }
}
const Container = styled.div`
  height: 100%;
`;
const Input = styled.input`
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  height:32px;
  border-top: none;
  border-radius: 50px;
  border-left: none;
  line-height: 30px;
  color: black;
  border-right: none;
  font-size: 12px;
  width: 90%;
  margin-left:5%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left:15px;
  &:focus {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    outline: none
  }
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.gray}
`;
const Footer = styled.div`
  width: 600px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center
`;
const SpecTable = styled(Table)`
  ${tableSty.selectedTableTwo}
`;
export default Index;
