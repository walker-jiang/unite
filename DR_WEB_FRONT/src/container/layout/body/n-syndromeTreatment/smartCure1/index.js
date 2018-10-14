import React, {Component, PropTypes} from 'react'; // react核心
import styled, { ThemeProvider } from 'styled-components';
import { Form, Radio, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import man from './man.png';
import demo from './demo.png';
import buttonSty from 'components/antd/style/button';
import ajaxGetResource from 'commonFunc/ajaxGetResource';

class Index extends Component {
  render() {
      const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 3 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 21 },
          sm: { span: 21 },
        },
       };
    return (
        <Container >
          <Left>
            <Photo>
              <Img src={man} />
            </Photo>
            <Info>
              <Label>患者姓名 :</Label>
              <Value>王雪飞</Value>
            </Info>
            <Info>
              <Label>性别 :</Label>
              <Value>男</Value>
            </Info>
            <Info>
              <Label>年龄 :</Label>
              <Value>38</Value>
            </Info>
            <Info>
              <Label>移动电话 :</Label>
              <Value>189****0000</Value>
            </Info>
            <Info>
              <Label>身份证号 :</Label>
              <Value>622**********6785</Value>
            </Info>
            <Info>
              <Label>医保类型 :</Label>
              <Value>自费患者</Value>
            </Info>
          </Left>
          <Body>
            <FormSpec>
              <Exsaple src={demo} />
            </FormSpec>
            <Checkbox>同步到患者诊断</Checkbox>
            <SureButton type="primary" htmlType="submit" onClick={() => {this.props.onStep(4)}}>完成</SureButton>
            <BorderButton type="primary" onClick={() => {this.props.onStep(2)}}>返回上一步</BorderButton>
          </Body>
        </Container>
    )
  }
}

const Container = styled.div`
  width:100%;
`;
const Left = styled.div`
  float: left;
  width: 200px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #227CD0;
  padding-top: 40px;
`;
const Photo = styled.div`
  width: 80px;
  height: 80px;
  background-color: #169BD5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
`;
const Info = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Label = styled.div`
  color: #333333;
`;
const Value = styled.div`
  margin-left: 5px;
  color: #16B4E7;
`;
const Body = styled.div`
  width: calc(100% - 426px);
  float: left;
  padding: 20px;
`;
const FormSpec = styled.div``;
const Exsaple = styled.img`
  width: 1002px;
`;
const Saving = styled.div`

`;
const BorderButton = styled(Button)`
  ${buttonSty.white}
  border: 1px solid rgba(10, 110, 203, 1) !important;
`;
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
/*
@作者：姜中希
@日期：2018-09-14
@描述：患者信息平铺单元格组件
*/
const IllCaseSure = Form.create()(Index);
export default IllCaseSure;
