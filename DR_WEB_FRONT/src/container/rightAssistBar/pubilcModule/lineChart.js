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
    tags: this.props.tagList,
    checked: true
  };
  componentDidMount(){
    var data = [{
      year: '8.1',
      value: 3
    }, {
      year: '8.8',
      value: 4
    }, {
      year: '9.2',
      value: 3.5
    }, {
      year: '9.9',
      value: 5
    }, {
      year: '9.15',
      value: 4.9
    }, {
      year: '就诊日期',
    }];
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
    chart.render();
  }
  render() {
    const { tags, inputVisible, inputValue, checked } = this.state;
    return (
      <div id="mountNode" style={{marginLeft:-50}}></div>
    );
  }
}
module.exports = TagGroup
