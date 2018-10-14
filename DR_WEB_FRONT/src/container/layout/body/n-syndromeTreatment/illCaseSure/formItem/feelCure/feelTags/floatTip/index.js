import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: this.props.details
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      details: nextProps.details
    })
  }
  render() {
    let { details } = this.state
    let pulseCondition = this.props.pulseCondition;
    return (
      <Container pulseCondition={pulseCondition}>
        <Colsed onClick={this.props.onClose}>
          <Icon type="close" />
        </Colsed>
        <Box dangerouslySetInnerHTML={{ __html:details}}></Box>
        <Spantext>• 查看详细介绍 &lt;&lt;</Spantext>
      </Container>
    )
  }
}
const Container = styled.div`
 display: ${props => (props.pulseCondition ? 'block' : 'none')}
  width: 426px;
  height: calc(100% - 120px);
  border: 1px solid rgba(204, 204, 204, 1);
  position: fixed;
  top: 90px;
  right: 0px;
  background-color: white;
  z-index: 999;
  padding: 20px;
`
const Box = styled.div`
  margin-top: 10px;
`
const Spantext = styled.span`
  color: skyblue;
`
const Colsed = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
`

/*
@作者: 马奔
@日期：2018-09-29
@描述：脉象右侧浮层提示框
*/
