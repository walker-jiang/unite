import moment from 'moment';
/**
 * [getBirthdayFromIdCard 从身份证号中提取本人生日]
 * @param  {[type]} idCard [description]
 * @return {[type]}        [生日]
 */
function getBirthdayFromIdCard(idCard) {
  var birthday = "";
  if(idCard != null && idCard != ""){
      if(idCard.length == 15){
          birthday = "19"+idCard.substr(6,6);
      } else if(idCard.length == 18){
          birthday = idCard.substr(6,8);
      }

      birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
  }
  return birthday;
}
/**
 * [getSexFromIdCard 从身份证号中获取性别]
 * @param  {[type]} idCard [身份证号]
 * @return {[type]}        [性别]
 */
function getSexFromIdCard(idCard){
  let sex = '';
  if(idCard.length == 15){
    sex = idCard.substr(14, 1) % 2 ? '1' : '2';
  }else if(idCard.length == 18){
    sex = idCard.substr(16,1) % 2 ? '1' : '2';
  }
  return sex;
};
/**
 * [getAgeFromBirthday 拿到初始到现在的日期]
 * @param  {[type]} birthday [生日 'YYYY-MM-DD']
 * @return {[type]}          [年龄 年/X月X日]
 */
function getAgeFromBirthday(birthday) {
  if(moment(birthday).isValid('YYYY-MM-DD')){
    let m1 = moment(moment().format('YYYY-MM-DD')),
        m2 = moment(moment(birthday, 'YYYY-MM-DD')),
        du = m1.diff(m2);
    if (du < 0) {
      console.log('生日格式错误');
      return '请输入正确的生日';
    }
    let year = moment.duration(du).years(),
      months = moment.duration(du).months(),
      days = moment.duration(du).days();
    let bird;
    if (year == 0) {
      if (months == 0) {
        bird = days + '天'
      } else if (days == 0) {
        bird = months + '月'
      } else if (months == 11 && days == 30) {
        bird = '1岁'
      } else {
        bird = months + '月' + days + '天'
      }
    } else {
      bird = year + '岁'
    }
    return bird
  }else{
    console.log('生日格式错误');
    return '0';
  }
}

export default { getBirthdayFromIdCard, getAgeFromBirthday, getSexFromIdCard };
