/*
@作者：马奔
@日期：2018-10-25
@描述：处方授权模块
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import { Input,Checkbox,Button, Row, Col} from 'antd';
import StyButton from 'components/antd/style/button';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      checkedList: ['保健品'],
      indeterminate: true,
      checkAll: false,
      plainOptions:['基本药品 ', '保健品', '处方药品','精神类药品二类','皮试药品','注射类药品'],
      islook:this.props.islook, //控制操作还是展示
      id:this.props.id,//展示或者操作时候当前角色或用户的id
    };
  };
  componentWillMount(){
  };
  onChange=(checkedValues)=>{
  console.log('选中的值为', checkedValues);
  }
  render() {
    let{ plainOptions ,islook}  =this.state;
    let {defaultCheckedList} =this.state.checkedList;
    return(
      <Container>
        {islook==''?
          <Header>
            <span style={{color:'#000',margin:'0px 5px'}}>▶</span>
            <span style={{color:'#5d6ecb',cursor:'pointer'}} onClick={(e) => this.props.setuptype(1)}>角色设置</span>
            <span style={{color:'#000',margin:'0px 5px'}}> ＞ </span>
            <span>处方授权</span>
            <span style={{color:'#000',margin:'0px 10px'}}>(当前角色:<span style={{color:'#ff0000',margin:'0px 5px'}}>机构管理员</span>)</span>
            <Right>
             <span style={{width:'116px'}}>查询关键词：</span>
             <Search  placeholder="请输入角色编码或角色名称快速查询"  onSearch={value => console.log(value)}  enterButton/>
            </Right>
          </Header>
          :null}
      <Body>
        <LeftBox>
          <Top>• 药品限制权限（处方中禁止出现以下选中的药品品类）</Top>
          <Box>
              <CheckboxGroup style={{ width: '100%', }} onChange={this.onChange} >
               <Rows>
                 <Cols span={10}><Checkbox value="基本药品">基本药品</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="保健品">保健品</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="处方药品">处方药品</Checkbox></Cols>
               </Rows>
               <Rows>
                 <Cols span={10}><Checkbox value="毒麻药品">毒麻药品</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="抗菌药">抗菌药 </Checkbox></Cols>
                 <Cols span={10}><Checkbox value="精神类药品一类">精神类药品一类</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="精神类药品二类">精神类药品二类</Checkbox></Cols>
               </Rows>
               <Rows>
                 <Cols span={10}><Checkbox value="皮试药品">皮试药品</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="注射类药品">注射类药品</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="大输液药品">大输液药品</Checkbox></Cols>
               </Rows>
               <Rows className='lastlist'>
                 <Cols span={10}><Checkbox value="新药">新药</Checkbox></Cols>
                 <Cols span={10}><Checkbox value="贵重药品">贵重药品</Checkbox></Cols>
               </Rows>
             </CheckboxGroup>,
          </Box>
        </LeftBox>
        <RightBox>
        {islook==''?
          <Top>• 限制药品分类
            <Inputs/>
            <SureButton>+添加</SureButton>
        </Top>
        :<Top>• 限制药品分类</Top>}
        </RightBox>
      </Body>
      {islook==''?
        <Foot>
          <Total>全选</Total>
          <Total>全不选</Total>
          <BorderButton>保存授权</BorderButton>
          <CancelButton>返回</CancelButton>
        </Foot>
        :null}
      </Container>
    )
  }
}

const Container = styled.div `
  width:100%;
  overflow: hidden;
  height: calc(100vh - 50px);
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgb(242,242,242);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.349019607843137);
`;
const Right=styled.div`
  width: 460px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
`
const Body =styled.div`
  padding:20px;
  display:flex;
`
const LeftBox=styled.div`
 border:1px solid #ccc;
 width:49%;
 height:452px;
 margin-right:14px;
`
const RightBox =styled.div`
  border:1px solid #ccc;
  width:49%;
  height:452px;
`
const Top=styled.div`
  height:40px;
  border-bottom:1px solid #ccc;
  display:flex;
  align-items: center;
  font-size: 12px;
  color: rgb(101, 101, 101);
  padding-left:20px;
`
const Box =styled.div`
   width:100%;
   height:100%;
   padding:10px 30px 0px;
`
const Rows=styled(Row)`
   border-bottom:1px dashed #ccc;
   height:110px !important;
   &&&.lastlist{
     border:none !important;
   }
`
const Cols=styled(Col)`
  height:50% !important;
  display:flex !important;
  justify-content:flex-start;
  align-items:center;
`
const Inputs=styled(Input)`
  border:0 !important;
  border-bottom:1px solid #0a6ecb !important;
  width: 400px !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 0px !important;
  margin:0px 20px !important;

`
const SureButton = styled(Button)`
  width:62px !important;
  height:26px !important;
  padding:0 !important;
  ${StyButton.semicircle}
`;
const Foot =styled.div`
  height:70px;
  border-top:1px solid #0a6ecb;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  padding: 0px 20px;
`
const Total  =styled.span`
  width:42px;
  color: rgb(10, 110, 203);
  font-size: 12px;s
  height:16px;
  cursor:pointer;
`
const BorderButton = styled(Button)`
  width: 106px !important;
  height: 28px !important;
  ${StyButton.semicircle}
`;
const CancelButton = styled(Button)`
  ${StyButton.gray}
  width: 106px !important;
  height: 28px !important;
  border:1px solid #0a6ecb !important;
`;
