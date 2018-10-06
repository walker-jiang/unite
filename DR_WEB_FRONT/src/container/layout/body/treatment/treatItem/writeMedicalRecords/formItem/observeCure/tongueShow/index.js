import React, {Component, PropTypes} from 'react'; // react核心
import CheckableTag from 'components/antd/components/checkableTag';
import styled from 'styled-components';
import Modal from 'react-modal';
import Icon from 'components/dr/icon';
import demoPic from './u3802.png';
import demoPic1 from './shetai.jpg';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

export default class ObserveCure extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      urlArr: [], // 地址列表
      curUrl: 0, // 当前地址
      standard: demoPic, //标准图片
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  };
  componentWillReceiveProps(nextProps){
    if(this.props.value.length != nextProps.value.length){
      this.setState({ urlArr: nextProps.value });
    }
  };
  /** [handleClose 关闭本组件] */
  handleClose(){
    this.setState({
      visible: false
    });
  };
  /** [handleOpen 打开本组件] */
  handleOpen(url){
    if(url){
      let urlArr = this.state.urlArr;
      urlArr.unshift(url);
      this.setState({
        visible: true,
        urlArr
      });
    }else {
      this.setState({
        visible: true,
      });
    }
  };
  /** [next 下一张] */
  next(){
    let { urlArr, curUrl, standard } = this.state;
    if(curUrl == urlArr.length){
      curUrl = 0;
    }else{
      curUrl++;
    }
    this.setState({ curUrl: curUrl });
  };
  /** [prev 上一张] */
  prev(){
    let { urlArr, curUrl } = this.state;
    if(curUrl == 0){
      curUrl = urlArr.length;
    }else{
      curUrl--;
    }
    this.setState({ curUrl: curUrl });
  };
  render() {
    let { visible, urlArr, curUrl } = this.state;
    let { url, text, detail } = this.props.standard;
    return (
      <div>
        {
          visible ?
            <PicShow>
            {
              urlArr.length ?
              <Container>
                <Header>
                  <Title>患者舌苔</Title>
                  <ClsoeIcon type='close'  onClick={this.handleClose}/>
                </Header>
                <Body>
                  <Picture src={config_service_url + urlArr[curUrl]}></Picture>
                  <Page>
                    <PrevIcon type='up' onClick={this.prev}/>
                    <NextIcon type='up' onClick={this.next}/>
                    <span>{curUrl+1}/{urlArr.length}</span>
                  </Page>
                </Body>
              </Container> : null
            }
            {
              text ?
              <Container>
                <Header>
                  <Title>{text}</Title>
                </Header>
                <Body>
                  <Picture src={config_service_url + url}></Picture>
                  <Explaination>
                    {detail}
                  </Explaination>
                </Body>
              </Container> : null
            }
          </PicShow> : null
        }
      </div>
    )
  }
}
const PicShow = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: transparent;
  box-shadow: 0px 0px 4px #6b6666;
  right: 0px;
  top: 0px;
  ${'' /* bottom: 0px; */}
  width: 426px;
  z-index: 4000;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  padding: 20px 0px;
  border: 1px solid rgba(153, 153, 153, 1);
`;
const Header = styled.div`
  margin-top: -20px;
  width: 100%;
  height: 47px;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #333333;
  text-align: left;
`;
const ClsoeIcon = styled(Icon)`
  width: 25px;
  height: 25px;
  margin-top: -20px;
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding: 0px 10px;
`;
const Picture = styled.img`
  width: 290px;
  height: 250px;
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0px;
  margin: 0px 20px;
`;
const PrevIcon = styled(Icon)`
  width: 40px;
  height: 40px;
`;
const NextIcon = PrevIcon.extend`
  transform: rotateZ(180deg);
`;
const Explaination = styled.div`
  padding-left: 10px;
  font-size: 13px;
  color: #333333;
`;
/*
@作者：姜中希
@日期：2018-06-28
@描述：望诊组件展示舌苔 舌质图片
*/
