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

export default class SearchTree extends Component {
   onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    return (
      <Tree
        defaultExpandAll={true}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        <TreeNode title="我的模板" key="0-0">
          <TreeNode title="风热感冒" key="0-0-0">
            <TreeNode title="风热感冒" key="0-0-0-0" />
            <TreeNode title="风热感冒" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="公共模板" key="0-0-1">
            <TreeNode title="风热感冒" key="0-0-0">
              <TreeNode title="风热感冒" key="0-0-0-0" />
              <TreeNode title="风热感冒" key="0-0-0-1" />
            </TreeNode>
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}
