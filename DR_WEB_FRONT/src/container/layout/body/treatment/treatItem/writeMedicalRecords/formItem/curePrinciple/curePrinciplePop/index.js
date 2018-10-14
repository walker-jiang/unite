import React, {Component} from 'react';
import styled from 'styled-components';
import { Tag, Input } from 'antd';
import InputEnterPop from 'components/dr/input/enterPopInput';
import Loading from 'components/dr/loading';
import inputSty from 'components/antd/style/input';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class CurePriciple extends Component {
  constructor(props){
    super(props);
    this.state = {
      key: '',
      keys: [], // 关键词列表
      curePrincipleData: [], // 主症列表
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
      loaded: false, // 数据是否加载完
    };
    this.initialData = this.initialData.bind(this);
  };
  initialData(){
    this.getKeysData();
    this.getCurePrinciple('');
  };
  /** [getKeysData 请求关键词列表] */
  getKeysData(){
    console.log('请求关键词');
    let self = this;
    let params = {
      url: 'BaEnteritemKeywordController/getList',
      data: {
        itemFieldname: '治疗原则',
      },
    };
    function callBack(res){
      if(res.result){
        let keys = res.data.map((item)=>{
          return item.keyword
        });
        self.setState({keys});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getPrimarySym 请求主症列表] */
  getCurePrinciple(key){
    let self = this;
    let params = {
      url: 'BaEnteritemDictController/getList',
      data: {
        keyword: key,
        itemFieldname: '治疗原则',
      },
    };
    function callBack(res){
      if(res.result){
        let curePrincipleData = res.data.map((item)=>{
          return item.itemcontent
        });
        let totalLines = curePrincipleData.length;
        let loaded = true;
        self.setState({key, curePrincipleData, totalLines, loaded});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [filter 对输入的关键词进行过滤的函数] */
  filter = (value) => {
    this.getCurePrinciple(value);
  }
  /** [selectText 选中某行文本接下来要显示在父组件输入框中] */
  selectText = (text) => { //
    // this.input.focus(); // 返回焦点
    let pre_value = typeof(this.props.value) == 'string' ? this.props.value + '；' : this.props.value.extractionData;
    pre_value += text + '；';
    if(!!pre_value && (pre_value.substr(pre_value.length-1) != '；')){
    }
    this.props.onChange({originData: [], extractionData: pre_value}); // 改变治疗原则表单项的值
  };
  /** [handleTagInput 选择标签，接下来应该将标签赋值给输入框] */
  handleTagInput(e){
    this.filter(e.target.innerText);
  };
  /** [handleTagInput 选择标签，接下来应该将标签赋值给输入框] */
  handleTagInput(e){
    this.filter(e.target.innerText);
  };
  /** [handleEnterPress 包括enter显示，esc隐藏的判断函数] */
  handleEnterPress = (e) => {
    if(e.keyCode == 27){ // ESC
      this.inputEnterPop.handleClose();
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
        let curePrincipleData = this.state.curePrincipleData;
        this.selectText(curePrincipleData[curLine]);
        break;
      case 39:         // 向右箭头，取消选中当前行
        break;
    };
    this.setState({ curLine });
  };
  render() {
    let formItemProps = this.props;
    let { key, keys, curePrincipleData, curLine, totalLines, loaded } = this.state;
    return (
      <SpecInputEnterPop icon_right='-20px' tabIndex='2' displayed = {this.initialData} formItemProps={formItemProps} innerRef={ref=>this.inputEnterPop = ref} title='治疗原则' icon='#C6C6C6'>
        <Container>
          <Header innerRef={ref => this.header = ref}>
            <Key>主症：</Key>
            <SemiCircleInput autoFocus='autofocus' onKeyDown={this.handleEnterPress} innerRef={ref => {this.input = ref}} className='not-draggable' onChange={(e)=>{this.filter(e.target.value)}}/>
          </Header>
          <Result innerRef={ref => this.result = ref} lines={8} totalLines={totalLines}>
          {
            (loaded) ?
            curePrincipleData.map((item, index)=><Line key={index} innerRef={ref => this['' + index] = ref} selected={(index == curLine)?'selected':'unselected'} innerRef={ref => this['' + index] = ref} onClick={(e)=>{this.selectText(e.target.innerText)}}>{item}</Line>)
            :
            <Loading loading={true}/>
          }
          </Result>
          <Footer>
            <p>🏷常用搜索标签</p>
            <KeyList className='semicircle'>
              {
                keys.map((item, index)=>{
                  return <Tag key={index} color="#f50" onClick={(e)=>this.handleTagInput(e)}>{item}</Tag>
                })
              }
            </KeyList>
          </Footer>
        </Container>
      </SpecInputEnterPop>
    );
  }
}
const SpecInputEnterPop = styled(InputEnterPop)`
  svg{
    right: -20px;
    border: 1px solid red;
  }
`;
const Container = styled.div`
  font-family: "MicrosoftYaHei Microsoft YaHei";
  background: rgba(242, 242, 242, 1);
  font-size: 13px
`;
const SemiCircleInput = styled(Input)`
  ${inputSty.semicircle}
`;
const KeyList = styled.div`
  margin-top: 20px;
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
  width: 60px
`;
const LineHeight = 25;
const Result = styled.div`
  height: ${props => props.lines * LineHeight + 'px'};
  overflow-y: ${props => props.totalLines > props.lines ? 'scroll' : 'auto'};
  background-color: #FFFFFF;
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
    background-color: rgba(10, 110, 203, 1);
  }
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
@日期：2018-07-09
@描述：治疗组件，包含主诉输入框和弹框，弹框提供子元素即可
*/
