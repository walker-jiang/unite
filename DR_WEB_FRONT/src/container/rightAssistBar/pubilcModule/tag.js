/* ------------------------------------------------------------
    author : fuguolin
    create:2018-08-28
    descreption:tag
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Tag, Input, Tooltip, Icon } from 'antd';
import { browserHistory } from 'react-router';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { CheckableTag } = Tag;

class TagGroup extends React.Component {
  state = {
    tags: this.props.tagList,
    checked: true
  };
  randomColor = () =>{
    var colorList=['#FC6B94','#FC946B','#0099FF','#FF9900','#4AB41E','#FF6600','#1f9baa','#0080ff',]
    var value = Math.floor(Math.random()*8);
    return colorList[value];
    //return '#0099FF';
  }
  handleChange = (checked) => {
    this.setState({ checked });
  }
  render() {
    const { tags, inputVisible, inputValue, checked } = this.state;
    return (
      <div class="tagList">
        <div>症状：</div>
        {
          tags.map((tag, index) => {
            return (
              <CheckableTag
                checked={checked}
                style={{borderRadius:50,marginBottom:15}}
                color={this.randomColor()}
                key={index+tag}
                onChange={this.handleChange}
              >
                {tag}
              </CheckableTag>
            )
          })
        }
      </div>
    );
  }
}
module.exports = TagGroup
