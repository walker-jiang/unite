import React, { Component } from 'react'; // 引入了React和PropTypes
import lodash from 'lodash';
import './style/homeIndex.less';
import { Row, Col, Button, Tag, Icon, Modal, Table, Divider, message } from 'antd';
import {
  autoMatchMedicine, getOrgMedicineList, getCenterMedicineList,
  matchMedicine, deleteMatchMedicine, updateMedicineOrg
} from 'roots/layout/body/n-syndromeManage/services/proprietaryChineseMedicineService';
import YKItems from 'components/BZLZM/YKItems';
import hTag from 'components/BZLZM/hTag';

const WrappedHTag = hTag(Tag);
const SESSION_ORGId = sessionStorage.getItem('orgid');
const DEFAULT_PARAM = { type: 0, orgCode: SESSION_ORGId, keyword: "" };

class HomeIndexIndex extends Component {
  constructor(props) {
    super(props);
    this.orgColumns = [{
      title: '机构名称', dataIndex: 'medicinename',
      render: (text, record) => {
        const otherName = record['otherName'] ? "(" + record['otherName'] + ")" : "";
        const _buCmdrugsOrgEntities = record['buCPatentmedicineOrgs'] ? record['buCPatentmedicineOrgs'] : [];
        const len = _buCmdrugsOrgEntities.length;
        const tags = _buCmdrugsOrgEntities.map((item) => {
          return <WrappedHTag key={item['fieldid']} closable onClose={this.onHandleOnClose} data={item}>{item['cpmNameCenter']}</WrappedHTag>
        })
        if (len == 0) {
          return (<div>{text}{otherName}</div>)
        }
        return (<div>{text}{otherName}{"(已匹配:"}{tags}{")"}</div>)
      }
    },
    { title: '规格', dataIndex: 'specification' },
    { title: '厂商', dataIndex: 'manufacturer' }
    ];

    this.centerColumns = [
      {
        title: '中心名称', dataIndex: 'medicinename',
        render: (text, record) => {
          const otherName = record['otherName'] ? "(" + record['otherName'] + ")" : "";
          const _buCmdrugsOrgEntities = record['buCPatentmedicineOrgs']?record['buCPatentmedicineOrgs']:[];
          const len = _buCmdrugsOrgEntities.length;
          const tags = _buCmdrugsOrgEntities.map((item) => {
            return <WrappedHTag key={item['fieldid']} closable onClose={this.onHandleOnClose} data={item}>{item['orgCpmName']}</WrappedHTag>
          })
          if (len == 0) {
            return (<div>{text}{otherName}</div>)
          }
          return (<div>{text}{otherName}{"(已匹配:"}{tags}{")"}</div>)
        }
      },
      { title: '规格', dataIndex: 'specification' },
      { title: '设置权重', dataIndex: '', render: (text, record) => <a onClick={() => this.handleWeighthowModal(text, record)}>设置权重</a> },
      {
        title: '匹配', dataIndex: '', width: 100,
        render: (text, record) => <a><Icon type="swap" theme="outlined" onClick={() => this.onCheckCenterItem(text, record)} /></a>
      }
    ];

    this.weightColums = [
      { title: '使用顺序', dataIndex: 'weight', render: (text, record, index) => index+1 },
      { title: '药品名称', dataIndex: 'orgCpmName' },
      {
        title: '操作', dataIndex: '', render: (text, record) => {
          return (
            <span>
              <a href="javascript:;" onClick={() => this.handleUp(record)}>上移</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => this.handleDown(record)}>下移</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => this.handleTop(record)}>置顶</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => this.handleBottom(record)}>置底</a>
            </span>
          )
        }
      }
    ]

    this.state = {
      visible: false,
      addVisible: false,
      value: 1,
      checkedOrgItem: {},
      orgData: [],
      centerData: [],
      weightModalVisiable: false, //设置权重是否显示
      weightModalData: [], //设置权重时需要的数据 数组 这个数组中的数据不会变 但是数组中数据的顺序会变
    }
  }

  componentDidMount = () => {
    this.onOrgFreshList(DEFAULT_PARAM);
    this.onCenterFreshList(DEFAULT_PARAM);
  }

  /**
   * data 需要特殊格式{type: 0(1, 2), keyword: ""}
   * type: 
   */
  onOrgFreshList = (data) => {
    getOrgMedicineList({ type: data['type'], orgCode: SESSION_ORGId, keyword: data['keyword'] }).then((data) => {
      this.setState({ orgData: data['success'] ? data.data.result : this.state.orgData })
    }).catch();
  }

  onCenterFreshList = (data) => {
    getCenterMedicineList({ type: data['type'], orgCode: SESSION_ORGId, keyword: data['keyword'] }).then((data) => {
      this.setState({ centerData: data['success'] ? data.data.result : this.state.centerData })
    }).catch();
  }

  //选中时触发
  onCheckOrgItem = (selectedRowKeys, selectedRows) => {
    this.setState({ checkedOrgItem: selectedRows[0] });
  }

  //匹配时触发
  onCheckCenterItem = (text, record) => {
    const { checkedOrgItem } = this.state;
    if(lodash.isNull(checkedOrgItem)) { return }
    //请求触发
    matchMedicine({
      org: checkedOrgItem,
      center: record,
      orgCode: SESSION_ORGId
    }).then((data) => {
      if(data['result'] == false) {
        message.error(data['desc']);
        return;
      } else if(data['result'] == true) {
        message.success(data['desc']);
      } else {
        return;
      }
      this.onOrgFreshList(DEFAULT_PARAM);
      this.onCenterFreshList(DEFAULT_PARAM);
    }).catch();
  }

  //解除关系
  onHandleOnClose = (e, item) => {
    deleteMatchMedicine({
      orgCode: item['orgCode'],  //所删匹配关系的orgCode(默认10000)
      code: item['orgCpmCode'],  //所删匹配关系的orgCmdrugCode
      cpmId: item['cpmId']  //所删匹配关系的cpmId
    }).then(() => {
      this.onOrgFreshList(DEFAULT_PARAM);
      this.onCenterFreshList(DEFAULT_PARAM);
    });
  }

  //一键自动匹配
  onHandleAutomatch = () => {
    autoMatchMedicine({ orgCode: SESSION_ORGId }).then(() => {
      this.onOrgFreshList(DEFAULT_PARAM);
      this.onCenterFreshList(DEFAULT_PARAM);
    });
  }

  /****************************设置权重 B****************************/
  //打开权重模态框
  handleWeighthowModal = (text, record) => {
    this.setState({ weightModalVisiable: true, weightModalData: record['buCPatentmedicineOrgs'] });
  }
  /**
   * param 最终要保存的数据,
   */
  handleweightOk = (param) => {
    const { weightModalData } = this.state;
    let _weightModalData = lodash.clone(weightModalData);
    _weightModalData.map((item, index) => {
      item['weight'] = index + 1;
    })
    updateMedicineOrg(_weightModalData).then((data)=> {
      if(data['result'] == false) {
        message.error(data['desc']);
        return;
      } else if(data['result'] == true) {
        message.success(data['desc']);
      } else {
        return;
      }
      this.setState({ weightModalVisiable: false });
      this.onCenterFreshList(DEFAULT_PARAM);
    });
  }
  //取消保存分类
  handleweightCancel = (e) => {
    this.setState({ weightModalVisiable: false });
  }

  generatorRowKey = (record) => {
    return record['fieldid'];
  }

  //上移
  handleUp = (record) => {
    const fieldid = record['fieldid'];
    const { weightModalData } = this.state;
    const _len = weightModalData.length;
    // 1 如果列表中只有一条数据 直接返回
    if(_len < 2) { return }
    // 2 获取需要移动元素的位置
    let location = lodash.findIndex(weightModalData, function(o) { return o.fieldid == fieldid; });
    // 3 如果选中元素的位置是0 第一个，直接返回
    if(location == 0) { return }
    let _weightModalData = lodash.clone(weightModalData);
    // 4 选中元素与前一个元素交换位置
    const _tempData = _weightModalData[location];
    _weightModalData[location] = _weightModalData[location-1];
    _weightModalData[location-1] = _tempData;
    // 5 设置state 渲染数据 
    this.setState({weightModalData: _weightModalData});
  }

  handleDown = (record) => {
    const fieldid = record['fieldid'];
    const { weightModalData } = this.state;
    const _len = weightModalData.length;
    // 1 如果列表中只有一条数据 直接返回
    if(_len < 2) { return }
    // 2 获取需要移动元素的位置
    let location = lodash.findIndex(weightModalData, function(o) { return o.fieldid == fieldid; });
    // 3 如果选中元素的位置是_len-1 最后一个，直接返回
    if(location == _len-1) { return }
    let _weightModalData = lodash.clone(weightModalData);
    // 4 选中元素与后一个元素交换位置
    const _tempData = _weightModalData[location];
    _weightModalData[location] = _weightModalData[location+1];
    _weightModalData[location+1] = _tempData;
    // 5 设置state 渲染数据 
    this.setState({weightModalData: _weightModalData});
  }

  handleTop = (record) => {
    const fieldid = record['fieldid'];
    const { weightModalData } = this.state;
    const _len = weightModalData.length;
    // 1 如果列表中只有一条数据 直接返回
    if(_len < 2) { return }
    // 2 获取需要移动元素的位置
    let location = lodash.findIndex(weightModalData, function(o) { return o.fieldid == fieldid; });
    // 3 如果选中元素的位置是第一个，直接返回
    if(location == 0) { return }
    let _weightModalData = lodash.clone(weightModalData);
    // 4 选中元素与第一个元素交换位置
    const _tempData = _weightModalData[location];
    _weightModalData[location] = _weightModalData[0];
    _weightModalData[0] = _tempData;
    // 5 设置state 渲染数据 
    this.setState({weightModalData: _weightModalData});
  }

  handleBottom = (record) => {
    const fieldid = record['fieldid'];
    const { weightModalData } = this.state;
    const _len = weightModalData.length;
    // 1 如果列表中只有一条数据 直接返回
    if(_len < 2) { return }
    // 2 获取需要移动元素的位置
    let location = lodash.findIndex(weightModalData, function(o) { return o.fieldid == fieldid; });
    // 3 如果选中元素的位置是最后一个，直接返回
    if(location == _len-1) { return }
    let _weightModalData = lodash.clone(weightModalData);
    // 4 选中元素与最后一个元素交换位置
    const _tempData = _weightModalData[location];
    _weightModalData[location] = _weightModalData[_len-1];
    _weightModalData[_len-1] = _tempData;
    // 5 设置state 渲染数据 
    this.setState({weightModalData: _weightModalData});
  }
  /****************************设置权重 E****************************/

  render() {
    const { orgData, centerData, weightModalVisiable, weightModalData } = this.state;
    return (
      <div className='HomeIndex_home2'>
        <div className='HomeIndex_home_div2'>
          <p>中成药信息匹配
            <Button style={{marginLeft: 20}} type="primary" onClick={this.onHandleAutomatch}>一键自动匹配</Button>
          </p><hr className='hr1' />
        </div>
        <Row>
          <Col span={12} className="HomeIndex_centerLine" >
            <YKItems title="本院用药目录"
              keyName={'medicineid'}
              radioValue={0}
              searchText="在本院用药目录中查找"
              freshLists={this.onOrgFreshList}
              tableData={{ columns: this.orgColumns, dataSource: orgData }}
              isMatch={false}
              check={this.onCheckOrgItem} />
          </Col>
          <Col span={12}>
            <YKItems title="系统中成药库"
              keyName={'medicineid'}
              radioValue={0}
              searchText="在系统用药目录中查找"
              freshLists={this.onCenterFreshList}
              tableData={{ columns: this.centerColumns, dataSource: centerData }}
              isMatch={true}
              check={this.onCheckCenterItem} />
          </Col>
        </Row>
        <Modal visible={weightModalVisiable} title='设置权重' onOk={this.handleweightOk} onCancel={this.handleweightCancel} footer={[
          <Button key="back" onClick={this.handleweightCancel}>返回</Button>,
          <Button key="submit" type="primary" onClick={this.handleweightOk}>保存</Button>,
        ]}>
          <Table rowKey={(record) => this.generatorRowKey(record)} dataSource={weightModalData} columns={this.weightColums} />
        </Modal>
      </div>
    );
  }
}

export default HomeIndexIndex;
