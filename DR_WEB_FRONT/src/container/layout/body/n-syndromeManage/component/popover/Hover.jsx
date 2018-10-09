import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { browserHistory } from 'react-router';
import { Menu, Icon, Switch,Popover,Button } from 'antd';

class Hover extends React.Component {

  render(){
    const styleC = this.props.change.Cstyle;
    const content = (
                      <div>
                        <p>{this.props.change.ever}</p>
                      </div>
                    );
    var normal = <div>
                  <a style={{color:'#333333'}}>{this.props.data}</a>
                 </div>;
    if (styleC == true) {
      normal = <Popover content={content} title="曾修改内容" trigger="hover" >
                <div style={{ border:'2px solid red',margin:5 }}>
                  <a style={{color:'#e67300'}}>{this.props.data}</a>
                </div>

               </Popover>;
    }

    return(
      <div>
        {normal}
      </div>
    );
  }
}

module.exports = Hover
