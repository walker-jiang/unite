import React, {Component} from 'react';
import styled from 'styled-components';
import { Tag, Input } from 'antd';
import TextareaEnterPop from 'components/dr/textareaEnterPop';
import Loading from 'components/dr/loading';
import SimplePop from './simplePop';
import inputSty from 'components/antd/style/input';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class MainSpeech extends Component {
  constructor(props){
    super(props);
    this.state = {
      key: '',
      keys: [], // 关键词列表
      primarySyms: [], // 主症列表
      loaded: false, // 数据是否加载完
      totalLines: 0, // 查询结果总行数
      curLine: 0, // 当前行,从0开始，-1表示未选中任何行
    };
    this.simplePopSure = this.simplePopSure.bind(this);
    this.initialData = this.initialData.bind(this);
  };
  /** [initialData 数据初始化] */
  initialData(){
    this.getKeysData();
    this.getPrimarySym('');
  };
  /** [getKeysData 请求关键词列表] */
  getKeysData(){
    let self = this;
    let params = {
      url: 'BaEnteritemKeywordController/getList',
      data: {
        itemFieldname: '主诉',
      },
    };
    function callBack(res){
      if(res.result){
        let keys = res.data.map((item)=>{
          return item.keyword
        });
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
   * [getPrimarySym 请求主症列表]
   * @param  {[type]} key [关键词]
   * @return {[type]}     [undefined]
   */
  getPrimarySym(key){
    let self = this;
    let params = {
      url: 'BaEnteritemDictController/getList',
      data: {
        keyword: key,
        itemFieldname: '主诉',
      },
    };
    function callBack(res){
      if(res.result){
        let primarySyms = res.data.map((item)=>{
          return item.itemcontent
        });
        let loaded = true;
        let totalLines = primarySyms.length;

        self.setState({key, primarySyms, loaded, totalLines});
      }else{
        console.log('异常响应信息', res);
      }
    };
    this.setState({loaded: false}); // 去加载
    ajaxGetResource(params, callBack);
  };
  /**
   * [simplePopSure 时间确定按钮点击后触发的函数]
   * @param  {[type]} primarySym [主症文本]
   * @param  {[type]} time       [时间]
   * @return {[type]}            [undefined]
   */
  simplePopSure(primarySym, time){
    this.inputEnterPop.handleClose(); // 关闭本弹框
    let pre_text = typeof(this.props.value) == 'string' ? this.props.value + '；' : this.props.value.extractionData;
    pre_text += !! time ? (primarySym + '(持续时间：' + time + '天)') : primarySym;
    pre_text += '；';
    this.props.onChange({originData: [], extractionData: pre_text}); // 改变主诉表单项的值
  };
  /**
   * [filter 对输入的关键词进行过滤的函数]
   * @param  {[type]} value [输入值]
   * @return {[type]}       [undefined]
   */
  filter = (value) => {
    this.getPrimarySym(value);
  }
  /**
   * [selectText 选中某行文本接下来要显示弹框填写持续时间]
   * @param  {[type]} text [选中行文本]
   * @param  {[type]} curLine [选中行行标]
   * @return {[type]}      [undefined]
   */
  selectText = (text, curLine) => {
    if(curLine){
      this.setState({
        visibleChild: true,
        curLine: curLine
      })
    }else{
      this.setState({
        visibleChild: true
      })
    }
    this.simplePop.handleOpen(text); // 打开时间框
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
        let primarySyms = this.state.primarySyms;
        this.selectText(primarySyms[curLine]);
        break;
    };
    this.setState({ curLine });
  };
  render() {
    let formItemProps = this.props;
    let { primarySym, key, keys, primarySyms, loaded, curLine, totalLines } = this.state;
    return (
      <TextareaEnterPop displayed = {this.initialData} formItemProps={formItemProps} ref={ref=>this.inputEnterPop = ref}  ref={ref=>this.inputEnterPop = ref} icon='#0A6ECB'>
        <Container >
          <SimplePop ref={ref=>this.simplePop = ref} onOk={this.simplePopSure} returnFocus={()=>{ this.input.focus() }}/>
          <Header innerRef={ref => this.header = ref}>
            <Key>主症：</Key>
            <SemiCircleInput className='not-draggable' ref={ref => {this.input = ref}} autoFocus='autofocus' onKeyDown={this.handleEnterPress} onChange={(e)=>{this.filter(e.target.value)}}  />
          </Header>
          <Result innerRef={ref => this.result = ref} lines={8} totalLines={totalLines} onKeyDown={this.handleEnterPress}>
          {
            (loaded) ?
            primarySyms.map((item, index)=>
            <Line key={index} selected={(index == curLine)?'selected':'unselected'} innerRef={ref => this['' + index] = ref} onClick={(e)=>{this.selectText(e.target.innerText, index)}}>{item}</Line>
          )
            :
            <Loading loading={true}/>
          }
          </Result>
          <Footer>
            <p>🏷常用搜索标签</p>
            <KeyList className='semicircle'>
              {
                keys.map((item, index)=>{
                  return <Tag key={ index} color="#f50" onClick={(e)=>this.handleTagInput(e)}>{item}</Tag>
                })
              }
            </KeyList>
          </Footer>
        </Container>
      </TextareaEnterPop>
    );
  }
}
const Container = styled.div`
  font-family: "MicrosoftYaHei Microsoft YaHei";
  background: rgba(242, 242, 242, 1);
  font-size: 13px
`;
const SemiCircleInput = styled(Input)`
  ${inputSty.semicircle}
`;

const KeyList = styled.div`
  margin-top: 10px;
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
    background-color: rgb(117, 171, 222);
    color: white;
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
@日期：2018-07-06
@描述：主诉组件，包含主诉输入框和弹框，弹框提供子元素即可
*/
