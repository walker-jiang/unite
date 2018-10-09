/* ------------------------------------------------------------
    author : fuguolin
    create:2017-09-05
    descreption:表单行提取
    ------------------------------------------------------------ */
import React,{ Component } from 'react'
import { Row, Col, Icon,Input,Form } from 'antd';
import './style/Form.less';
const FormItem = Form.Item;

class ColItem extends React.Component {
	render = () => {
	    const self = this;
			const { style } = this.props;
	    const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
			const formItemLayout2 = { labelCol: { span: 12 }, wrapperCol: { span: 12 } };
			const formItemLayout4 = { labelCol: { span: 0 }, wrapperCol: { span: 24 } };
			const publicCol = <p>
												<Col xs={24} sm={24} md={12} lg={8} xl={8}>
													<p className="ColItem">{self.props.LeftColName}</p>
													<FormItem {...formItemLayout}  >
															{self.props.LeftItem}
													</FormItem>


												</Col>
												<Col xs={24} sm={24} md={12} lg={8} xl={8}>
													<p className="ColItem">{self.props.middleColName}</p>
													<FormItem {...formItemLayout}  >
														{self.props.middleItem}
														{self.props.middleItemTow}
													</FormItem>
												</Col>
											</p>
			if(style == "1"){
				return (
		      <div>
		        <Row>
		          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
		            <FormItem {...formItemLayout} label={self.props.LeftColName}  >
		              {self.props.LeftItem}
		            </FormItem>
		          </Col>
		          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
		            <FormItem {...formItemLayout} label={self.props.rightColName}  >
		              {self.props.rightItem}
		            </FormItem>
		          </Col>
		        </Row>
					</div>
				);
			}else if(style == "2"){
				return (
		      <div>
		        <Row>
		          {publicCol}
							<Col xs={24} sm={24} md={12} lg={8} xl={8} style={{marginTop:-15}}>
								<p className="ColItem">{self.props.rightColName}</p>
		            <FormItem {...formItemLayout}  >
		              {self.props.rightItem}
		            </FormItem>
		          </Col>
		        </Row>
					</div>
				);
			}else if(style == "3"){
				return (
					<div>
						<Row>
							{publicCol}
							<Col xs={12} sm={12} md={8} lg={8} xl={8} style={{marginTop:-15}}>
								<p className="ColItem">{self.props.rightColName}</p>
								<FormItem {...formItemLayout}  >
								<Row>
									<Col span={12}>{self.props.rightItem}</Col>
									<Col span={12}>{self.props.rightItemTwo}</Col>
								</Row>
								</FormItem>
							</Col>
						</Row>
					</div>
				)
			}else if(style == "4"){
				return (
					<div>
						<Row>
							{publicCol}
							<Col xs={12} sm={12} md={8} lg={8} xl={8} style={{marginTop:-15}}>
								<p className="ColItem">{self.props.rightColName}</p>
								<Row>
									<Col span={4}>
										<FormItem {...formItemLayout4}>
											{self.props.rightItem}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem {...formItemLayout4}>
											{self.props.rightItemTwo}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem {...formItemLayout4}>
											{self.props.rightItemThree}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem {...formItemLayout4}>
											{self.props.rightItemFour}
										</FormItem>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
				)
			}else if(style == "5"){
				return (
					<div>
						<Row>
							<Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginLeft:-50,marginTop:-15,fontSize:12}}>
								<FormItem {...formItemLayout}  label={self.props.LeftColName} >
									{self.props.LeftItem}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={10} lg={10} xl={10} style={{marginTop:-15,fontSize:12}}>
								<FormItem {...formItemLayout}  label={self.props.rightColName} >
									{self.props.rightItem}
								</FormItem>
							</Col>
						</Row>
					</div>
				)
			}else if(style=="6"){
				return (
					<Row type="flex" justify="start">
						<Col xs={24} sm={24} md={12} lg={8} xl={8}>
							<FormItem {...formItemLayout} label={self.props.LeftColName} >
								{self.props.LeftItem}
							</FormItem>
						</Col>
						<Col xs={24} sm={24} md={12} lg={8} xl={8}>
							<FormItem {...formItemLayout} label={self.props.middleColName} >
								{self.props.middleItem}
							</FormItem>
						</Col>
						<Col xs={24} sm={24} md={12} lg={8} xl={8}>
							<FormItem {...formItemLayout} label={self.props.rightColName} >
								{self.props.rightItem}
							</FormItem>
						</Col>
					</Row>
				)
			}
		}
	}
module.exports = ColItem
