/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-21
    descreption:内嵌table
    ------------------------------------------------------------ */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Table, Icon, Switch, Radio, Form, Divider,Badge,Menu,Dropdown } from 'antd';
import { browserHistory } from 'react-router';
import { Dragact } from 'dragact'

class DragactIndex extends React.Component {
  state = {

  }
  render() {
    const fakeData = [
      { GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
      { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
      { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' },
      { GridX: 0, GridY: 0, w: 4, h: 2, key: '3' },
    ]

    const getblockStyle = isDragging => {
        return {
            background: isDragging ? '#1890ff' : 'white'
        }
    }

    return (
      <Dragact
          layout={fakeData} //必填项
          col={24} //必填项
          width={800} //必填项
          rowHeight={40} //必填项
          margin={[5, 5]} //必填项
          className="plant-layout" //必填项
          style={{ background: '#fffff',color:'#000000' }} //非必填项
          placeholder={true}
      >
          {(item, provided) => {
              return (
                  <div
                      {...provided.props}
                      {...provided.dragHandle}
                      style={{
                          ...provided.props.style,
                          ...getblockStyle(provided.isDragging)
                      }}
                  >
                      {provided.isDragging ? '正在抓取' : '停放'}
                  </div>
              )
          }}
      </Dragact>
    );
  }
}
module.exports = DragactIndex
