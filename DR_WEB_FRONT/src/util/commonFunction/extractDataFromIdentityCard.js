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
    sex = idCard.substr(14, 1) % 2 ? '01' : '02';
  }else if(idCard.length == 18){
    sex = idCard.substr(16,1) % 2 ? '01' : '02';
  }
  return sex;
};
/**
 * [getAgeFromBirthday 从生日中获取年龄]
 * @param  {[type]} birthday [生日， YYYYY-MM-DD]
 * @return {[type]}          [年龄]
 */
function getAgeFromBirthday(birthday){
  let date = new Date();
  let age = 0;
  if(birthday){
    age = date.getFullYear() - parseInt(birthday.substr(0,4)); // 通过年份获取生日
    if((date.getMonth() + 1) <= parseInt(birthday.substr(5,2))){ // 已经过了生日长一岁
      if((date.getMonth() + 1) == parseInt(birthday.substr(5,2))){ // 同一个月份比较日期
        if(date.getDate() <= parseInt(birthday.substr(8,2))){ // 同一个月份比较日期
          age++;
        }
      }else if((date.getMonth() + 1) < parseInt(birthday.substr(5,2))){ // 出生月份已过
        age++;
      }
    }
  }
  return age;
};

export default { getBirthdayFromIdCard, getAgeFromBirthday, getSexFromIdCard };
