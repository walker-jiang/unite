/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏----辅助诊断
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import TagGroup from '../pubilcModule/tag.js';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        { title:"感冒 / 风寒袭表症" },
        { title:"感冒 / 风寒袭表症" },
        { title:"感冒 / 风寒袭表症" },
        { title:"感冒 / 风寒袭表症" },
      ],
      tagList:["头晕","恶心","流清鼻","浑身无力","发烧"],
      isCut:true,
    };
  };
  componentWillMount(){

  }

  render() {
    var { content, isCut, tagList } = this.state;
    return (
      <div class="rightAssistBar_template">
        <div class="tab">
          <Row>
            <Col span={4}>
              <Icon type="bars" onClick={()=>{ this.cut(true) }}/>
              <Icon type="bars" onClick={()=>{ this.cut(false) }}/>
            </Col>
            <Col span={20}>
              <Search
                placeholder="请输入模板名称或症状快速查询"
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
        </div>
        <div class="data">
          {
            content.map((item,index)=>{
              return(
                <div class="content">
                  <div class="content-title">
                    <Row>
                      <Col span={12}><p class="content-p">• {item.title}</p></Col>
                      <Col span={12}><p class="content-p-three">加入诊断</p></Col>
                    </Row>
                  </div>
                  <div class="content-detail">
                    <TagGroup tagList={tagList}/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
