import { Modal, notification, Button } from 'antd';
const Simulation = {};//，启动模拟数据


Simulation.GetDataDetail = () => {
  console.log("测试账号登陆，启动模拟数据=================");
  notification['info']({
    message: '提示',
    description: '功能为模拟数据！',
    duration: 1
  });
  var QueryTypeData ={
    result:true,
    data:{
      objectList:[
        {fieldid:"1",byname:"首批国医大师",favoritedesc:"首批国医大师"},
        {fieldid:"2",byname:"首批国医大师",favoritedesc:"首批国医大师"},
        {fieldid:"3",byname:"首批国医大师",favoritedesc:"首批国医大师"},
      ]
    }
  }
  return QueryTypeData;
};

export { Simulation };
