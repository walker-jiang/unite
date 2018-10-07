let date = new Date(); // 获取扩展了日期格式化函数的日期对象
let timestamp =Date.parse(date); // 获取当前时间戳
date.setTime(timestamp); // 将指定的时间戳写入日期对象

// let today = date.format('yyyy-MM-dd'); // 时间戳格式化 年-月-日
let today = '2018-09-29';
let now = date.format('yyyy-MM-dd h:m:s'); // 时间戳格式化 年-月-日 时:分:秒
let time = date.format('h:m:s'); // 时间戳格式化 时:分:秒
export { today, now, time };
/**
 * 系统的一些默认值数据
 */
