import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, Radio, Select, DatePicker, Table, Spin, Input } from 'antd';
import PopModal from '../pubilcModule/basePop.js';
import ajaxGetResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';
import tableSty from 'components/antd/style/table';
const Search = Input.Search;

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.visible,
      tableSource: [], // 检验项目数据数组''
      isQuery:true,
    };
  };
  componentWillReceiveProps(nextProps){
    this.setState({ visible:nextProps.visible })
  }
  introduce = (record) => {
    this.props.closeModal();
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
            if(res.result){
              console.log("获取中医列表==================",res.data);
              self.setState({ tableSource:res.data });
            }else{
              console.log('异常响应信息', res);
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
      key: 'discode',
      //render: (text, record) => record.medicalname ? record.medicalname : record.orderSuitname
    },  {
      title: '名称',
      dataIndex: 'disname',
      key: 'disname',
    },  {
      title: '操作',
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
  render() {
    let { visible, tableSource, isQuery, dataSource } = this.state;
    console.log("visible===",visible);
    let columns = this.getColumns();
    return (
      <Container>
        <PopModal visible={visible} title='选择西医疾病' onClose={this.props.closeModal}>
        <div className="ADModal">
          <div className="tab">
            <Row>
              <Col span={23} offset={1}>
                <Search
                  placeholder={"请输入西医疾病"}
                  onSearch={value => {this.queryTable(value)}}
                />
              </Col>
            </Row>
          </div>
        </div>
          {
            isQuery
            ?
            <Table
              style={{margin:5}}
              rowClassName={(record, index)=>{
                return record.status ? (record.status == 1 ? 'Selected' : 'checked') : 'unSelected';
              }}
              locale={{emptyText: '暂无项目数据' }}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            >
            </Table>
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
export default Index;
