import React, {Component} from 'react';
import Identify from "./identify";
import SelectionTestHistory from "./selectionTestHistory";
import False from "./false";
import GetQuestionList from "./getQuestionList";
import GetResult from "./getResult";
import TestCompleted from "./testCompleted";

export default class Mobile extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: '1',
      userId : '',
      name: '',
      sex: '',
      age: '',
      certificatesNumber: ''
    };
  };

  componentWillMount () {
    //记载页面时 根据后台二维码的参数 加载对应页面
    let first = window.first;
    let search= location.search || ''
    search=search.substring(1)
    let searchArr= search.split('&')
    let obj={}
    searchArr.forEach(element => {
      let arr=element.split('=')
      obj[arr[0]]=arr[1]
    });
    console.log('obj',obj)
    this.setState({
      visible: obj.first || '1',
      userId: obj.userId
    })
  }

  handleClick(pram){
     this.setState({
       visible: pram
     });
  };
  
  patientInformation(userId,name,sex,age,certificatesNumber){
    this.setState({
      userId : userId,
      name: name,
      sex: sex,
      age: age,
      certificatesNumber: certificatesNumber
    })
  }

  handleClickResult(){

  }
 
  render() {
    let {visible,userId,name,sex,age,certificatesNumber}  = this.state;
    let t  = null;
    if(visible == 1){
      t = <Identify onToggle={this.handleClick.bind(this)} patientInformation={this.patientInformation.bind(this)}/>
    } else if (visible == 2) {
      t = <False onToggle={this.handleClick.bind(this)} />
    } else if (visible == 3) {
      t = <SelectionTestHistory onToggle={this.handleClick.bind(this)} name={name}/>
    } else if (visible == 4) {
      t = <GetQuestionList onToggle={this.handleClick.bind(this)} userId={userId} sex={sex} />
    } else if (visible == 5){
      t = <GetResult onToggle={this.handleClick.bind(this)} userId={userId} />
    } else if (visible == 6){
      t = <TestCompleted onToggle={this.handleClick.bind(this)} handleClickResult={this.handleClickResult.bind(this)} />
    } 
    return (
      <div>
       {
        t
       }
      </div>
    );
  }
}
/*
@作者：王崇琨
@日期：2018-07-26
@描述：手机端-治未病容器
*/
