import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function hTree(Tree) {
    if(!Tree.TreeNode) {
        console.log('tree中需要treeNode')
        return;
    }
    const TreeNode = Tree.TreeNode;

    return class HTree extends Component {

        static propTypes = {
            treeData: PropTypes.array,
            onSelect: PropTypes.func,
            titleField: PropTypes.string.isRequired,
            keyField: PropTypes.string.isRequired,
            childField: PropTypes.string.isRequired
        }

        static defaultProps = {
            treeData: []
        }

        constructor(props) {
            super(props)
        }

        //代理onSelect(点击树节点触发)的方法，使得Tree组件可以与数据关联
        //function(selectedKeys, e:{selected: bool, selectedNodes, node, event})
        _select = (selectedKeys, e) => {
            const { onSelect } = this.props;
            if(onSelect) {
                onSelect(selectedKeys, e, e.node.props['dataRef']);
            }
        }

        _renderTreeNodes = (data) => {
            const { keyField, titleField, childField } = this.props;
            return data.map((item) => {
                if (item[childField]) {
                    return (
                        <TreeNode title={item[titleField]} key={item[keyField]} dataRef={item}>
                            {this._renderTreeNodes(item[childField])}
                        </TreeNode>
                    );
                }
                return <TreeNode title={item[titleField]} key={item[keyField]} dataRef={item} />;
            });
        }

        render() {
            const { treeData, ...other } = this.props;
            return (<Tree {...other} onSelect={this._select}>
                {this._renderTreeNodes(treeData)}
            </Tree>)
        }
    }
}

/*
@作者：杨腊梅
@日期：2018-10-22
@描述：树多层可渲染组件
*/