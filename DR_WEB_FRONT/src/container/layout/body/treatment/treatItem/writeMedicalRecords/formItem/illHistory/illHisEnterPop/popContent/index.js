import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Tag } from 'antd';
import TextareaEnterPop from 'components/dr/textareaEnterPop';
import Loading from 'components/dr/loading';
import Icon from 'components/dr/icon';
import TipModal from 'components/dr/modal/tip';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class PopContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      key: '', //关键词
      illHistoryList: [] , // 病史列表
      loaded: false, // 数据是否加载
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
      keys: [], // 关键词列表
    };
  };
  componentWillMount(){
    this.getIllHistory('');
    this.getKeysData();
  };
  /** [getKeysData 请求关键词列表] */
  getKeysData(){
    let self = this;
    let params = {
      url: 'BaEnteritemUserlabController/getTopTenLab',
      data: {
        orgUserId: window.sessionStorage.getItem('userid'),
        itemFieldname: this.props.itemFieldname,
      },
    };
    function callBack(res){
      if(res.result){
        let keys = res.data;
        let loaded = true;
        self.setState({keys, loaded});
      }else{
        console.log('异常响应信息', res);
      }
    };
    this.setState({loaded: false}); // 去加载
    ajaxGetResource(params, callBack);
  };
  /**
   * [getIllHistory 请求主症列表]
   * @param  {[type]} key   [主症关键词]
   * @param  {[type]} title [主症所属病历]
   * @return {[type]}       [undefined]
   */
  getIllHistory(key){
    let self = this;
    let params = {
      url: 'BaEnteritemDictController/getList',
      data: {
        keyword: key,
        itemFieldname: this.props.itemFieldname,
      },
    };
    function callBack(res){
      if(res.result){
        let illHistoryList = res.data;
        let loaded = true;
        let totalLines = illHistoryList.length;
        self.setState({key, illHistoryList, loaded, totalLines});
      }else{
        console.log('异常响应信息', res);
      }
    };
    this.setState({loaded: false}); // 状态重置
    ajaxGetResource(params, callBack);
  };
  /**
   * [filter 对输入的关键词过滤然后更新结果显示]
   * @param  {[type]} e     [事件源]
   * @param  {[type]} title [病史类型]
   * @return {[type]}       [undefined]
   */
  filter(key){
    this.setState({ key });
    this.getIllHistory(key);
  }
  /** [selectText 选中结果显示的某行后将选中结果传给formitem] */
  selectText = (item) => { // 选中某行
    let e = item.itemcontent;
    this.input.focus(); // 返回焦点
    let pre_text = typeof(this.props.value) == 'string' ? this.props.value : this.props.value.extractionData ;
    if(pre_text.substr(pre_text.length-1, 1) != '；' && pre_text){ // 用户手动输入后追加；
      pre_text += '；';
    }
    // 去重校验
    let repeat_item_text = this.validateRepeat(pre_text, e);
    if(repeat_item_text){
      this.tipModal.showModal({
        content: '已存在，请勿重复添加！',
        stressContent: repeat_item_text
      });
    }else{
      pre_text += e + '；';
      this.props.onChange({originData: [], extractionData: pre_text});
      this.maintainTags(item.id);
    }
  };
  /**
   * [validateRepeat 重复性校验]
   * @param  {[type]} pre_text [之前的文本]
   * @param  {[type]} e        [当前文本]
   * @return {[type]} string         [重复的文本]
   */
  validateRepeat(pre_text, e){
    let pre_text_arr = pre_text.replace(/、/, '；').split('；');
    let repeat_item_text = '';
    let cur_text_arr = e.split('、');
    cur_text_arr.forEach(cur_item => {
      pre_text_arr.forEach(pre_item => {
        if(cur_item === pre_item){
          repeat_item_text = cur_item;
          return;
        }
      });
    });
    return repeat_item_text;
  };
  /** [handleEnterPress 包括enter显示，esc隐藏的判断函数] */
  handleEnterPress = (e) => {
    if(e.keyCode == 27){ // ESC
      this.PopComponent.handleClose();
      e.preventDefault();// 阻止冒泡
      return false;
    }
    let curLine = this.state.curLine;
    let totalLines = this.state.totalLines;
    let lineHeight = this['' + this.state.curLine].offsetHeight; // 每行高度
    let curPosition = this['' + this.state.curLine].getBoundingClientRect().top; // 获取当前元素距页面上边距离
    let containerHeight = this.result.offsetHeight; // 显示结果容器的高度
    let headerPosition = this.header.getBoundingClientRect().top + this.header.offsetHeight; // 容器到页面上边距的距离
    switch(e.keyCode){
      case 40:         // 向下箭头, 选择下一行
        if(curLine >= totalLines-1){
          curLine = 0;
          this.result.scrollTop = 0;
        }else{
          if(curPosition >= headerPosition + containerHeight - lineHeight){
            this.result.scrollTop = this.result.scrollTop + lineHeight;
          }
          curLine++;
        }
        break;
      case 38:         // 向上箭头，选择上一行
        if(curLine <= 0){
          curLine = totalLines-1;
          this.result.scrollTop =  (totalLines - 1) * lineHeight;
        }else{
          if(curPosition <= headerPosition){
            this.result.scrollTop = this.result.scrollTop - lineHeight;
          }
          curLine--;
        }
        break;
      case 13:         // enter，选中当前行
        let illHistoryList = this.state.illHistoryList;
        this.selectText(illHistoryList[curLine]);
        break;
    };
    this.setState({ curLine });
  };
  // 通过点击或者选中维护小标签的前10
  maintainTags = (id) => {
    let self = this;
    let params = {
      url: 'BaEnteritemUserlabController/ServiceData',
      data: {
        id: id,
        orgUserId: window.sessionStorage.getItem('userid'),
      },
    };
    function callBack(res){

    };
    ajaxGetResource(params, callBack);
  };
  render(){
    let { illHistoryList, key, loaded, curLine ,totalLines, keys } = this.state;
    return(
      <Container>
        <Header innerRef={ref => this.header = ref}>
          <Key>关键词：</Key>
          <InputKeyWord className='not-draggable' innerRef={ref => {this.input = ref}} autoFocus='autofocus' onKeyDown={this.handleEnterPress} onChange={(e)=>{this.filter(e.target.value)}} value={key}/>
        </Header>
        <Linelist innerRef={ref => this.result = ref} lines={8} totalLines={totalLines} onKeyDown={this.handleEnterPress}>
        {
          (loaded == 1) ?
          illHistoryList.map((item, index)=>{
              return <Line key={index} id={(index == curLine)?'selected':'unselected'} selected={(index == curLine)?'selected':'unselected'} innerRef={ref => this['' + index] = ref} onClick={(e)=>{this.selectText(item)}}>{item.itemcontent}</Line>
          })
          :
          <Loading loading={true}/>
        }
        {
          loaded ? (illHistoryList.length ? null : <NoData type='empty'></NoData>) : null
        }
        </Linelist>
        <Footer>
          <p>🏷常用搜索标签</p>
          <KeyList className='semicircle'>
            {
              keys.map((item, index)=>{
                return <SpecTag key={index} color="#f50" onClick={(e)=>{this.filter(e.target.innerHTML)}}>{item.itemcontent}</SpecTag>
              })
            }
          </KeyList>
        </Footer>
        <TipModal ref={ref=>{this.tipModal=ref}}></TipModal>
      </Container>
    )
  }
}
const Container = styled.div`
  font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
  background: rgba(242, 242, 242, 1);
  font-size: 13px
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 400px;
  padding: 0px 20px
`;
const Key = styled.div`
  width: 75px
`;
/** @type {[type]} [圆角输入框] */
const InputKeyWord = styled(Input)`
  border-radius: 15px !important;
  outline: none
`;
const LineHeight = 25;
const Linelist = styled.div`
  &{...props};
  background-color: white;
  height: ${props => props.lines * LineHeight + 'px'};
  overflow-y: ${props => props.totalLines > props.lines ? 'scroll' : 'auto'};
`;
const Line = styled.div`
  background-color: ${props=>(props.selected == 'selected')?'rgb(117, 171, 222)': 'white'};
  color: ${props=>(props.selected == 'selected')?'white': 'rgba(0, 0, 0, 0.65)'};
  padding: 0px 5px;
  height: ${LineHeight + 'px'};
  line-height: ${LineHeight + 'px'};
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 171, 222);
    color: white;
  }
`;
const SpecTag = styled(Tag)`
  &&&.ant-tag{
    margin-bottom: 5px;
  }
`;
const NoData = styled(Icon)`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -30px;
  text-align: center;
`;
const KeyList = styled.div`
  margin-top: 10px;
`;
const Footer = styled.div`
  display: block;
  width: 400px;
  font-weight: 400;
  color: #666666;
  padding: 10px;
  font-size: 12px
`;
/*
@作者：姜中希
@日期：2018-09-04
@描述：书写诊疗单界面, 病史弹框组件
*/
