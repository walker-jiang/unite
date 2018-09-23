import React, { Component } from 'react';
import { Menu, Pagination, Button } from 'antd';
import styled from 'styled-components';
import BasePop from 'components/popout/basePop';
import "./index.less";
import buttonSty from 'components/antd/style/button';

const SubMenu = Menu.SubMenu;

export default class PreviewPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblePop: false,  // 控制弹框显示隐藏
        };
    }

    // 弹框显示
    handlePopOpen (printData) {
        this.setState({
            visiblePop: true
        });
    };

    // 弹框关闭
    handlePopClose () {
        this.setState({
            visiblePop: false,
        });
    };

    //返回上一步
    handleBackClick () {
        this.handlePopClose();

    }

    //打印
    handlePrintClick () {

    }

    menuHandleClick = (e) => {
        // 左侧菜单栏
        //let key = e.key;
        console.log('e',e)
      }

    render() {
        let { visiblePop } = this.state;
    return (
        <div>
            <BasePop visible={visiblePop} title="打印预览-当前第1/8页" onClose={() => this.handlePopClose()}>
                <div style={styles.wrap}>
                    <div>打印预览：共8页</div>
                    <div className='printMenuDiv'>
                        <Menu
                        onClick={this.menuHandleClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        style={{ width: 128,height: '38rem' }}
                        className='printMenuStyle'
                        >
                            <Menu.Item className='printMenuItemStyle' key="1">检验1/2</Menu.Item>
                            <Menu.Item className='printMenuItemStyle' key="2">检验2/2</Menu.Item>
                            <Menu.Item className='printMenuItemStyle' key="3">检查1/1</Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <Pagination simple defaultCurrent={2} total={50} />
                    </div>
                </div>
                <div style={styles.footer}>
                    <SureButton type="primary" style={styles.bt} onClick={this.handleBackClick.bind(this)} >返回上一步</SureButton>
                    <SureButton type="primary" style={styles.bt} onClick={this.handlePrintClick.bind(this)} >打印</SureButton>
                    <CancelButton type="primary" style={styles.bt} onClick={this.handlePopClose.bind(this)} >取消</CancelButton>
                </div>
            </BasePop>
        </div>
        );
    }
}
const SureButton = styled(Button)`
  ${buttonSty.semicircle}
`;
const CancelButton = styled(Button)`
  ${buttonSty.white}
`;
const styles = {
    wrap: {
        width: '857px',
        height: '548px',
        overflow: 'hidden',
        padding: '10px'
    },
    footer: {
        width: '50%',
        position: 'absolute',
        marginLeft: '19rem',
        height: '56px',
        bottom: '0',
        // borderTop: '1px solid #E6E6E6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bt: {
        margin: 2
    },
}

/*
@王崇琨
@日期：2018-08-28
@描述：医嘱页面点击打印
*/
