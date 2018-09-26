/* ------------------------------------------------------------
    author : fuguolin
    create:2018-08-28
    descreption:tag
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Tag, Input, Tooltip, Icon } from 'antd';
import G2 from '@antv/g2';
import { browserHistory } from 'react-router';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { CheckableTag } = Tag;

class TagGroup extends React.Component {
  state = {
    dataSource: this.props.dataSource,
    checked: true
  };
  //componentWillReceiveProps
  componentDidMount(){
    var data = [];
    this.props.dataSource.forEach((item,index)=>{
      data.push({
        year:item.utstamp.substr(5,5),
        value:item.trfeedsorce
      })
    })
    data.push({year: '就诊日期'});
    console.log("data=============",data);
    var chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 310,
      width:160,
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    // chart.scale('year', {
    //   range: [0, 1]
    // });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    //repaint
    chart.render();
  }
  // componentDidMount(){
  //
  // }
  render() {
    const { inputVisible, inputValue, checked } = this.state;
    return (
      <div id="mountNode" style={{marginLeft:-50}}></div>
    );
  }
}
module.exports = TagGroup
