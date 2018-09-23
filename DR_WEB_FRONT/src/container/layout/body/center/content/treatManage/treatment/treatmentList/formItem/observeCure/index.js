import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import Icon from 'components/dr/icon';
import ObserveTags from './observeTags';
import Input from 'components/dr/input/basicInput';
import shetai from './observeTags/shetai.jpg';
import Camera from 'components/dr/camera';


const FormItem = Form.Item;

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand: false, // 望诊是否展开
      visiblePicture: false, // 是否展示图片
      tonguePicture: shetai, // 舌头图片
    };
    this.observeTagsClick = this.observeTagsClick.bind(this);
    this.returTonguePicture = this.returTonguePicture.bind(this);
  };
  /**
   * [expand 点击左侧下标触发展开或者收缩按钮]
   * @param  {[type]} e      [事件源]
   * @param  {[type]} type   [status类型]
   * @param  {[type]} status [状态]
   * @return {[type]}        [undefined]
   */
  expand(e, type, status){
    this.setState({
      [type]: status
    });
  };
  /**
   * [observeTagsClick 点击望诊小标签触发的选中函数]
   * @param  {[type]} tongueCoated [舌苔]
   * @param  {[type]} tongueShape  [舌质]
   * @return {[type]}              [undefined]
   */
  observeTagsClick(tongueCoated, tongueShape){ // 将选中的标签插入输入行
    let tongueCoatedText = []; // 舌苔文本描述
    tongueCoated.forEach((item, index)=>{
      tongueCoatedText.push(item.name);
    });
    let tongueShapeText = []; // 舌质文本描述
    tongueShape.forEach((item, index)=>{
      tongueShapeText.push(item.name);
    });
    let text = tongueCoatedText.length > 0 ? '舌苔（':'';
    text += tongueCoatedText.join('、')
    text += tongueCoatedText.length > 0 ? '）' : '';
    text += ( tongueCoatedText.length && tongueShapeText.length ) ? '；' : '';
    text += tongueShapeText.length > 0 ? '舌质（' : '';
    text += tongueShapeText.join('、')
    text += tongueShapeText.length > 0 ? '）' : '';

    let buPatcasToncoaList = tongueCoated;
    let buPatcasTonnatList = tongueCoated;
    let originData = { buPatcasToncoaList, buPatcasTonnatList};
    this.props.setFieldsValue({inspection: text});
  };
  /**
   * [handleEnterPress 键盘事件]
   * @param  {[type]} e [事件源]
   * @return {[type]}   [undefined]
   */
  handleEnterPress = (e) => {
    if(e.keyCode){ // tab键
      this.expand(e, 'expand', false);
    }
  }
  /**
   * [returTonguePicture 获取图片]
   * @param  {[type]} tonguePicture [图片]
   * @return {[type]}               [undefined]
   */
  returTonguePicture(tonguePicture){
    this.setState({ tonguePicture });
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue, visiblePicture } = this.props;
    let { expand, tonguePicture } = this.state;
    return (
      <SpecRow className='height'>
        <SpecCol span={3} onClick={(e)=>this.expand(e, 'expand', !expand)}>
          <Arrow type={expand ? 'up-circle' : 'down-circle'}/>
          <span>望诊：</span>
        </SpecCol>
        <Col span={21}>
          <SpecFormItem className='height'>
          {getFieldDecorator('inspection', {
            initialValue: initialValue
          })(
            <Input onFocus={(e)=>this.expand(e, 'expand', !expand)} onKeyDown={this.handleEnterPress} innerRef={ref => {this.input = ref}}/>
          )}
          <ObserveTags onClick={this.observeTagsClick} expand={expand}/>
          </SpecFormItem>
          <ThumbNailContanier onClick={() => {this.input.focus()}}>
              <Thumbnail src={tonguePicture}></Thumbnail>
          </ThumbNailContanier>
        </Col>
        <Sign type='camera' width='20px' height='20px' onClick={() =>  this.camera.handleOpen()}/>
        <Camera ref={ref => this.camera = ref} returPicture={this.returTonguePicture}></Camera>
      </SpecRow>
    );
  }
}
const SpecRow = styled(Row)`
  margin-top: -20px;
  &&& {
    margin-bottom: 0px;
  }
`;
const SpecCol = styled(Col)`
  &&& {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
  }
  font-size: 12px;
  height: 35px;
`;
const Arrow= styled(Icon)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin-top: 5px;
`;
const Sign = styled(Icon)`
  position: absolute;
  right: 20px;
  top: 15px;
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-control {
    line-height: 30px;
  }
`;
const ThumbNailContanier = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #d9d9d9;
`;
const Thumbnail = styled.img`
  height: 88px;
  width: 88px;
`;

/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单表单望诊表单项
*/
