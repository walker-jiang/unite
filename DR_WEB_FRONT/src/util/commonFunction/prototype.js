export default (function(){
  /**
   * [为数组添根据某个标识删除数组元素的原型方法]
   * @param  {[type]} ID [唯一标识]
   * @return {[type]}    [description]
   */
  Array.prototype.remove = function(identity){
    let filteredArray = this.filter((item, index) => item[Object.keys(identity)[0]] != identity[Object.keys(identity)[0]]);
    return filteredArray;
  };
  /**
  * [Date对象添加格式化函数]
  * @param  {[type]} fmt [格式：yyyy-MM-dd、yyyy-MM-dd h:m:s]
  * @return {[type]}     [格式化后的日期]
  */
  Date.prototype.format = function(fmt){
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  };

})();
/**
* 作者：姜中希
* 日期：2018-08-24
* 描述：对某些对象添加原型属性（prototype）
*/
