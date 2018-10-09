import Xhr from './xhr/index';
import Config from '../Config/index';
import {hashHistory} from 'react-router';
import {Message} from 'antd';
import {Simulation} from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class HomeService {

    /**
     * 获取字典表
     * @return {分类信息}
     */
    QueryData() {
        if (Config.testData) {
            return Simulation.QueryData();
        } else {
            var res = Xhr.post('/DictController/queryData', {}, false);
            if (res.result) {
                localStorage.setItem("dictionarieData", JSON.stringify(res.data.tzDictList));
            } else {
                Message.error('查询出错');
            }
        }
    }
    /**
     * 获取字典值
     * @return {分类信息}
     */
    QueryDataByCode(params) {
        if (Config.testData) {
            return Simulation.QueryDataByCode();
        } else {
            var res = Xhr.post('/DictController/queryDataByCode', params, false);
            if (res.result) {
                return res;
            } else {
                Message.error('查询出错');
            }
        }
    }

    /**
     * 推荐搜索
     * @return {分类信息}
     */
    Recommend() {
        if (Config.testData) {
            return [
                {
                    name: "脑出血",
                    value: "脑出血"
                }, {
                    name: "抑郁症",
                    value: "脑出血"
                }
            ];
        } else {
            var res = Xhr.post('/sysNavigationController/query/index', {}, false);
            if (res.result) {
                return res;
            } else {
                Message.error('查询出错');
            }
        }
    }
    /**
     * 获取分类表
     * @return {分类信息}
     */
    GetTabPaneData(params) {
        if (Config.testData) {
            return Simulation.GetTabPaneData();
        } else {
            var res = Xhr.post('/NavigationController/queryDataFirstByType', params, false);
            if (res.result) {
                if (res.data.tzNavigationList.length != 0) {
                    var TabPaneData = [];
                    res.data.tzNavigationList.forEach((item, index) => {
                        var obj = {};
                        obj['name'] = item.navigationname;
                        obj['value'] = item.navigationname;
                        var grandson = this.QueryDataDetail({"fieldid": item.fieldid});
                        console.log("grandson=======", grandson);
                        var childrenData = [];
                        if (grandson.data.tzNavigationList == 0) {
                            //说明没有下级导航
                            obj['type'] = 0;
                            grandson.data.tzNavigationDetailList.forEach((j, k) => {
                                var tzNavigationDetailObj = {};
                                tzNavigationDetailObj['name'] = j.keyword;
                                tzNavigationDetailObj['value'] = j.navigationid;
                                childrenData.push(tzNavigationDetailObj);
                            })
                        } else {
                            //说明有下级导航
                            obj['type'] = 1;
                            grandson.data.tzNavigationList.forEach((j, k) => {
                                console.log("grandson.data.tzNavigationList", j);
                                var childrenDataObj = {};
                                childrenDataObj['childrenName'] = j.navigationname;
                                var threeMenu = [];
                                j.tzNavigationDetailList.forEach((a, b) => {
                                    var oneObj = {};
                                    oneObj['name'] = a.keyword;
                                    oneObj['value'] = a.navigationid;
                                    threeMenu.push(oneObj);
                                })
                                childrenDataObj['grandson'] = threeMenu;
                                childrenData.push(childrenDataObj);
                            })
                        }
                        obj['childrenData'] = childrenData;
                        TabPaneData.push(obj);
                    })
                    console.log("================", TabPaneData);
                    return TabPaneData;
                }
            } else {
                Message.error('查询出错');
            }
        }
    }

    /**
     * 获取分类表内容
     * @return {分类信息}
     */
    QueryDataDetail(params) {
        if (Config.testData) {
            return Simulation.GetTabPaneData();
        } else {
            var res = Xhr.post('/NavigationController/queryDataDetail', params, false);
            if (res.result) {
                return res;
            } else {
                Message.error('查询出错');
            }
        }
    }

    /**
     * 医生等级下拉框
     * @return {分类信息}
     */
    GetQueryType(params) {
        if (Config.testData) {
            return Simulation.GetQueryType();
        } else {
            var res = Xhr.post('xxxx', params, false);
            if (res.result) {
                return res;
            } else {
                Message.error('查询出错');
            }
        }
    }
}

// 实例化再导出
export default new HomeService();
