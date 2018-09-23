function Pagination(){
  this.simple = true;
  this.pageSize = pageSize;
  this.itemRender = (current, type, originalElement)=>{
      if (type === 'prev') {
        return <a>上页</a>;
      } if (type === 'next') {
        return <a>下页</a>;
      }if(type == 'page'){
        return <a className='test'>{current}</a>
      }
      return originalElement;
    }
};
export default Pagination;
