import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import TextareaEnterPop from 'components/dr/textareaEnterPop';
import Loading from 'components/dr/loading';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class IllHistory extends Component{
  constructor(props){
    super(props);
    this.state = {
      key: '', //关键词
      illHistoryList: [] , // 病史列表
      loaded: false, // 数据是否加载
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
    };
    this.initialData = this.initialData.bind(this);
  };
  /**
   * [initialData 对不同病史的数据进行初始化]
   * @param  {[type]} title [病史标题]
   * @return {[type]}       [undefined]
   */
  initialData(title){
    this.getillHistory('', title);
  };
  /**
   * [getillHistory 请求主症列表]
   * @param  {[type]} key   [主症关键词]
   * @param  {[type]} title [主症所属病历]
   * @return {[type]}       [undefined]
   */
  getillHistory(key, title){
    let self = this;
    let params = {
      url: 'BaEnteritemDictController/getList',
      data: {
        keyword: key,
        itemFieldname: title,
      },
    };
    function callBack(res){
      if(res.result){
        let illHistoryList = res.data.map((item)=>{
          return item.itemcontent
        });
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
  filter = (e, title) => {
    this.getillHistory(e.target.value, title);
  }
  /** [selectText 选中结果显示的某行后将选中结果传给formitem] */
  selectText = (e) => { // 选中某行
    this.input.focus(); // 返回焦点
    let pre_text = typeof(this.props.value) == 'string' ? this.props.value + '；' : this.props.value.extractionData;
    pre_text += e + '；';
    this.props.onChange({originData: [], extractionData: pre_text});
  };
  /** [handleEnterPress 包括enter显示，esc隐藏的判断函数] */
  handleEnterPress = (e) => {
    if(e.keyCode == 27){ // ESC
      this.textareaEnterPop.handleClose();
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
  render(){
    let formItemProps = this.props;
    let { illHistoryList, key, loaded, curLine ,totalLines } = this.state;
    return(
      <TextareaEnterPop formItemProps={formItemProps} displayed={this.initialData} ref={ref=>this.textareaEnterPop = ref}>
        <Container>
          <Header innerRef={ref => this.header = ref}>
            <Key>关键词：</Key>
            <InputKeyWord className='not-draggable' innerRef={ref => {this.input = ref}} autoFocus='autofocus' onKeyDown={this.handleEnterPress} value={key} onChange={(e)=>{this.filter(e, formItemProps.title)}}/>
          </Header>
          <Linelist innerRef={ref => this.result = ref} lines={8} totalLines={totalLines} onKeyDown={this.handleEnterPress}>
          {
            (loaded == 1) ?
            illHistoryList.map((item, index)=>{
                return <Line key={index} id={(index == curLine)?'selected':'unselected'} selected={(index == curLine)?'selected':'unselected'} innerRef={ref => this['' + index] = ref} onClick={(e)=>{this.selectText(e.target.innerText)}}>{item}</Line>
            })
            :
            <Loading loading={true}/>
          }
          </Linelist>
        </Container>
      </TextareaEnterPop>
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
/*
@作者：姜中希
@日期：2018-09-04
@描述：书写诊疗单界面, 病史弹框组件
*/
