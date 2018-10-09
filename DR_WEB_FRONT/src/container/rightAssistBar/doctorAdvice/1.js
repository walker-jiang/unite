    var content =[
              {
                //诊断
                "buDiagnosisInfo": {
                  "buDiagnosisList": [
                    {
                      "buDiagnosisDismainfList": [
                        {
                          "ctstamp": "2018-09-26T06:33:21.434Z",
                          "diagnosisid": 0,
                          "diseaseid": 0,
                          "id": 0,
                          "manifcode": "string",
                          "manifdesc": "string",
                          "manifid": 0,
                          "manifname": "string",
                          "registerid": 0,
                          "useflag": "string",
                          "utstamp": "2018-09-26T06:33:21.434Z"
                        }
                      ],
                      "cmDiagnosisType": 0,
                      "codetype": "string",
                      "ctstamp": "2018-09-26T06:33:21.434Z",
                      "diacode": "string",
                      "diadesc": "string",
                      "diagnosisCode": "string",
                      "diagnosisName": "string",
                      "diagnosisNo": 0,
                      "diagnosisType": 0,
                      "diagnosisWay": 0,
                      "diagnosisid": 0,
                      "diaid": 0,
                      "dianame": "string",
                      "discode": "string",
                      "disdesc": "string",
                      "diseaseid": 0,
                      "disname": "string",
                      "doubtDiaType": "string",
                      "mainDiaType": "string",
                      "registerid": 0,
                      "seqno": 0,
                      "useflag": "string",
                      "utstamp": "2018-09-26T06:33:21.434Z"
                    }
                  ],
                  "cardno": "string",
                  "ctstamp": "2018-09-26T06:33:21.434Z",
                  "deptid": 0,
                  "diagnosisDesc": "小儿感冒/风寒感冒",
                  "doctorid": 0,
                  "doctorname": "付国霖",
                  "id": 0,
                  "orgid": 0,
                  "patientid": 0,
                  "patientname": "string",
                  "patientno": "string",
                  "registerid": 0,
                  "registerno": "string",
                  "useflag": "string",
                  "utstamp": "2018-09-26T06:33:21.434Z"
                },
                //非组套
                "buOrderDtlList": [
                    {
                        "baseUnit": "01",//基准单位（最小单位）
                        "conversion": "01",//换算率
                        "count": 0,//数量
                        "deptid": 0,//执行科室id
                        "deptname": "01",//执行科室
                        "dosage": "01",//单次用量
                        "doseid": 0,//剂型ID
                        "dosename": "01",//剂型
                        "feeout": 0,//医保外总金额
                        "feesum": 0,//项目金额
                        "feesumType": "01",//收费类别
                        "feesumin": 0,//医保内总金额
                        "freqid": 0,//频次ID
                        "freqname": "01",//频次
                        "hiscode": "01",//HIS项目代码
                        "hisname": "01",//HIS项目名称
                        "itemcode": "01",//项目编码
                        "itemid": 0,//项目唯一标识
                        "itemname": "01",//项目名称
                        "itemno": 0,//项目序号
                        "itemtype": 0,//项目类别
                        "miType": "1",//医保类型（0-医保外1-医保内）
                        "packageUnit": 0,//最小包装单位
                        "packaging": "01",//包装单位
                        "paytype": "01",//支付状态
                        "preferentialfee": 0,//社区优惠金额
                        "preferentialscale": 0,//社区优惠比例
                        "recipeno": "01",//处方序号
                        "remarks": "01",//备注
                        "spbody": "要命4项",//检查项目/送检物/治疗部位
                        "specification": "01",
                        "takedays": 0,//用药天数
                        "uniqueid": 0,//唯一id
                        "unitprice": 0,//单价
                        "usageid": 0,//用法ID
                        "usagename": "01"//用法
                    }
                ],
                //组套
                "buOrdmedical": {
                    "aim": "01",//医疗服务目标
                    //医疗服务医嘱组套集合
                    "buOrdmedicalSuitList": [
                        {
                            "baseUnit": "01",//单位
                            //医嘱明细记录(组套信息下的医嘱明细)
                            "buOrderDtlList": [
                                {
                                    "baseUnit": "01",//基准单位（最小单位）
                                    "conversion": "01",//换算率
                                    "count": 0,//数量
                                    "deptid": 0,
                                    "deptname": "01",
                                    "dosage": "01",//单次用量
                                    "doseid": 0,//剂型ID
                                    "dosename": "01",//剂型名称
                                    "feeout": 0,//医保外总金额
                                    "feesum": 0,//项目金额
                                    "feesumType": "01",//收费类别
                                    "feesumin": 0,//医保内总金额
                                    "freqid": 0,//频次ID
                                    "freqname": "01",//频次
                                    "hiscode": "01",//HIS项目代码（医疗服务或药品）
                                    "hisname": "01",//HIS项目名称（医疗服务或药品）
                                    "itemcode": "01",//项目编码（医疗服务或药品）
                                    "itemid": 0,//项目唯一标识
                                    "itemname": "01",//项目唯一标识
                                    "itemno": 0,//项目序号
                                    "itemtype": 0,//项目类别
                                    "miType": "1",//医保类型（0-医保外1-医保内）
                                    "packageUnit": 0,//最小包装单位
                                    "packaging": "01",//包装单位
                                    "paytype": "01",//支付状态
                                    "preferentialfee": 0,//社区优惠金额
                                    "preferentialscale": 0,//社区优惠比例
                                    "recipeno": "01",//处方流水号(显示在缴费单上)
                                    "remarks": "01",//备注
                                    "spbody": "01",//检查项目/送检物/治疗部位
                                    "specification": "01",//规格
                                    "takedays": 0,//用药天数
                                    "uniqueid": 0,//唯一id，unique id
                                    "unitprice": 0,//单价
                                    "usageid": 0,//用法ID
                                    "usagename": "01"//用法
                                }
                            ],
                            "count": 0,//数量
                            "feesum": 0,//价格
                            "orderSuitcode": "01",//医嘱套编码
                            "orderSuitid": 0,//医嘱套ID
                            "orderSuitname": "肝功四项",//医嘱套名称
                            "ordmedicalid": 0,//医疗服务类医嘱唯一标识
                            "seqno": 0,//顺序号
                            "specification": "01"//规格
                        }
                    ],
                    "deptcode": "01",//就诊科别代码
                    "deptname": "01",//就诊科别名称
                    "diagnosecode": "01",//诊断编码
                    "diagnosename": "01",//诊断名称
                    "diagnoseno": "01",//医嘱订单ID
                    "doctorid": "01",//医师编码
                    "doctorname": "01",//医师名称
                    "drlevel": "01",//医师职称
                    "hissectionname": "01",//本院科别名称
                    "medicalrecord": "01",//病历信息
                    "orgid": 0,//机构编码
                    "remarks": "01",//备注
                    "seqno": 0,//顺序号
                    "miType": "1",//医保类型（0-医保外1-医保内）
                },
                //医嘱处方（中草药，中成药含有此对象）
                "buRecipe": {
                    "deptcode": "01",//就诊科别代码
                    "deptname": "01",//就诊科别名称
                    "diagnosecode": "01",//诊断编码
                    "diagnosename": "01",//诊断名称
                    "diagnoseno": "01",//诊断序号
                    "doctorid": "01",//医师编码
                    "doctorname": "01",//医师姓名
                    "doseid": 0,//剂型ID
                    "dosename": "01",//剂型
                    "drlevel": "01",//医师职称
                    "freqid": 0,//频次ID
                    "freqname": "01",//频次
                    "hissectionname": "01",//本院科别名称
                    "medicalrecord": "01",//病历信息
                    "personid": "01",//病人ID
                    "recipedate": "2018-07-12T09:34:36.942Z",//处方日期
                    "recipeno": "01",//处方流水号(显示在缴费单上)
                    "recipetype": "01",//处方类别（1：工伤内处方 2：工伤外处方）
                    "registerid": 2,//挂号id
                    "remark": "01",//备注
                    "usageid": 0,//用法ID
                    "usagename": "01"//用法
                },
                "execDepaid": 0,//执行科室
                "feeall": 0,//总费用
                "ordercontent": "01",//医嘱内容
                "orderno": "01",//医嘱编号
                "orderstate": "1",//医嘱状态
                "ordertype": 1,//医嘱订单类型
                "orgUserid": 0,//医嘱订单ID
                "orgid": 10000,//机构编码
                "parientid": 0,//病人ID
                "parientname": "01",//病人姓名
                "registerid": 2,//挂号ID
                "ctstamp":"2018-01-01 10:55:48",//创建时间戳
              }
            ];
