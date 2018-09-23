/**
 * [copy 通过递归实现对象深克隆的方法]
 * @param  {[type]} aObject [原对象]
 * @return {[type]}         [克隆后的对象]
 */
function copy(aObject) {
  if (!aObject) {
    return aObject;
  }

  var bObject, v, k;
  bObject = Array.isArray(aObject) ? [] : {};
  for (k in aObject) {
    v = aObject[k];
    bObject[k] = (typeof v === "object") ? copy(v) : v;
  }
  return bObject;
}
export default copy;
