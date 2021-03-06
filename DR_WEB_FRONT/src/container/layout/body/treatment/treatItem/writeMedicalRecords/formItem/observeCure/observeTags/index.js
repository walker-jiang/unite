import React, {Component, PropTypes} from 'react'; // react核心
import CheckableTag from 'components/antd/components/checkableTag';
import styled from 'styled-components';
import Modal from 'react-modal';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class ObserveCure extends Component {
  constructor(props){
    super(props);
    this.state = {
      tongueCoatedSelected: [], //已选舌苔
      tongueNatureSelected: [], // 已选舌质
      tongueCoatedList: [], //舌苔列表
      tongueNatureList: [], //舌质列表
      visible: false, // 图片是否可见
      timeout: null, //定时器对象
    };
    this.coatedTagClick = this.coatedTagClick.bind(this);
    this.natureTagClick = this.natureTagClick.bind(this);
    this.tagsOver = this.tagsOver.bind(this);
    this.tagsOut = this.tagsOut.bind(this);
  };
  componentWillMount(){
    this.getTongueCoatedData();
    this.getTongueNatureData();
  };
  /** [getTongueCoatedData 获取舌苔列表] */
  getTongueCoatedData(){
    let self = this;
    let params = {
      url: 'BuTongueCoatingController/getList',
      data: {},
    };
    function callBack(res){
      if(res.result){
        let tongueCoatedList = res.data.map((item)=>{
          return {id: item.coatingid, name: item.coaTypename, color: item.showColor, url: item.coaTypeurl, detail: item.coaTypedesc}
        });
        self.setState({tongueCoatedList});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [getTongueNatureData 获取舌质列表] */
  getTongueNatureData(e){
    let self = this;
    let params = {
      url: 'BuTongueNatureController/getList',
      data: {},
    };
    function callBack(res){
      if(res.result){
        let tongueNatureList = res.data.map((item)=>{
          return {id: item.natureid, name: item.natTypename, color: item.showColor, url: item.natTypeurl, detail: item.natTypedesc}
        });
        self.setState({tongueNatureList});
      }else{
        console.log('异常响应信息', res);
      }
    };
    ajaxGetResource(params, callBack);
  };
  /** [coatedTagClick 舌苔标签被选择] */
  coatedTagClick(text, checkable, id){
    let tongueCoatedSelected = this.state.tongueCoatedSelected;
    this.traverseArr(text, checkable, tongueCoatedSelected, id);
  };
  /** [natureTagClick 舌质标签被选择] */
  natureTagClick(text, checkable, id){
    let tongueNatureSelected = this.state.tongueNatureSelected;
    this.traverseArr(text, checkable, tongueNatureSelected, id);
  };
  /** [traverseArr 将已经选择的通知父组件显示] */
  traverseArr(text, checkable, arr, id){
    if(checkable){ // 选中
      arr.push({id: id, name: text});
    }else{ // 取消
      arr.pop({id: id, name: text});
    }
    let {tongueCoatedSelected, tongueNatureSelected} = this.state;
    this.props.onClick(tongueCoatedSelected, tongueNatureSelected);
  };
  /**
   * [tagsOver 鼠标滑过标签2后触发另一个事件]
   * @param  {[type]} text   [文本]
   * @param  {[type]} url    [地址]
   * @param  {[type]} detail [详情]
   * @return {[type]}        [undefined]
   */
  tagsOver(text, url, detail){
    let self = this;
    window.timeout = setTimeout(() => {
      self.props.tagsOver(text, url, detail);
    }, 1000);
  };
  /** [tagsOut 鼠标画出] */
  tagsOut(){
    this.props.tagsOut();
    clearTimeout(window.timeout);
  };
  render() {
    let { tongueCoatedList, tongueNatureList, visible } = this.state;
    let expand = this.props.expand;
    return (
      <TagsContainer expand={expand}>
        <Type>
          <Title>舌质：</Title>
          <Row>
            {
              tongueNatureList.map((item, index) => {
                return <CheckableTag onMouseEnter={this.tagsOver} onMouseOut={this.tagsOut} url={item.url} key={index} id={item.id } color={item.color} onClick={this.coatedTagClick} text={item.name} detail={item.detail}></CheckableTag>
              })
            }
          </Row>
        </Type>
        <Type>
          <Title>舌胎：</Title>
          <Row>
          {
            tongueCoatedList.map((item, index) => {
              return <CheckableTag onMouseEnter={this.tagsOver} onMouseOut={this.tagsOver} url={item.url} key={index} id={item.id} color={item.color} onClick={this.natureTagClick} text={item.name} detail={item.detail}></CheckableTag>
            })
          }
          </Row>
        </Type>
      </TagsContainer>
    )
  }
}
const TagsContainer = styled.div`
  display: ${props => props.expand ? 'block' : 'none'}
`;
const Type = styled.div`
  display: flex;
`;
const Row = styled.div`
  float: left;
`;
const Title = styled.span`
  word-wrap: normal;
  white-space: nowrap;
`;
const PicShow = styled.div`
  display: flex;
  position: fixed;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 4px #6b6666;
  right: 100px;
  top: 100px;
  z-index: 4000;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Picture = styled.img`
  width: 200px;
  height: 200px;
`;
const Discribe = styled.div`

`;
/*
@作者：姜中希
@日期：2018-06-28
@描述：望诊组件
*/
