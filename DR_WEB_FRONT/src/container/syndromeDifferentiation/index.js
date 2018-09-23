import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getResource from 'commonFunc/ajaxGetResource';
import { Switch, Route, HashRouter, BrowserRouter } from 'react-router-dom';
import InteligentTreat from '../layout/body/center/content/treatManage/treatment/drAdviceManage/InteligentTreat/index.js';
import ChHerbalMedicine from '../layout/body/center/content/treatManage/treatment/drAdviceManage/chHerbalMedicine/index.js'
import ChPatentMedicine from '../layout/body/center/content/treatManage/treatment/drAdviceManage/chPatentMedicine/index.js'
import SuitTechnology from '../layout/body/center/content/treatManage/treatment/drAdviceManage/suitTechnology/index.js'

export default class Index extends Component {

  componentDidMount () {
      let params = {
        type: 'GET',
        async : true,
        url: 'BuDiagnosisInfoController/getList',
        contentType: '',
        data:{
          registerid:window.registerID
        }
      };
      let that = this;
      function success(res){
        console.log('挂号****',res)
        that.setState({
          treatcode: res
        },function(){
          console.log('this.state.treatcode',this.state.treatcode)
          let t = this.state.treatcode;
          if(t != ""){
            this.inteligentTreat.handlePopOpen(t)
          } else {
            alert('d')
          }
        })
      };

      function error(res){
          console.log('获取挂号Id失败');
      };
      getResource(params, success, error);
  };

  // 中药弹框显示
  handleChHerbalMedClick = () => {
    this.chHerbalMedicine.handlePopOpen()
  };
  // 中药弹框关闭
  visiblePopHerbal () {
    this.chHerbalMedicine.handlePopClose()
  }

  // 中成药/西药弹框显示
  handleChPatentMedClick() {
    this.chPatentMedicine.handlePopOpen()
  };
  // 中成药/西药弹框关闭
  visiblePopPatent () {
    this.chPatentMedicine.handlePopClose()
  }

  // 中医适宜技术弹框显示
  handleSuitTechClick = () => {
    this.suitTechnology.handlePopOpen()
  }
  // 中医适宜技术弹框关闭
  visiblePopSuit () {
    this.suitTechnology.handlePopClose()
  }

  loadClick () {
    this.handleChHerbalMedClick()
  }

    render() {
      return (
        <div>
            <ChHerbalMedicine visiblePopHerbal = {this.visiblePopHerbal} wrappedComponentRef={ref => this.chHerbalMedicine = ref} />
            <ChPatentMedicine visiblePopPatent = {this.visiblePopPatent} wrappedComponentRef={ref => this.chPatentMedicine = ref} />
            <SuitTechnology visiblePopSuit={this.visiblePopSuit} wrappedComponentRef={ref => this.suitTechnology = ref} />
            <InteligentTreat loadClick={this.loadClick.bind(this)} ref={ref=>{this.inteligentTreat = ref}}/>
        </div>
      );
    }
  }
