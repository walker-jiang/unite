/* ------------------------------------------------------------
    author : fuguolin
    create:2017-09-28
    descreption:该页面所有数据项以后都要改成从后台服务获取！！！！！！！！！！！！！！
    ------------------------------------------------------------ */
import React from 'react' ;  // user react render
import { Select } from 'antd';
import Config from '../Config/index';
const Option = Select.Option;
var Data =[];
Data.permissionLevel  =[
  //<Option key="1" value={1}>管理员权限</Option>,
  <Option key="2" value={2}>组长权限</Option>,
  <Option key="3" value={3}>浏览权限</Option>
];
Data.menuList = [
  {
    'key': 'InformationList',
    'to':'InformationList',
    'icon':'laptop',
    'name': '一级菜单1111',
    'children':[
      { 'key': 'InformationList2', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单1'},
      { 'key': 'InformationList3', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单2'}
    ]
  },
  {
    'key': 'InformationList11',
    'to':'InformationList11',
    'icon':'laptop',
    'name': '一级菜单2222',
    'children':[
      { 'key': 'InformationList1111', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单1'},
      { 'key': 'InformationList1112', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单2'},
      { 'key': 'InformationList1113', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单3'}
    ]
  },
  {
    'key': 'InformationList331',
    'to':'InformationList11',
    'icon':'laptop',
    'name': '一级菜单3333',
    'children':[
      {
        'key': 'InformationList33',
        'to':'InformationList11',
        'icon':'laptop',
        'name': '二级菜单333',
        'children':[
          { 'key': 'InformationList2-1', 'to':'InformationList', 'icon':'laptop', 'name': '三级菜单1'},
          { 'key': 'InformationList2-2', 'to':'InformationList', 'icon':'laptop', 'name': '三级菜单2'},
          { 'key': 'InformationList2-3', 'to':'InformationList', 'icon':'laptop', 'name': '三级菜单3'}
        ]
      }
    ]
  },
]

module.exports = Data;
