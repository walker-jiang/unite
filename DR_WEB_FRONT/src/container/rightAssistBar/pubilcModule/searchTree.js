/*
@作者：fuguolin
@日期：2018-09-12
@描述：右侧辅助栏
*/
import React, {Component} from 'react';
import { Tree, Input } from 'antd';
//import './style/rightAssistBar.less';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import zanwunerong from '../doctorAdvice/style/zanwunerong.png';

export default class SearchTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue:"",
      dataSource:this.props.dataSource
    }
  };
  componentWillReceiveProps(nextProps){
    console.log("nextProps===",nextProps);
    this.setState({ dataSource:nextProps.dataSource,searchValue:nextProps.searchValue });
  }
  onSelect = (selectedKeys, info) => {
    console.log('当前选中的值为', selectedKeys);
    console.log('selectedKeys.length != 0', selectedKeys.length != 0);
    if(selectedKeys.length != 0){
      this.props.TreeChangeInitData(selectedKeys[0]);
    }
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    var { dataSource, searchValue } = this.state;
    console.log("dataSource===",typeof(dataSource) == "undefined");
    return (
      <div>
        {
          typeof(dataSource) == "undefined"
          ?
          <center style={{marginTop:50}}><img src={zanwunerong}/><br/>暂无数据，请重新搜索</center>
          :
          <Tree
            defaultExpandAll={true}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            <TreeNode title="我的模板" key="0">
              {
                dataSource.map((item,index)=>{
                  return(
                    <TreeNode title={item.temname} key={item.temmanageid}>
                      {
                        item.buTempletManageList.length == 0
                        ?
                        null
                        :
                        item.buTempletManageList.map((j,k)=>{
                          return(
                            <TreeNode title={<p style={{color:searchValue == j.temname?"blue":"#333333"}}>{j.temname}</p>} key={j.temmanageid}/>
                          )
                        })
                      }
                    </TreeNode>
                  )
                })
              }
            </TreeNode>
          </Tree>
        }
      </div>
    );
  }
}
// <TreeNode title="我的模板" key="0-0">
//   <TreeNode title="风热感冒" key="0-0-0">
//     <TreeNode title="金银花主方" key="0-0-0-0" />
//     <TreeNode title="薄荷片主方" key="0-0-0-1" />
//   </TreeNode>
//   <TreeNode title="公共模板" key="0-0-1">
//     <TreeNode title="风热感冒" key="0-0-0">
//       <TreeNode title="金银花主方" key="1-0-0-0" />
//       <TreeNode title="薄荷片主方" key="1-0-0-1" />
//     </TreeNode>
//   </TreeNode>
// </TreeNode>
