/* ------------------------------------------------------------
    author : fuguolin
    create:2018-08-28
    descreption:tag
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Tag, Input, Tooltip, Icon, Row, Col } from 'antd';
import { browserHistory } from 'react-router';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { CheckableTag } = Tag;

class TagGroup extends React.Component {
  state = {
    tags: this.props.tagList,
  };
  componentWillReceiveProps(nextProps){
    console.log("nextProps=============",nextProps.tagList);
    this.setState({tags:nextProps.tagList})
  }
  randomColor = () =>{
    var colorList=['#FC6B94','#FC946B','#0099FF','#FF9900','#4AB41E','#FF6600','#1f9baa','#0080ff',]
    var value = Math.floor(Math.random()*8);
    return colorList[value];
    //return '#0099FF';
  }
  render() {
    const { tags, inputVisible, inputValue, checked } = this.state;
    return (
      <div class="tagList">
        <div>症状：</div>
        <Row>
        {
          tags.map((tag, index) => {
            console.log("tag@@@@@@@@@@@@",tag);
            return (
              <Col span={4} key={index} style={{textAlign:'center'}}>
                <div dangerouslySetInnerHTML = {{ __html:tag }}></div>
              </Col>
            )
          })
        }
        </Row>
      </div>
    );
  }
}
module.exports = TagGroup
