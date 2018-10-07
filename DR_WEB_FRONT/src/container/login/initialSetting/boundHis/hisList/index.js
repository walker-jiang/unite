import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import { withRouter } from 'react-router-dom';
import { Modal, Icon  } from 'antd';
import 'components/reactSlick/index.less';

class Index extends Component {
  constructor(props){
    super(props);
    this.handleBindClick = this.handleBindClick.bind(this);
  };
  // his系统绑定
  handleBindClick(value) {
    let sysid = this.props.sysid;
    if (sysid) {
      const modal = Modal.warning({
        title: '暂时不支持绑定多个HIS',
      });
      setTimeout(() => modal.destroy(), 1000);
      console.log("暂时不支持绑定多个HIS")
    }else{
      let newSysid = value.sysid;
      let newUnionId = value.sysid;
      this.props.history.push('/login/bindingHis/' + newSysid);
    }
  }
  render() {
    let {supportSysData, sysid} = this.props;
    let Arrow = (props) => { // 切换箭头
      const {currentSlide, slideCount, ...arrowProps} = props;
      const direction = (props.className == 'slick-arrow slick-next') ? 'right' : 'left';
      return <DirectIcon type={direction} {...arrowProps}/>;
    }
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />
    };
    // 空余的社区位置
    let leftSysData = new Array();
    if(supportSysData.length < 6){
      let len = 7 - supportSysData.length;
      for(let l = 0 ; l < len ; l++ ){
        leftSysData.push('无');
      }
    }
    return (
      <Container>
        <SliderCenter
        {...settings}>
        {
          supportSysData.map((value, index) => {
            return (
              <HisSystem key={value.sysid}>
                <HisName background = {colorData[index]}>{value.developer}社区HIS</HisName>
                {
                  value.sysid == sysid ?
                  <AlreadyBindBtn>
                    <AlreadyBindIcon type="check"/>
                    <i>已绑定</i>
                  </AlreadyBindBtn>
                  : <BindBtn onClick={()=>{this.handleBindClick(value)}} disabled>绑定</BindBtn>
                }
              </HisSystem>
            )
          })
        }
        {
          leftSysData.map((value, index) => {
            return (
              <HisSystem key={'left' + index}>
                <HisName>无</HisName>
              </HisSystem>
            )
          })
        }
        </SliderCenter>
      </Container>
    );
  }
}
const Container = styled.ul`
  width: 655px;
  height: 150px;
  float: left;
`;
const HisSystem = styled.li`
  float: left;
  margin: 0 6px;
  width: 100px !important;
  height: 150px;
  background: #fff;
  list-style: none;
`;
// 调整切换的元素位置在中间
const SliderCenter = styled(Slider)`
  .slick-list {
    margin-right: 6px;
  }
`;
const DirectIcon = styled(Icon)`
  &&& {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 150px;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
  }
  &&&.slick-prev:before{
    color: #33cc00;
    content: '\\E620';
  }
  &&&.slick-next:before{
    color: #33cc00;
    content: '\\E61F';
  }
`;
const HisName = styled.p`
  padding: 28px 15px 0 15px;
  width: 100px;
  height: 100px;
  border: 1px solid #ffffff;
  background: ${props=>props.background || 'rgba(228, 228, 228, 1)'};
  text-align: center;
  line-height: normal;
  font-size: 16px;
  color: #ffffff;
`;
const AlreadyBindBtn = styled.div`
  background: #33cc00;
  color: #fff;
  margin: 10px 5px;
  width: 90px;
  height: 30px;
  border-radius: 15px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
`;
const AlreadyBindIcon = styled(Icon)`
  font-weight: 900;
  font-size: 14px;
  margin-right: 5px;
  margin-top: 1px;
`;
const BindBtn = styled.div`
  margin: 10px 5px;
  width: 90px;
  height: 30px;
  border: 1px solid #33cc00;
  border-radius: 15px;
  background: #fff;
  font-size: 12px;
  color: #33cc00;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
`;
/*
@作者：姜中希
@日期：2018-08-06
@描述：绑定his系统展示
*/
export default withRouter(Index)
