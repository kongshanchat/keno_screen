let Index = {
    init() {
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        Public.chartsReDraw(this.charts, null, [], [
            'jiya_charts', 'workOrderChart', 'RateWorkOrderChart', 'produceOrderChartRate',
            'produceOrderChartDoneRate', 'weekPlanDoneChart', 'weeksendDoneChart',
            'weeksendDoneChart', 'statisticChart'
        ])
    },
    loadData() {
        this.jiya_charts(); //
        this.workOrderChart(); //
        this.RateWorkOrderChart(); //
        this.produceOrderChartRate(); //
        this.produceOrderChartDoneRate(); //
        this.weekPlanDoneChart(); //
        this.weeksendDoneChart();
        this.statisticChart();
    },
    jiya_charts() {
        let chart = echarts.init($("#jiya_charts")[0]); //初始化图表，注意命名的规范合理
        this.charts.jiya_charts = chart; //放入charts对象方便后面的刷新缩放以及其他操作

        var test=function(datar){
            alert('sss');
           
            chart.setOption({
                grid: {
                    top: '20%',
                    bottom: "15%",
                    left: 30
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: datar.legendTitle,
                    top: 0,
                    right: '10%',
                    textStyle: {
                        color: "#ffffff"
                    }
                },
                xAxis: {
                    data:datar.xname,
                    axisLine: {
                        show: true //隐藏X轴轴线
                    },
                    axisTick: {
                        show: true //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#EEFDFF" //X轴文字颜色
                        }
                    }
                },
                yAxis: [{
                        type: "value",
                        name: "单位/件",
                        nameTextStyle: {
                            color: "#fff"
                        },
                        splitLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    {
                        type: "value",
                        //name: "单位/kg",
                        nameTextStyle: {
                            color: "#00D0F2"
                        },
                        position: "right",
                        splitLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            //formatter: "{value} %", //右侧Y轴文字显示
                            textStyle: {
                                color: "#00D0F2"
                            }
                        }
                    },
                    {
                        type: "value",
                        gridIndex: 0,
                        min: 50,
                        max: 100,
                        splitNumber: 5,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ["rgba(3,118,197,0.0)", "rgba(3,118,197,0.2)"]
                            }
                        }
                    }
                ],
                series: [{
                        name: datar.series[0].name,
                        type: "line",
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        //smooth: true, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        symbol: "circle", //标记的图形为实心圆
                        symbolSize: 6, //标记的大小
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "#FFB508"
                        },
                        lineStyle: {
                            color: "#FFB508"
                        },
                        areaStyle: {
                            color: ["rgba(255, 181, 8, 0.15)", "rgba(255, 181, 8, 0)"]
                        },
                        data: datar.series[0].value
                    },
                    {
                        name:datar.series[1].name,
                        type: "bar",
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#03D8FC"
                                    },
                                    {
                                        offset: 1,
                                        color: "#02A6C1"
                                    }
                                ])
                            }
                        },
                        data: datar.series[1].value
                    },
                    {
                        name:  datar.series[2].name,
                        type: "bar",
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#0326FC"
                                    },
                                    {
                                        offset: 1,
                                        color: "#0221C1"
                                    }
                                ])
                            }
                        },
                        data:  datar.series[1].value
                    }
                ]

            })
        }
        
        $.ajax({
            type: "get",
            url: "/login",
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {

            },
            dataType: "json",
            success: function(data){
               console.log(data);
            },
            error:function(e){
                var datar= {
                    legendTitle:["合格数量", "计划数量", "完工数量"],
                    xname:["#1线","#2线","#3线","#4线","#5线","#6线"],
                    series:[
                        {
                            name:'合格数量',
                            value:[33, 23, 13, 44, 55, 26]
                        },
                        {
                            name:'计划数量',
                            value: [1, 2, 3, 4, 5, 6]
                        },
                        {
                            name:'完工数量',
                            value: [1, 2, 3, 4, 5, 6]
                        }
                    ]
                }

                //this.jiya_charts.test(datar);
                test(datar);
            }
        });
    },
    //氧化车间  工单达成合格率
    workOrderChart() {
        var data={
            legend:['达成率', '合格率'],
            orderName:['w0001', 'w002', 'w003', 'w004', 'w005', 'w006','w007','w008'],
            doneRate:{
                name:'达成率',
                data:[30, 50, 60, 70, 80, 100,50,40]
            },
            passRate:{
                name:'合格率',
                data:[15, 40, 40, 50, 80, 90,30,56]
            }


        }
        let chart = echarts.init($("#workOrderChart")[0]);
        this.charts.workOrderChart = chart;
        chart.setOption(opt_bar_h);
        chart.setOption({
            tooltip: {
                trigger: 'axis',
                formatter: "{b}:{c}",
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: data.legend,
                inactiveColor: '#666',
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12,
                }
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                min: 0,
                max: 100
            },
            yAxis: {
                type: 'category',
                data: data.orderName
            },
            series: [{
                        name: data.doneRate.name,
                        type: 'bar',
                        barWidth: '8px',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{c}%',
                                textStyle: {
                                    color: '#03D9FE',
                                    fontSize: '8',
                                }
                            }
                        },
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                            
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#02A6C1'
                                        },
                                        
                                        {
                                            offset: 1,
                                            color: '#9605FD'
                                        }
                                    ]
                                )
                            }
                        },
                        data: data.doneRate.data
                    },
                    {
                        name: data.passRate.name,
                        type: 'bar',
                        barWidth: '8px',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{c}%',
                                textStyle: {
                                    color: '#03D9FE',
                                    fontSize: '8',
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "#0FB987"
                                    },
                                    {
                                        offset: 1,
                                        color: "#D4980D"
                                    }
                                ])
                            }
                        },
                        data: data.passRate.data
                    }
                ]
                
        });
    },
    ////氧化车间  氧化车间生产工单
    RateWorkOrderChart() {
        var data={
            name:['w001', 'w002', 'woo3', 'w004', 'w005', 'w006', 'w007','w008'],
            planNum:{
                name:'计划数量',
                value:[3, 2, 2, 2, 2, 2, 3,10]
            },
            doneNum:{
                name:'完工数量',
                value:[8, 7, 7, 7, 7, 7, 7.5,20]
            },
            passNum:{
                name:'合格数量',
                value:[0, 8, 8, 8, 8, 7.5, 8,8]
            }
        }
        let chart = echarts.init($("#RateWorkOrderChart")[0]);
        this.charts.RateWorkOrderChart = chart;
        chart.setOption(opt_bar_v);
        chart.setOption({
            xAxis: {
                data:data.name
            },
            yAxis: {
                name: '数量/件',
                textStyle: {
                    color: colors[0],
                    fontSize: 12,
                }
            },
            series: [{
                    "name": data.planNum.name,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#0268D4"
                                },
                                {
                                    offset: 1,
                                    color: "#0268D4"
                                }
                            ])
                        }
                    },
                    data: data.planNum.value
                },
                {
                    "name": data.doneNum.name,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#3EB177"
                                },
                                {
                                    offset: 1,
                                    color: "#3EB177"
                                }
                            ])
                        }
                    },
                    data: data.doneNum.value
                },
                {
                    "name": data.passNum.name,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#02A6C1"
                                },
                                {
                                    offset: 1,
                                    color: "#03D8FC"
                                }
                            ])
                        }
                    },
                    data: data.passNum.value
                }
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item, {
                    stack: '总时间'
                })
            })
        })
    },
    //生产工单达成率
    produceOrderChartRate() {
        var data={
            name:['w0001', 'Twoo2', 'W003', 'woo4', 'woo5', 'w006', 'w007', 'w008', 'w009', 'w010'],
            value:[820, 932, 901, 934, 1290, 1330, 1320, 424, 345, 890]
        }
        let chart = echarts.init($("#produceOrderChartRate")[0]);
        this.charts.produceOrderChartRate = chart;
        chart.setOption(opt_line);
        chart.setOption({
            grid: {
                top: 5,
                bottom: 24,
                right: 30
            },
            xAxis: {
                type: 'category',
                data: data.name,
               
            },
            yAxis: [{
                type: 'value',
                
                
                
            },
            {
                type: "value",
                gridIndex: 0,
                min: 50,
                max: 100,
                splitNumber: 4,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ["rgba(3,118,197,0.0)", "rgba(3,118,197,0.2)"]
                    }
                }
            }
        ],
            series: [{
                data: data.value,
                type: 'line',
                symbolSize: 6, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    color: "#FFB508"
                },
                lineStyle: {
                    color: "#FFB508"
                },
                areaStyle: {
                    color: ["rgba(255, 181, 8, 0.15)", "rgba(255, 181, 8, 0)"]
                }
            }]
        })
    },
    //生产工单完工数
    produceOrderChartDoneRate() {
        var data={
            name:['计划数量','完工数量'],
            workOrderName:['w0001','w0002', 'w0003', 'w0004', 'w0005', 'w0006', 'w0007', 'w0008'],
            planNum:[10, 23, 33, 32, 23, 56, 65, 32],
            doneNum:[20, 13, 23, 12, 23, 46, 65, 62]
        }
        let chart = echarts.init($("#produceOrderChartDoneRate")[0]);
        this.charts.produceOrderChartDoneRate = chart;
        //chart.setOption(opt_bar_v);
        chart.setOption({
            tooltip: { //提示框组件
                trigger: 'axis',
                formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                textStyle: {
                    color: '#fff',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '6%',
                top: 30,
                padding: '0 0 10 0',
                containLabel: true,
            },
            legend: { //图例组件，颜色和名字
                right: 10,
                top: 0,
                itemGap: 16,
                itemWidth: 18,
                itemHeight: 10,
                data: data.name,
                textStyle: {
                    color: '#CFE7FE',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true, //坐标轴两边留白
                data: data.workOrderName,
                axisLabel: { //坐标轴刻度标签的相关设置。
                    interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                    margin: 15,
                    textStyle: {
                        color: '#EEFDFF',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    }
                },
                axisTick: { //坐标轴刻度相关设置。
                    show: true,
                },
                
                splitLine: { //坐标轴在 grid 区域中的分隔线。
                    show: false,
                }
            }],
            yAxis: [{
                type: 'value',
                splitNumber: 4,
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    }
                },
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#fff'],
                        opacity: 0.06
                    }
                }

            },
            {
                type: "value",
                gridIndex: 0,
                min: 50,
                max: 100,
                splitNumber: 5,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ["rgba(3,118,197,0.0)", "rgba(3,118,197,0.2)"]
                    }
                }
            }
        ],
            series: [{
                    name: data.name[0],
                    type: 'bar',
                    data: data.planNum,
                    barWidth: 20,
                    barGap: 0, //柱间距离
                    label: { //图形上的文本标签
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#a8aab0',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            },
                        },
                    },
                    itemStyle: { //图形样式
                        normal: {
                            //barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#6275D1'
                            }, {
                                offset: 1,
                                color: '#00D4C1'
                            }], false),
                        },
                    },
                },
                {
                    name: data.name[1],
                    type: 'bar',
                    data: data.doneNum,
                    barWidth: 20,
                    barGap: 0.2, //柱间距离
                    label: { //图形上的文本标签
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#a8aab0',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            },
                        },
                    },
                    itemStyle: { //图形样式
                        normal: {
                            //barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00D4C1'
                            }, {
                                offset: 1,
                                color: '#D0AE59'
                            }], false),
                        },
                    },
                }
            ]

        })
    },
    //周发货计划完工数
    weekPlanDoneChart() {
        var data= {
            title:['计划数量','发货数量'],
            name:['v53', 'v23', 'v24', 'v26', 'v50', 'v43', 'v16', 'v51', 'v16', 'v21', 'v27', 'v46'],
            planNum:[120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
            sendNum:[220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
        }
        let chart = echarts.init($("#weekPlanDoneChart")[0]);
        this.charts.weekPlanDoneChart = chart;
        //chart.setOption(opt_line);
        chart.setOption({
            grid: {
                left: '5%',
                right: '5%',
                top: 30,
                bottom: '12%',
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'item'
            },
            legend: {
                show: true,
                x: 'center',
                //y: '15',
                bottom: 15,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#fff'
                },
                data: data.title
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#397cbc'
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#195384'
                    }
                },
                data: data.name
            }],
            yAxis: [{
                    type: 'value',
                    name: '单位:支',
                    min: 0,
                    //max: 1000,
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#27b4c2'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#11366e'
                        }
                    }
                },
                {
                    type: 'value',
                    //name: '浏览量',
                    min: 0,
                    //max: 1000,
                    axisLabel: {
                        formatter: '{value} 人',
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#186afe'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#11366e'
                        }
                    }
                }
            ],
            series: [{
                    name: data.title[0],
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#0092f6',
                            lineStyle: {
                                color: "#0092f6",
                                width: 1
                            },
                            areaStyle: {
                                //color: '#94C9EC'
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(7,44,90,0.3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,146,246,0.9)'
                                }]),
                            }
                        }
                    },
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'red'
                            }
                        }
                    },
                    data: data.planNum
                },
                {
                    name: data.title[1],
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    symbolSize: 8,

                    itemStyle: {
                        normal: {
                            color: '#00d4c7',
                            lineStyle: {
                                color: "#00d4c7",
                                width: 1
                            },
                            areaStyle: {
                                //color: '#94C9EC'
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(7,44,90,0.3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,212,199,0.9)'
                                }]),
                            }
                        }
                    },
                    data: data.sendNum
                }
            ]
        })
    },
    //周发货达成率
    weeksendDoneChart() {
        let chart = echarts.init($("#weeksendDoneChart")[0]);
        this.charts.weeksendDoneChart = chart;
        let data = [
            {
                "name": "未达成率",
                "value": 1793
            },
            {
            "name": "达成率",
            "value": 455
        } ]

        //chart.setOption(opt_pie);
        chart.setOption({
            color: ['#5AC0FB', '#3CF7A1', '#0931B3', '#0F347B', '#585247', '#7F6AAD', '#009D85', "rgba(250,250,250,0.3)"],
            // title: {
            //     textStyle: {
            //         color: '#f2f2f2',
            //         fontSize: 20,
            //         // align: 'center'
            //     },
            //     subtextStyle: {
            //         fontSize: 20,
            //         color: ['#ff9d19']
            //     },
            //     x: 'center',
            //     y: 'center',
            // },
            grid: {
                bottom: 150,
                left: 100,
                right: '10%'
            },
            legend: {
                bottom: '5%',
                textStyle: {
                    color: '#fff',
                },
                itemGap: 12,
                data: data
            },
            series: [
                // 主要展示层的
                {
                    radius: ['30%', '61%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    roseType: true,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{c}支 \n {d}%",
                            rich: {
                                c: {
                                    color: "#46E8FB",
                                },
                                d: {
                                    color: '#5AA8F8',
                                },
                            },
                            textStyle: {
                                fontSize: 20,

                            },
                            position: 'outside'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 20,
                            length2: 40
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    name: "总量",
                    data: data,

                },
                // 边框的设置
                {
                    radius: ['25%', '24%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    animation: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 1,
                        itemStyle: {
                            color: "rgba(250,250,250,0.3)",
                        },

                    }],
                }, {
                    name: '外边框',
                    type: 'pie',
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    center: ['50%', '50%'],
                    radius: ['65%', '65%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 9,
                        name: '',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 1,
                                    color: "#5AC0FB" // 0% 处的颜色
                                },
                                {
                                    offset: 0,
                                    color: "#0931b3" // 100% 处的颜色
                                }
                            ], false),
                            normal: {
                                borderWidth: 2,
                                borderColor: '#2869B5'
                            }
                        }
                    }]
                },
                {
                    name: '',
                    type: 'pie',
                    clockWise: true,
                    hoverAnimation: false,
                    radius: [0, '20%'],
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                        value: 0,
                        itemStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#0a0e22' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#0b6ab3' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        label: {
                            normal: {
                                formatter: '总达成率',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 13,
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    }]
                }
            ]

        })
    },
    //生产统计
    statisticChart() {
        var data ={
            title:['计划数量','完工数量','合格数量'],
            name:['w00011', 'w00023', 'w0034', 'w0056', 'w0098', 'w0087', 'w889'],
            planNum:[120, 132, 101, 134, 90, 230, 210],
            doneNum:[220, 182, 191, 234, 290, 330, 310],
            passNum:[550, 432, 501, 454, 390, 530, 410]
        }
        let chart = echarts.init($("#statisticChart")[0]);
        this.charts.statisticChart = chart;
        chart.setOption(opt_line);
        chart.setOption({
            grid: {
                top: 35,
                bottom: 24,
                right: 30
            },
            legend: { //图例组件，颜色和名字
                right: 10,
                top: 0,
               
                textStyle: {
                    color: '#CFE7FE',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            xAxis: {
                data: data.name
                
            },
            yAxis: {
                name: '数量/件',
            },
            series: [{
                name: data.title[0],
                data: data.planNum,
                symbolSize: 6, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    color: "#3075DA"
                },
                lineStyle: {
                    color: "#3075DA"
                }
              
            }, {
                name: data.title[1],
                data: data.doneNum,
                symbolSize: 6, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    color: "#FFB508"
                },
                lineStyle: {
                    color: "#FFB508"
                },
               
            }, {
                name: data.title[2],
                data: data.passNum,
                symbolSize: 6, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    color: "#1DB48B"
                },
                lineStyle: {
                    color: "#1DB48B"
                }
            }].map(item => {
                return $.extend(true, {}, seri_area, {
                    symbol: 'circle',
                }, item)
            })
        });
    },
};
Index.init();