import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Popout from 'components/popout/basePop';
import { Button } from 'antd';
import buttonSty from 'components/antd/style/button';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    };
  };
  /** [handleClose 关闭本弹框] */
  handleClose(){ // 关闭本弹框
    this.setState({visible: false});
  };
  /** [handleOpen 打开本弹框] */
  handleOpen(){
    this.setState({visible: true});
  };
  render() {
    let { visible } =  this.state;
    return (
      <div>
        <Popout visible={visible} title='系统提示' onClose={()=>{this.handleClose()}}>
          <Body>
            <Tip>
              <Search>
                ⚙
              </Search>
              <span>初始设置还未全部完成，确认取消后将会退出当前登录，确认取消吗？
              </span>
            </Tip>
            <div>
              <Link to="/">
                <SureButton type="primary">确定取消</SureButton>
              </Link>
              <CancelButton type="primary" onClick={()=>{this.handleClose()}}>返回</CancelButton>
            </div>
          </Body>
        </Popout>
      </div>
    );
  }
}
const Body = styled.div`
  background-color: #F2F2F2;
  width: 510px;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
`;
const Tip = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  font-size: 16px;
  font-weight: 400
  color: black;
`;
const Search = styled.span`
  font-size: 50px;
  margin-right: 20px;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
  width: 130px;
`;
const CancelButton= styled(Button)`
  ${buttonSty.white};
  width: 120px;
`;
/*
@作者：姜中希
@日期：2018-08-08
@描述：未完成初始化提示
*/
