import React, { Component } from 'react';
import { Tree } from 'antd';

import hTree from './hTree';

const TreeNode = Tree.TreeNode;
const HTree = hTree(Tree);

class TmpTree extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.dataList = [
        {
          title:"1",
          children:[
            {title:"1-1",children:[{title:"1-1-1"}]},
            {title:"1-2"},
            {title:"1-3"}
          ]
        },
        {
          title:"2",
          children:[
            {title:"2-1"},
            {title:"2-2"},
            {title:"2-3"}
          ]
        },
        {
            title:"3",
          children:[]
        }
      ]
    }

    hanleTreeSelect = (selectedKeys, e, item) => {
        console.log('selectedKeys', selectedKeys)
        console.log('treeData', item)
    }

    render() {
        return (
            <HTree onSelect={this.hanleTreeSelect} treeData={this.dataList} keyField={'title'} titleField={'title'} childField={'children'}></HTree>
        );
    }
}

export default TmpTree