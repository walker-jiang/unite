/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Icon, Row, Col, Button, Input, Tabs, Divider, Select, Menu, Dropdown, Alert, Modal } from 'antd';
import './style/rightAssistBar.less';
import SearchTree from '../pubilcModule/searchTree.js';
import ContentDetail from '../pubilcModule/contentDetail.js';
const Search = Input.Search;

export default class template extends Component {
  constructor(props){
    super(props);
    this.state = {
      content:[
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
        {
          title:"风寒感冒-风寒侵袭证诊疗模板",
          one:"头晕、发烧、头痛、四肢无力、流清鼻涕、嗓子疼、浑身发冷、四肢无力、流清鼻涕、嗓子疼、浑身发冷",
          two:"舌苔（薄）；舌质（白）",
          three:"左（浮、紧）；右（浮、紧）",
          four:"扁桃体肿大",
          five:"风寒侵袭症",
          six:"风寒侵袭症XXXXXX",
          seven:"风寒侵袭症XXXXXXXXXXXXXXXXXXX",
        },
      ],
      isCut:true,
      unfold:false
    };
  };
  componentWillMount(){

  }
  cut = (isCut) =>{
    console.log("isCut",isCut);
    this.setState({isCut})
  }
  unfold = (unfold) =>{
    this.setState({unfold:!unfold});
  }
  render() {
    var { content, isCut, unfold } = this.state;
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
            isCut
            ?
            content.map((item,index)=>{
              return(
                <div class="content">
                  <div class="content-title">
                    <Row>
                      <Col span={12}><p class="content-p">{item.title}</p></Col>
                      <Col span={4}><p class="content-p-two">• 院方模板</p></Col>
                      <Col span={8}>
                        <Button>引入模板</Button>
                        <Divider type="vertical" />
                      </Col>
                    </Row>
                  </div>
                  <ContentDetail item={item} unfold={unfold}/>
                </div>
              )
            })
            :
            <div><SearchTree/></div>
          }
        </div>
      </div>
    );
  }
}
