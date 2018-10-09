import React from 'react'; // 引入了React和PropTypes
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const RangePicker = DatePicker.RangePicker;
var startData,endData = "";
var DatePickerIndex = ({...props})=>{
  var onChange = (dates, dateStrings) => {
    if(props.style){
      props.getData(props.style,dateStrings[0],dateStrings[1]);
    }else{
      props.getData(props.style,dateStrings);
    }
  }
  console.log("props.style = "+props.style)
  if(props.style){
    return (
      <div>
        <RangePicker
          defaultValue={[moment('2015-01-01', 'YYYY-MM-DD')]}
          ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
          onChange={onChange}
        />
      </div>
    )
  }else{
    return (
      <div>
        <DatePicker onChange={onChange} />
      </div>
    )
  }

}
export { DatePickerIndex };
