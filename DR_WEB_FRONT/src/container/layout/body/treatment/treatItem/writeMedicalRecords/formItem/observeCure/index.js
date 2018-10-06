import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import Icon from 'components/dr/icon';
import ObserveTags from './observeTags';
import Input from 'components/dr/input/basicInput';
import shetai from './tongueShow/shetai.jpg';
import Camera from 'components/dr/camera';
import PicureEditor from 'components/dr/picureEditor';
import TongueShow from './tongueShow';

const FormItem = Form.Item;

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand: false, // 望诊是否展开
      visiblePicture: false, // 是否展示图片
      tonguePicture: shetai, // 舌头图片
      standard: {}, // 标准图片 文本 描述
    };
    this.observeTagsClick = this.observeTagsClick.bind(this);
    this.returTonguePicture = this.returTonguePicture.bind(this);
    this.tagsOver = this.tagsOver.bind(this);
    this.tagsOut = this.tagsOut.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.getUrl = this.getUrl.bind(this);
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
    this.props.setFieldsValue({inspection: {originData: [], extractionData: text}});
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
    // this.setState({ tonguePicture });
    this.picureEditor.handleOpen(tonguePicture);
  };
  /** [takePicture 拍照函数] */
  takePicture(){
    this.camera.handleOpen();
    this.tongueShow.handleClose();
  };
  /**
   * [tagsOver 鼠标滑过标签]
   * @param  {[type]} text   [文本]
   * @param  {[type]} url    [地址]
   * @param  {[type]} detail [详情]
   * @return {[type]}        [undefined]
   */
  tagsOver(text, url, detail){
    let standard = { text, url, detail };
    this.setState({ standard });
    this.tongueShow.handleOpen();
  };
  /** [tagsOut 鼠标画出] */
  tagsOut(){
    this.tongueShow.handleClose();
  };
  /** [getUrl 获取拍照图片路径] */
  getUrl(url){
    this.tongueShow.handleOpen(url);
    this.props.setFieldsValue({
      tongue: url
    });
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue, visiblePicture } = this.props;
    let { expand, tonguePicture, standard } = this.state;
    return (
      <div>
        <SpecRow>
          <SpecCol span={3} onClick={(e)=>this.expand(e, 'expand', !expand)}>
            <Arrow type={expand ? 'up-circle' : 'down-circle'}/>
            <span>望诊：</span>
          </SpecCol>
          <Col span={21}>
            <SpecFormItem>
              {getFieldDecorator('inspection', {
                initialValue: initialValue.text
              })(
                <Input onFocus={(e)=>this.expand(e, 'expand', !expand)} onKeyDown={this.handleEnterPress} innerRef={ref => {this.input = ref}}/>
              )}
              <ObserveTags onClick={this.observeTagsClick} expand={expand} tagsOver={this.tagsOver} tagsOut={this.tagsOut}/>
            </SpecFormItem>
            <ThumbNailContanier onClick={() => {this.input.focus()}}>
              <Thumbnail src={tonguePicture}></Thumbnail>
            </ThumbNailContanier>
          </Col>
          <Sign type='camera' width='18px' height='18px' fill='#33CC00' onClick={this.takePicture}/>
          <Camera ref={ref => this.camera = ref} returPicture={this.returTonguePicture}></Camera>
          <PicureEditor src={tonguePicture} getUrl={this.getUrl} ref={ ref => { this.picureEditor = ref }}></PicureEditor>
        </SpecRow>
        <FormItem>
          {getFieldDecorator('inspectionPicture', {
            initialValue: initialValue.urlArr
          })(
            <TongueShow standard={standard} ref = { ref => {this.tongueShow = ref}}></TongueShow>
          )}
        </FormItem>
      </div>
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
const SpecSpecFormItem = styled(FormItem)`

`;
/*
@作者：姜中希
@日期：2018-09-03
@描述：诊疗单表单望诊表单项
*/
