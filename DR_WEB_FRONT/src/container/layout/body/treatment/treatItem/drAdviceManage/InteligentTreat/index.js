import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, Table, Menu, Dropdown, Icon, Row, Col, Button } from 'antd';
import BasePop from 'components/popout/basePop';
import daibiao from "./daibiao.png";
import './index.less'
import getResource from 'commonFunc/ajaxGetResource';
import buttonSty from 'components/antd/style/button';

const TabPane = Tabs.TabPane;

export default class InteligentTreat extends Component {
  constructor(props) {
    super(props);
    // console.log('1',this.props)
    this.state = {
      dataSource6: [
        {
          key: 1,
          id: 1,
          ill: '感冒/风热感冒',
          prescription: '金银花处方',
          single: '金银花、连翘、薄荷、荆芥、淡豆鼓、牛蒡厂、桔梗、淡竹叶、甘草',
          treatment: 1
        },
        {
          key: 2,
          id: 2,
          ill: '感冒/风热感冒',
          prescription: '银翘散',
          single: '连翘、银花、桔梗、薄荷、竹叶、生甘草、荆芥穗、淡豆豉、牛蒡子',
          treatment: 1
        },
        {
          key: 3,
          id: 3,
          ill: '高血压/原发性高血压',
          prescription: '黄精秘法',
          single: '黄精、夏菇草、益母草、车前草、狶签草',
          treatment: 1
        },
        {
          key: 4,
          id: 4,
          ill: '高血压/原发性高血压',
          prescription: '菊花秘法',
          single: '菊花、白芍、炒黄芩、玄参、怀牛漆、石决明、葛根、龙胆草、草决明、甘草',
          treatment: 0
        },
        {
          key: 5,
          id: 5,
          ill: '高血压/原发性高血压',
          prescription: '天麻秘法',
          single: '天麻、钩藤、木瓜、萆薢、当归、白芍、黄芩、牛膝、僵蚕、松节、威灵仙',
          treatment : 0
        }
      ],
      dataSourceAlert: [
        {
          key: 1,
          ill: '头晕、呕吐',
          project: '龙骨（+）、薄荷（+）'
        },
        {
          key: 2,
          ill: '扁桃体发炎',
          project: '连翘（-）'
        },
        {
          key: 3,
          ill: '头晕、呕吐',
          project: '龙骨（+）、薄荷（+）'
        },
        {
          key: 4,
          ill: '扁桃体发炎',
          project: '连翘（-）'
        },
        {
          key: 5,
          ill: '头晕、呕吐',
          project: '龙骨（+）、薄荷（+）'
        }
      ],
      dataSource: [],//中草药表格
      diagnosename: '',//诊断
      buOrderDtlList: [],//点击添加弹框列表
      proprietaryChineseMedicine: [],
      appropriateTechnologies: [],
      visiblePop: false,  // 控制弹框显示隐藏
      statusValue: 1,
      addDeleteData: [],
      dataSourceChineseMedicine: [],//中成药表格
      chineseMedicineAdd: [],//中成药的“添加”
      type: '',//医嘱类型 1：中草药 2：中成药 3：适宜技术
      dataSourceAppropriateTechnologies: [],//适宜技术表格
      appropriateTechnologiesAdd: [],//适宜技术的“添加”
      cmTatalRecords: 0, // 中草药分页总条数
      cpmTatalRecords: 0, // 中成药分页总条数
      stTatalRecords: 0, // 适宜技术分页总条数
      currentPageOne: 1, // 中草药当前页
      currentPageTwo: 1, // 中成药当前页
      currentPageThree: 1, // 适宜技术当前页
      selectedRowKeys: [], // 已选中行的数据
      selectedRows: [], // 中草药已选中行的数据
      selectedRowsCpm: [], // 中草药已选中行的数据
    };
    this.private = {
      pageSize: 10,
      current: 1,
    };
  }

  getStatusValue(statusValue){
    this.setState({
      statusValue: statusValue
    });
  };

  // 序号
  setOrderNo (value, record, index) {
    return <span>{index+1}</span>
  }

  // 序号
  setOrderNo1 (value, record, index) {
    return <span>{index+1}</span>
  }

  // 序号
  setOrderNo2 (value, record, index) {
    return <span>{index+1}</span>
  }

  // 临症加减
  cellStatus (value, record, index) {
    if (record.priors == 1) {
      return <span>是</span>
    } else {
      return <span>否</span>
    }
  }

  // 弹框显示
  handlePopOpen (nextPageOne = 1,nextPageTwo = 1,nextPageThree = 1) {
    console.log('handlePopOpen')
    console.log('bu',window.bu)
    var date=new Date;
    var year=date.getFullYear(); 
    let sex = window.sex;
    let patientsYear = window.birthday.substring(0,4);
    let age = year - patientsYear;
    console.log('age',age)
    let bu = JSON.stringify(window.bu);
    let params = {
      type: 'GET',
      async : true,
      url: 'TCMAE/api/Imtreatprelist/GetImtreatList',
      server_url: config_InteLigenTreat_url,
      contentType: '',
      data: {
        bu: bu,
        age: age,
        sex: sex,
        cmdrugPage: nextPageOne,
        cpmPage: nextPageTwo,
        stPage: nextPageThree,
        pageSize: 8
      }
    };
    let that = this;
    function success(res){
      if(res.data){
        let dataSource = res.data.clist.dataList.map((item, index)=>{
          item.key = index; // 加唯一key值
          return item
        });
        let dataSourceChineseMedicine = res.data.plist.dataList.map((item, index)=>{
          item.key = index; // 加唯一key值
          return item
        });
        let dataSourceAppropriateTechnologies = res.data.slist.dataList.map((item, index)=>{
          item.key = index; // 加唯一key值
          return item
        });
        let cmTatalRecords = res.data.clist.total;
        let cpmTatalRecords = res.data.plist.total;
        let stTatalRecords = res.data.slist.total;
        let currentPageOne = nextPageOne;
        let currentPageTwo = nextPageTwo;
        let currentPageThree = nextPageThree;
        that.setState({dataSource, dataSourceChineseMedicine, dataSourceAppropriateTechnologies, cmTatalRecords, cpmTatalRecords, stTatalRecords, currentPageOne, currentPageTwo, currentPageThree});
      }else{
        that.setState({dataSource: [], cmTatalRecords: 0, cpmTatalRecords: 0, stTatalRecords: 0});
      }
    };

    function error(res){
        console.log('中草药获取失败');
    };
    getResource(params, success, error);
    this.setState({
      visiblePop: true
    });
  };


  

  // 弹框关闭
  handlePopClose () {
    this.setState({
      visiblePop: false,
      statusValue: 1
     });
  };

  //中草药合并
  handleMergeClick () {
    var bu = JSON.stringify(window.bu);
    var imtreatprelist = JSON.stringify(this.state.selectedRows);
    var type = 1;
    let params = {
      type: 'GET',
      async : true,
      url: 'TCMAE/merge/Imtreatprelist',
      server_url: config_InteLigenTreat_url,
      contentType: '',
      data: {
        bu: bu,
        imtreatprelist: imtreatprelist
      }
    };
    let that = this;
    function success(res){
      console.log('合并',res)
      that.setState({
        buOrderDtlList: res.data.baHerbalMedicines ,//添加列表
      }, function(){
        console.log('buOrderDtlListbuOrderDtlList',this.state.buOrderDtlList)
        var buOrderDtlList = this.state.buOrderDtlList;
        this.handlePopClose();
        this.props.loadClick(buOrderDtlList,type);
      })
    };

    function error(res){
        console.log('合并失败');
    };
    getResource(params, success, error);
  }

  //中成药合并
  handleMergeClickCpm () {
    var bu = JSON.stringify(window.bu);
    console.log('bu',bu);
    var type = 2;
    var imtreatprelist = JSON.stringify(this.state.selectedRowsCpm);
    let params = {
      type: 'GET',
      async : true,
      url: 'TCMAE/merge/ImtreatprelistCpm',
      server_url: config_InteLigenTreat_url,
      contentType: '',
      data: {
        bu: bu,
        imtreatprelist: imtreatprelist
      }
    };
    let that = this;
    function success(res){
      that.setState({
        buOrderDtlList: res.data.baHerbalMedicines ,//添加列表
      }, function(){
        console.log('buOrderDtlListbuOrderDtlList',this.state.buOrderDtlList)
        var buOrderDtlList = this.state.buOrderDtlList;
        this.handlePopClose();
        this.props.loadClick(buOrderDtlList,type);
      })
    };

    function error(res){
        console.log('合并失败');
    };
    getResource(params, success, error);
  }

  // 查看医嘱
  handleSureClick () {
    this.handlePopClose ();
    this.props.reloadList();
  }

//操作-添加
operationCell(value, record, index) {
  //console.log('caozuo',value,record,index)
  let priors = record.priors;
  let preName = record.preName;
  let drugName = record.drugName;
  //console.log('priors',record.priors)
  let dataSourceAlert = this.state.dataSourceAlert;
  const menu = (
    <div style={styles.AlertTableWrap}>
      <div className="gutter-example">
        <Row gutter={16}>
          <Col className="gutter-row" span={1}>
            <div className="gutter-box"><img className="jiantou" src={daibiao}/></div>
          </Col>
          <Col className="gutter-row" span={5}>
            <div className="gutter-box">{preName}</div>
          </Col>
          <Col className="gutter-row" span={15}>
            <div className="gutter-box">{drugName}</div>
          </Col>
          <Col className="gutter-row" span={3}>
            <div className="gutter-box"><Button onClick={() => { this.handleAddDropdown(value, index, record) }}  style={styles.operationCellAlert}>+添加</Button></div>
          </Col>
        </Row>
      </div>
      <Table style={styles.tableWrap}
      dataSource={this.state.addDeleteData}
      onHeaderRow={(column) => { this.onHeaderRow() }}
    >
        <Table.Column key='severity' title="病情" dataIndex="severity" align='center' />
        <Table.Column key='drugNamesList' title="临症加减项目" dataIndex="drugNamesList" align='center'/>
        <Table.Column title="操作" render={this.operationCellAlert.bind(this)} align='center'/>
      </Table>
  </div>
  );
  if (priors == 1) {
    return (
      <Dropdown onClick={() => { this.onClickDropdown(value, index, record) }} className="dropDown" overlay={menu} trigger={['click']}>
        <Button style={styles.operationCell}>+添加</Button>
      </Dropdown>
    )
  } else {
    return (
      <div key={index}>
        <Button onClick={() => { this.handleAdd(value, index, record) }} style={styles.operationCell}>+添加</Button>
      </div>
    )
  }
}

//添加-根据"是"临症加减跳转不同页面
onClickDropdown(value, record, index) {
  window.index = index;
  var ilId = index.itId;
  console.log('IlIdshi',index.itId)
  let params = {
    type: 'GET',
    async : true,
    url: 'TCMAE/api/Impluslist/GetImpluslist',
    server_url: config_InteLigenTreat_url,
    contentType: '',
    data: {
      IlId: ilId
    }
  };
  let that = this;
  function success(res){
    console.log('临症加减',res)
    let addDeleteData = res.data.map((item, index)=>{
      item.key = index; // 加唯一key值
      return item
    });
    that.setState({addDeleteData});
  };

  function error(res){
      console.log('临症加减获取失败');
  };
  getResource(params, success, error);
}

//添加-根据"否"临症加减跳转不同页面
handleAdd(value, record, index) {
  window.index = index;
  var bu = JSON.stringify(window.bu);
  var IlId = index.ilId;
  var type = index.type;
  var imtreatprelist = JSON.stringify(window.index);
  console.log('window.index###',window.index)
  let params = {
    type: 'GET',
    async : true,
    url: 'TCMAE/api/scheme/getcmdrugs',
    server_url: config_InteLigenTreat_url,
    contentType: '',
    data: {
      bu: bu,
      IlId: IlId,
      imtreatprelist: imtreatprelist
    }
  };
  let that = this;
  function success(res){
    console.log('添加成功',res)
    that.setState({
      buOrderDtlList: res.data.baHerbalMedicines ,//添加列表
    }, function(){
      console.log('buOrderDtlListbuOrderDtlList',this.state.buOrderDtlList)
      var buOrderDtlList = this.state.buOrderDtlList;
      this.handlePopClose();
      this.props.loadClick(buOrderDtlList,type);
    })
  };

  function error(res){
      console.log('添加失败');
  };
  getResource(params, success, error);
}

//下拉框数据临症加减“是”的添加操作
operationCellAlert(value, index, record) {
  return (
    <div key={index}>
      <Button style={styles.operationCellAlert} onClick={() => { this.handleAddDropdown(value, record, index) }}>+添加</Button>
    </div>
  )
}

handleAddDropdown(value, record, index){
  var bu = JSON.stringify(window.bu);
  var IlId = index.ilId;
  var type = index.type;
  var imtreatprelist = JSON.stringify(window.index);
  console.log('value',index)
  let params = {
    type: 'GET',
    async : true,
    url: 'TCMAE/api/scheme/getcmdrugs',
    server_url: config_InteLigenTreat_url,
    contentType: '',
    data: {
      bu: bu,
      IlId: IlId,
      imtreatprelist: imtreatprelist
    }
  };
  let that = this;
  function success(res){
    console.log('添加成功',res)
    that.setState({
      buOrderDtlList: res.data.baHerbalMedicines ,//添加列表
    }, function(){
      console.log('buOrderDtlListbuOrderDtlList',this.state.buOrderDtlList)
      var buOrderDtlList = this.state.buOrderDtlList;
      this.handlePopClose();
      this.props.loadClick(buOrderDtlList,type);
    })
  };

  function error(res){
      console.log('添加失败');
  };
  getResource(params, success, error);
}

// 操作
operationCellSecond(value, record, index) {
  return (
    <div key={index}>
      <i style={styles.operationCellSecond} onClick={() => { this.handleAdd(value, record, index) }}>修改</i> &nbsp;| &nbsp;
      <i style={styles.operationCellSecond} onClick={() => { this.onDelete(value, record, index) }}>删除</i>
    </div>
  )
}

//中成药-操作
operationCellChineseMedicine(value, record, index){
  return (
    <div key={index}>
      <Button onClick={() => { this.handleAddChineseMedicine(value, index, record) }} style={styles.operationCell}>+添加</Button>
    </div>
  )
}

//中成药-操作-添加
handleAddChineseMedicine(value, index, record) {
  console.log('liebiao',record)
  this.setState({
    chineseMedicineAdd: record
  }, function(){
    var bu = JSON.stringify(window.bu);
    var imtreatprelist = JSON.stringify(this.state.chineseMedicineAdd);
    var type = record.type;
    let params = {
      type: 'GET',
      async : true,
      url: 'TCMAE/api/scheme/getCpm',
      server_url: config_InteLigenTreat_url,
      contentType: '',
      data: {
        bu: bu,
        imtreatprelist: imtreatprelist
      }
    };
    let that = this;
    function success(res){
      console.log('添加成功',res)
      that.setState({
        buOrderDtlList: res.data.baMedicines ,//添加列表
      }, function(){
        var buOrderDtlList = this.state.buOrderDtlList;
        this.handlePopClose();
        this.props.loadClick(buOrderDtlList,type);
      })
    };

    function error(res){
        console.log('添加失败');
    };
    getResource(params, success, error);
  })

}

//适宜技术-操作
operationCellAppropriateTechnologies(value, index, record){
  return (
    <div key={index}>
      <Button onClick={() => { this.handleAddAppropriateTechnologies(value, index, record) }} style={styles.operationCell}>+添加</Button>
    </div>
  )
}

handleAddAppropriateTechnologies(value, index, record){
  this.setState({
    appropriateTechnologiesAdd: index
  }, function(){
    var bu = JSON.stringify(window.bu);
    var imtreatprelist = JSON.stringify(this.state.appropriateTechnologiesAdd);
    var type = index.type;
    let params = {
      type: 'GET',
      async : true,
      url: 'TCMAE/api/scheme/getSt',
      server_url: config_InteLigenTreat_url,
      contentType: '',
      data: {
        bu: bu,
        imtreatprelist: imtreatprelist
      }
    };
    //let that = this;
    function success(res){
      console.log('添加成功',res)
      // that.setState({
      //   buOrderDtlList: res.data.medicines ,//添加列表
      // }, function(){
      //   console.log('buOrderDtlListbuOrderDtlList',this.state.buOrderDtlList)
      //   var buOrderDtlList = this.state.buOrderDtlList;
      //   this.handlePopClose();
      //   this.props.loadClick(buOrderDtlList,type);
      // })
    };

    function error(res){
        console.log('添加失败');
    };
    getResource(params, success, error);
  })
}

onHeaderRow(column, index) {

}

callback(key) {
  //console.log(key);
}

eachday(value, record, index) {
  console.log('value, record, index',value, record, index)
}

  render() {
    let { visiblePop,selectedRowKeys, selectedRows, selectedRowsCpm, dataSource, dataSourceChineseMedicine, dataSourceAppropriateTechnologies, cmTatalRecords, cpmTatalRecords, stTatalRecords, currentPageOne, currentPageTwo, currentPageThree } = this.state;
    var cName = "中草药"+cmTatalRecords;
    var pName = "中成药"+cpmTatalRecords;
    var sName = "适宜技术"+stTatalRecords;
    let rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys',selectedRowKeys)
        console.log('selectedRows',selectedRows)
        this.setState({
          selectedRows
        });
      }
    };
    let rowSelectionCpm = {
      onChange: (selectedRowKeys, selectedRowsCpm) => {
        console.log('selectedRowKeys',selectedRowKeys)
        console.log('selectedRowsCpm',selectedRowsCpm)
        this.setState({
          selectedRowsCpm
        });
      }
    };
    let paginationOne = {
      total: cmTatalRecords, // 总的记录数
      defaultCurrent: currentPageOne, // 当前页
      current: currentPageOne, // 当前页
      pageSize: 8, // 每页记录数
      onChange:(nextPageOne, pageSize) => {
        this.handlePopOpen(nextPageOne);
      },
    };
    let paginationTwo = {
      total: cpmTatalRecords, // 总的记录数
      defaultCurrent: currentPageTwo, // 当前页
      current: currentPageTwo, // 当前页
      pageSize: 8, // 每页记录数
      onChange:(nextPageTwo, pageSize) => {
        this.handlePopOpen(nextPageTwo);
      },
    };
    let paginationThree = {
      total: stTatalRecords, // 总的记录数
      defaultCurrent: currentPageThree, // 当前页
      current: currentPageThree, // 当前页
      pageSize: 8, // 每页记录数
      onChange:(nextPageThree, pageSize) => {
        this.handlePopOpen(nextPageThree);
      },
    };
    return (
      <div>
        <BasePop visible={visiblePop} title="智能诊疗" onClose={() => this.handlePopClose()}>
          <div style={styles.wrap}>
            <div>
              <div style={styles.regulars}>
              <p style={styles.pFont}>患者姓名：<span style={styles.spanFont}>刘德华</span>&nbsp;&nbsp;&nbsp;&nbsp; 性别：<span style={styles.spanFont}>男</span>&nbsp;&nbsp;&nbsp;&nbsp; 年龄：38&nbsp;&nbsp;&nbsp;&nbsp; 移动电话：<span style={styles.spanFont}>1396959789</span>
              </p>
              </div>
              <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} style={styles.tabStyle}>
                <TabPane tab={cName} key="1">
                  <div style={styles.tabLine}></div>
                  <Table style={styles.tableWrap}
                    pagination={paginationOne}
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                    onHeaderRow={(column) => { this.onHeaderRow() }}
                  >
                    <Table.Column key="ill" title="序号" dataIndex="ill" render={this.setOrderNo.bind(this)} />
                    <Table.Column key="treatname" title="疾病/病候" dataIndex="treatname" />
                    <Table.Column key="preName" title="代表处方" dataIndex="preName" />
                    <Table.Column key="drugName" title="药单" dataIndex="drugName" />
                    <Table.Column key="priors" title="临症加减" dataIndex="priors" render={this.cellStatus.bind(this)} />
                    <Table.Column title="操作" render={this.operationCell.bind(this)} />
                  </Table>
                  <Button type="primary" style={styles.btm} className='merge' onClick={this.handleMergeClick.bind(this)} >合并</Button>
                </TabPane>
                <TabPane tab={pName} key="2">
                  <Table style={styles.tableWrap}
                      pagination={paginationTwo}
                      dataSource={dataSourceChineseMedicine}
                      rowSelection={rowSelectionCpm}
                      onHeaderRow={(column) => { this.onHeaderRow() }}
                    >
                    <Table.Column key="ill" title="序号" render={this.setOrderNo1.bind(this)} />
                    <Table.Column key="treatname" title="疾病/病候" dataIndex="treatname" />
                    <Table.Column key="cpmName" title="代表处方" dataIndex="cpmName" />
                    <Table.Column key="freqname" title="药单/治疗方法" dataIndex="freqname" />
                    <Table.Column title="操作" render={this.operationCellChineseMedicine.bind(this)} />
                  </Table>
                  <Button type="primary" style={styles.btm} className='merge' onClick={this.handleMergeClickCpm.bind(this)} >合并</Button>
                </TabPane>
                <TabPane tab={sName} key="3">
                  <Table style={styles.tableWrap}
                      pagination={paginationThree}
                      dataSource={dataSourceAppropriateTechnologies}
                      onHeaderRow={(column) => { this.onHeaderRow() }}
                    >
                    <Table.Column title="序号" render={this.setOrderNo1.bind(this)} />
                    <Table.Column key="treatname" title="疾病/病候" dataIndex="treatname" />
                    <Table.Column key="stName" title="特色治疗项目" dataIndex="stName" />
                    <Table.Column key="freqname" title="治疗方法" dataIndex="freqname" />
                    <Table.Column title="操作" render={this.operationCellAppropriateTechnologies.bind(this)} />
                  </Table>
                </TabPane>
              </Tabs>
            </div>
            {/* <div>
              <p style={styles.zhenliaofangan}><span>🔘</span>我的诊疗方案</p>
              <div style={styles.wodezhenliao}></div>
              <Table style={styles.tableWrap}
                      dataSource={dataSourceTable}
                      onHeaderRow={(column) => { this.onHeaderRow() }}
                    >
                    <Table.Column title="序号" dataIndex="id" />
                    <Table.Column title="诊疗方案类型" dataIndex="treatmentType" />
                    <Table.Column title="诊疗方案名称" dataIndex="treatmentName" />
                    <Table.Column title="药单/治疗方法" dataIndex="single" />
                    <Table.Column title="医生" dataIndex="doctor" />
                    <Table.Column title="开立日期" dataIndex="startTime" />
                    <Table.Column title="操作" render={this.operationCellSecond.bind(this)} />
                  </Table>
            </div> */}
          </div>
          <div style={styles.footer}>
            <SureButton type="primary" style={styles.btSure} onClick={this.handleSureClick.bind(this)} >查看医嘱</SureButton>
            <CancelButton type="primary" style={styles.btCancel} onClick={this.handlePopClose.bind(this)} >取消</CancelButton>
          </div>
        </BasePop>
      </div>
    )
  }
}
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.white}
`;
const styles = {
  wrap: {
    width: '857px',
    height: '548px',
    overflow: 'hidden',
    padding: '10px'
  },
  operationCell: {
    color: '#0a6ecb',
    cursor: 'pointer',
  },
  status1: {
    color: '#009900'
  },
  status0: {
    color: '#0A6ECB'
  },
  addQuickly: {
    float: 'left',
    fontSize: '12px',
    color: '#333333',
    width: '80px',
    height: '30px',
    lineHeight: '42px'
  },
  line: {
    float: 'left',
    width: '1px',
    height: '20px',
    background: '#999999',
    marginTop: '14px '
  },
  tableWrap: {
    marginTop: '20px',
  },
  footer: {
    width: '50%',
    position: 'absolute',
    marginLeft: '19rem',
    height: '56px',
    bottom: '0',
    // borderTop: '1px solid #E6E6E6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btm: {
    borderRadius: '31px',
    top: '-1px',
    width: '8rem',
    marginLeft: '20rem',
    zIndex: '2'
  },
  btSure: {
    margin: '6.5rem'
  },
  btCancel: {
    margin: '-4rem'
  },
  wrap: {
    width: '870px',
    overflow: 'hidden',
    padding: '10px'
  },
  tabStyle: {
    //backgroundColor:'#d7d7d7'
  },
  operationCell: {
    backgroundColor: '#0a6ecb',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '16px'
  },
  operationCellSecond: {
    color: '#0a6ecb',
    cursor: 'pointer',
  },
  operationCellAlert: {
    backgroundColor: '#66cc00',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '16px'
  },
  status1: {
    color: '#009900'
  },
  status0: {
    color: '#0A6ECB'
  },
  addQuickly: {
    float: 'left',
    fontSize: '12px',
    color: '#333333',
    width: '80px',
    height: '30px',
    lineHeight: '42px'
  },
  line: {
    float: 'left',
    width: '1px',
    height: '20px',
    background: '#999999',
    marginTop: '14px '
  },
  tabLine:{
    backgroundColor: '#d7d7d7',
    border: '1px inset'
  },
  // zhenliaofangan: {
  //   color: 'black'
  // },
  // wodezhenliao: {
  //   border:'1px solid',
  //   width:'10em',
  //   color:'#0A6ECB'
  // },
  regulars: {
    width: '432px',
    height: '38px',
    backgroundColor:'rgb(249, 249, 249)',
    border: '1px solid rgba(228, 228, 228, 1)',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    zIndex: '1',
    zIndex: '1',
    marginBottom: '-4%',
    marginLeft: '51%',
    display: 'flex'
  },
  pFont: {
    fontSize: '12px',
    color: '#666666',
    alignSelf: 'center',
    marginLeft: '7%'
  },
  spanFont: {
    color: '#0A6ECB'
  },
  AlertTableWrap: {
    backgroundColor: '#f2f2f2'
  }
}


/*
@作者：王崇琨
@日期：2018-07-22
@描述：辨证论治父容器
*/
