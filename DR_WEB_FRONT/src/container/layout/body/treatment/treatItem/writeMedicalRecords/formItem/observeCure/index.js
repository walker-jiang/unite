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
   * @param  {[type]} status [状态]
   * @return {[type]}        [undefined]
   */
  expand(e, status){
    this.setState({
      expand: status
    });
    if(!status && this.tongueShow){ // 同时收起左侧悬浮框
      this.tongueShow.handleClose();
    }else{
      this.props.hideFeelCure(e, 'feelCure');
    }
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  /**
   * [observeTagsClick 点击望诊小标签触发的选中函数]
   * @param  {[type]} tongueCoated [舌苔]
   * @param  {[type]} tongueShape  [舌质]
   * @return {[type]}              [undefined]
   */
  observeTagsClick(type, text){ // 将选中的标签插入输入行
    // let tongueCoatedText = []; // 舌苔文本描述
    // tongueCoated.forEach((item, index)=>{
    //   tongueCoatedText.push(item.name);
    // });
    // let tongueShapeText = []; // 舌质文本描述
    // tongueShape.forEach((item, index)=>{
    //   tongueShapeText.push(item.name);
    // });
    // let text = tongueCoatedText.length > 0 ? '舌苔（':'';
    // text += tongueCoatedText.join('、')
    // text += tongueCoatedText.length > 0 ? '）' : '';
    // text += ( tongueCoatedText.length && tongueShapeText.length ) ? '；' : '';
    // text += tongueShapeText.length > 0 ? '舌质（' : '';
    // text += tongueShapeText.join('、')
    // text += tongueShapeText.length > 0 ? '）' : '';
    // let text = tongueCoatedText.join('、') + (tongueCoatedText.length ? '、' : '') + tongueShapeText.join('、');
    // let buPatcasToncoaList = tongueCoated;
    // let buPatcasTonnatList = tongueCoated;
    // let originData = { buPatcasToncoaList, buPatcasTonnatList};
    let pre_text = this.props.getFieldsValue(['inspection']).inspection;
    if(type === 'add' && text){
      if(pre_text){
        if(!pre_text.includes(text)){
          var lastChar = pre_text.substr(pre_text.length - 1, 1);
          if(lastChar === '，' || lastChar == '。' || lastChar === '、' || lastChar === '；' || lastChar === ',' || lastChar === '.' || lastChar === '/'){
            pre_text += text; // 如果最后一个字符包含符号则直接添加字符串
          }else{
            pre_text += '、' + text;
          }
          this.props.setFieldsValue({inspection: pre_text});
        }
      }else{
        this.props.setFieldsValue({inspection: text});
      }
    }else{
      if(pre_text.includes(text) && text){ // 字符串匹配
        for(var i=0; i < pre_text.length; i++){
          var searchResult = pre_text.startsWith(text, i); // 判断是否存在如果存在
          if(searchResult){
            pre_text =  pre_text.replace(text, '');
            if(pre_text[i] === '，' || pre_text[i] == '。' || pre_text[i] === '、' || pre_text[i] === '；' || pre_text[i] === ',' || pre_text[i] === '.' || pre_text[i] === '/'){
              let prefix = pre_text.substr(0, i);
              pre_text = prefix + pre_text.substr(i+1);
            }
            this.props.setFieldsValue({inspection: pre_text});
          }
        }
      }
    }
  };
  /**
   * [handleEnterPress 键盘事件]
   * @param  {[type]} e [事件源]
   * @return {[type]}   [undefined]
   */
  handleEnterPress = (e) => {
    let expand = this.state.expand;
    if(e.keyCode == 13){ // tab键
      // this.expand(e, !expand);
      this.props.onEnterKeyDown();
    }
    if(e.keyCode == 9){ // tab键
      this.expand(e, false);
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
    if(this.tongueShow.visible){
      this.setState({ standard });
    }else {
      this.setState({ standard }, () => {
        this.tongueShow.handleOpen();
      });
    }

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
    const { getFieldDecorator, formItemLayout, initialValue, visiblePicture, getFieldsValue, camera = true } = this.props;
    let { expand, tonguePicture, standard } = this.state;
    return (
      <Container camera={camera}>
        <Row>
          <SpecCol span={3} >
            <Arrow type={expand ? 'up-circle' : 'down-circle'} onClick={(e)=>{this.expand(e, !expand)}}/>
            <span>舌诊：</span>
          </SpecCol>
          <Col span={21}>
            <SpecFormItem>
              {getFieldDecorator('inspection', {
                initialValue: initialValue.text
              })(
                <Input onClick={(e)=>this.expand(e, !expand)} onKeyDown={this.handleEnterPress} innerRef={ref => {this.input = ref}}/>
              )}
              <ObserveTags selectedText={getFieldsValue(['inspection'])} onClick={this.observeTagsClick} expand={expand} tagsOver={this.tagsOver} tagsOut={this.tagsOut}/>
            </SpecFormItem>
          </Col>
          {
            camera ?
              <div>
                <ShowTongueAction src={tip} onClick={() => {this.tongueShow.handleOpen()}}></ShowTongueAction>
                <Sign type='camera' width='18px' height='18px' fill='#33CC00' onClick={this.takePicture}/>
                <Camera ref={ref => this.camera = ref} returPicture={this.returTonguePicture}></Camera>
                <PicureEditor getUrl={this.getUrl} retakePicture={() => {this.camera.handleOpen()}} ref={ ref => { this.picureEditor = ref }}></PicureEditor>
              </div> : null
          }
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
const Container = styled.div`
  padding-left: ${props => props.camera ? '16px' : '0px'};
  padding-right: ${props => props.camera ? '38px' : '0px'};
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
@描述：诊疗单表单望诊表单项
*/
