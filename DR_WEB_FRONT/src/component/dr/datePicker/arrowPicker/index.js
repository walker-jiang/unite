import React, {Component} from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import { today } from 'commonFunc/defaultData';
import Icon from 'components/dr/icon';
import 'moment/locale/zh-cn';
import calendar from '-!file-loader!components/dr/icon/icons/calendar.svg';

export default class DateSelector extends Component {
  constructor(props){
    super(props);
    this.state = {
      dateValue: today
    };
    this.changeDate = this.changeDate.bind(this);
  };
  changeDate(moment){
    this.setState({
      dateValue: moment.format('YYYY-MM-DD')
    });
  };
  changeYear(type){
    let dateValue = this.state.dateValue;
    let year =  dateValue.substring(0,4);
    if(type == 'prev'){
      year = year - 1;
    }else if(type == 'next'){
      year = year - 1 + 2;
    }
    dateValue = year + '' + dateValue.substring(4, dateValue.length);
    this.setState({dateValue});
  };
  render() {
    let dateValue = this.state.dateValue;
    console.log('dateValue', dateValue);
    return (
      <Container >
        <LeftArrow onClick={() => this.changeYear('prev')}>
          <Icon type='left' width='20px' height='20px' ></Icon>
        </LeftArrow>
        <Date id='picker'>
          <SpecDatePicker
            defaultValue={moment(today, 'YYYY-MM-DD')}
            value={moment(dateValue, 'YYYY-MM-DD')}
            allowClear={false}
            onChange={this.changeDate}
            format='YYYY-MM-DD'
          />
        </Date>
        <RightArrow onClick={() => this.changeYear('next')}>
          <Icon type='right' width='20px' height='20px'></Icon>
        </RightArrow>
      </Container>
    );
  }
}
const Container = styled.div`
  background-color: #FFFFFF;
  height: 28px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #E9E9E9;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
`;
const LeftArrow = styled.div`
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 28px;
  height: 100%;
  border-right: 1px solid #E9E9E9;
  background-color: #F9F9F9;
`;
const RightArrow = styled.div`
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 28px;
  height: 100%;
  border-left: 1px solid #E9E9E9;
  background-color: #F9F9F9;
`;
const Date = styled.div`
  padding: 5px;
  width: 120px;
`;
const SpecDatePicker = styled(DatePicker)`
  & > div > input {
    background-color: transparent;
    padding: 4px 3px;
    padding-right: 0px;
    border: none;
  }
  .ant-calendar-picker-icon {
    color: rgba(0, 0, 0, 0.25);
    display: block;
    height: 28px;
    width: 25px;
    border-left: 1px solid #E9E9E9;
    right: -5px;
    top: 0px;
    margin-top: 2px;
    background-image: url(${calendar});
    background-repeat: no-repeat;
    background-size: 16px 16px;
    background-position: center;
  }
  .ant-calendar-picker-icon::after {
    content: '';
  }
  & > div > input:hover {
    border: none;
    background-color: transparent;
  }
`;
/*
@作者：姜中希
@日期：2018-06-26
@描述：日期选择框， 圆形边框，右侧查询按钮
*/
