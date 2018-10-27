import React, {Component} from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import Icon from 'components/dr/icon';
import ObserveTags from './observeTags';
import Input from 'components/dr/input/basicInput';
import Camera from 'components/dr/camera';
import tip from './tip.png';
import PicureEditor from 'components/dr/picureEditor';
import TongueShow from './tongueShow';

const FormItem = Form.Item;

export default class ObserveCure extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand: false, // 望诊是否展开
      visiblePicture: false, // 是否展示图片
      tonguePicture: '', // 舌头图片
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
    // this.setState({ tonguePicture });
    this.picureEditor.handleOpen(tonguePicture);
  };
  /** [takePicture 拍照函数] */
  takePicture(){
    let tongueUrls = this.props.getFieldsValue(['inspectionPicture']).inspectionPicture;
    if(tongueUrls.length < 2){
      this.camera.handleOpen();
      this.tongueShow.handleClose();
    }
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
    this.setState({ standard }, () => {
      this.tongueShow.handleOpen();
    });

  };
  /** [tagsOut 鼠标画出] */
  tagsOut(){
    // this.tongueShow.handleClose();
  };
  /** [getUrl 获取拍照图片路径] */
  getUrl(url){
    if(url != '' && url){
      let tongueUrls = this.props.getFieldsValue(['inspectionPicture']).inspectionPicture;
      tongueUrls.push(url);
      this.props.setFieldsValue({ inspectionPicture: tongueUrls });
    }
    this.tongueShow.handleOpen();
  };
  render() {
    const { getFieldDecorator, formItemLayout, initialValue, visiblePicture } = this.props;
    let { expand, tonguePicture, standard } = this.state;
    return (
      <Container>
        <Row>
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
          </Col>
          <ShowTongueAction src={tip} onClick={() => {this.tongueShow.handleOpen()}}></ShowTongueAction>
          <Sign type='camera' width='18px' height='18px' fill='#33CC00' onClick={this.takePicture}/>
          <Camera ref={ref => this.camera = ref} returPicture={this.returTonguePicture}></Camera>
          <PicureEditor getUrl={this.getUrl} retakePicture={() => {this.camera.handleOpen()}} ref={ ref => { this.picureEditor = ref }}></PicureEditor>
        </Row>
        <HiddenFormItem>
          {getFieldDecorator('inspectionPicture', {
            initialValue: initialValue.urlArr
          })(
            <TongueShow standard={standard} ref = { ref => {this.tongueShow = ref}} modify_picture={(url) => {this.picureEditor.handleOpen(url)}}></TongueShow>
          )}
        </HiddenFormItem>
      </Container>
    );
  }
}
const SpecRow = styled(Row)`
  margin-top: -7px;
`;
const Container = styled.div`
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
const ShowTongueAction = styled.img`
  width: 17px;
  height: 17px;
  position: absolute;
  right: 0px;
  top: 15px;
`;
const Sign = styled(Icon)`
  position: absolute;
  right: -20px;
  top: 15px;
`;
const SpecFormItem = styled(FormItem)`
  .ant-form-item-control {
    line-height: 30px;
  }
`;
const HiddenFormItem = styled(FormItem)`
  &&&.ant-form-item {
    margin-bottom: 0px;
  }
`;
/*
@作者：姜中希
@日期：2018-09-03
@描述：病情病例确认舌诊组件
*/
