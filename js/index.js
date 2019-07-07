let Index = {
    init() {
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        Public.chartsReDraw(this.charts, null, [], [
            'jiya_charts','workOrderChart','RateWorkOrderChart','produceOrderChartRate',
            'produceOrderChartDoneRate','weekPlanDoneChart','weeksendDoneChart',
            'weeksendDoneChart','statisticChart'
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
        chart.setOption(opt_line); // 设置这个类型（折线图）图表的共性
        chart.setOption({
            xAxis: { // 本图表option的个性
                nameLocation: 'start',
                inverse: true,
                data: ['2019', '2014', '2009', '2004', '1999', '1994', '1989']
            },
            yAxis: { // 本图表option的个性
                name: '排名',
                nameLocation: 'start',
                min: 1,
                inverse: true
            },
            dataZoom: { // 本图表option的个性
                type: 'inside',
                orient: 'vertical'
            },
            series: [
                {
                    "name": "Java",
                    data: [1, 2, 1, 1, 12, '-', 0]
                },
                
                {
                    "name": "SQL",
                    data: [9, '-', '-', 6, '-', '-', 0]
                }
               
            ].map(item => {
                return $.extend(true, {}, seri_line, // 折线图图表series的共性
                    { // 本图表series的个性
                        symbol: 'circle',
                        smooth: false,
                        showSymbol: false,
                    }, item)
            })
        })
    },
    //氧化车间
    workOrderChart() {
        let chart = echarts.init($("#workOrderChart")[0]);
        this.charts.workOrderChart = chart;
        chart.setOption(opt_line);
        chart.setOption({
            xAxis: {
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '数量/次',
            },
            series: [{
                name: '邮件营销',
                data: [120, 132, 101, 134, 90, 230, 210]
            }, {
                name: '联盟广告',
                data: [220, 182, 191, 234, 290, 330, 310]
            }, {
                name: '视频广告',
                data: [550, 432, 501, 454, 390, 530, 410]
            }, {
                name: '直接访问',
                data: [420, 432, 401, 434, 490, 530, 320]
            }, {
                name: '搜索引擎',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }].map(item => {
                return $.extend(true, {}, seri_area, {
                    symbol: 'circle',
                }, item)
            })
        });
    },
    //工单达成率合格率
    RateWorkOrderChart() {
        let chart = echarts.init($("#RateWorkOrderChart")[0]);
        this.charts.RateWorkOrderChart = chart;
        chart.setOption(opt_bar_v);
        chart.setOption({
            xAxis: {
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '时间/小时',
            },
            series: [
                {
                    "name": "吃饭",
                    data: [3, 2, 2, 2, 2, 2, 3]
                },
                {
                    "name": "睡觉",
                    data: [8, 7, 7, 7, 7, 7, 7.5]
                },
                {
                    "name": "工作",
                    data: [0, 8, 8, 8, 8, 7.5, 8]
                },
                {
                    "name": "学习",
                    data: [3, 1, 1, 1.5, 1, 1, 2]
                },
                {
                    "name": "其他",
                    data: [10, 6, 6, 5.5, 6, 6.5, 3.5]
                },
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item, {
                    stack: '总时间'
                })
            })
        })
    },
    //生产工单达成率
    produceOrderChartRate() {
        let chart = echarts.init($("#produceOrderChartRate")[0]);
        this.charts.produceOrderChartRate = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            series: [
                {
                    name: "电脑坏了",
                    data: [{
                        value: 72,
                        name: '重启'
                    }, {
                        value: 3,
                        name: '找人帮忙'
                    }, {
                        value: 10,
                        name: '放弃使用'
                    }, {
                        value: 15,
                        name: '想法修复'
                    }]
                },
            ].map(item => {
                return $.extend(true, {}, seri_circle, item)
            })
        })
    },
    //生产工单完工数
    produceOrderChartDoneRate() {
        let chart = echarts.init($("#produceOrderChartDoneRate")[0]);
        this.charts.produceOrderChartDoneRate = chart;
        chart.setOption(opt_line);
        chart.setOption({
            legend: {
                data: ["吃饭", "学习", "工作", "其他", '睡觉', ]
            },
            tooltip: {
                formatter: function (param) {
                    return param.map(item => {
                        if (item.seriesName === '补位') {
                            return ''
                        } else {
                            return `${item.seriesName}: ${item.value}<br>`
                        }
                    }).join("").replace(',', '')

                }
            },
            xAxis: {
                boundaryGap: true,
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '时间/小时',
            },
            series: [
                {
                    name: '睡觉',
                    data: [8, 7, 7, 7, 6, 6.5, 7.5]
                }, {
                    name: '补位',
                    silent: true,
                    itemStyle: {
                        color: c_bg_bar,
                    },
                    barGap: '-100%',
                    data: new Array(7).fill(12)
                }
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item)
            }).concat([
                {
                    "name": "吃饭",
                    data: [3, 2, 2, 2, 2, 2, 3]
                },
                {
                    "name": "学习",
                    data: [3, 1, 1, 1.5, 1, 1, 2]
                },
                {
                    "name": "工作",
                    data: [0, 8, 8, 8, 8, 7.5, 8]
                },
                {
                    "name": "其他",
                    data: [10, 6, 6, 5.5, 7, 7, 3.5]
                },
            ].map(item => {
                return $.extend(true, {}, seri_line, {
                    symbol: 'emptyCircle'
                }, item)
            }))
        })
    },
    //周发货计划完工数
    weekPlanDoneChart() {
        let chart = echarts.init($("#weekPlanDoneChart")[0]);
        this.charts.weekPlanDoneChart = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    colorLightness: [0.3, 1.2]
                }
            },
            series: [
                {
                    name: "视频网站找歌的结果",
                    itemStyle: {
                        normal: {
                            color: colors[0],
                            shadowBlur: 100 * scale,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [{
                        value: 40,
                        name: '手机拍的现场版'
                    }, {
                        value: 30,
                        name: '翻唱'
                    }, {
                        value: 18,
                        name: '尤克里里的演奏'
                    }, {
                        value: 10,
                        name: '该视频已被删除'
                    }, {
                        value: 2,
                        name: '找到了'
                    }].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                },
            ].map(item => {
                return $.extend(true, {}, seri_pie, item)
            })
        })
    },
    //周发货达成率
    weeksendDoneChart() {
        let chart = echarts.init($("#weeksendDoneChart")[0]);
        this.charts.weeksendDoneChart = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    colorLightness: [0.3, 1.2]
                }
            },
            series: [
                {
                    name: "视频网站找歌的结果",
                    itemStyle: {
                        normal: {
                            color: colors[0],
                            shadowBlur: 100 * scale,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [{
                        value: 40,
                        name: '手机拍的现场版'
                    }, {
                        value: 30,
                        name: '翻唱'
                    }, {
                        value: 18,
                        name: '尤克里里的演奏'
                    }, {
                        value: 10,
                        name: '该视频已被删除'
                    }, {
                        value: 2,
                        name: '找到了'
                    }].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                },
            ].map(item => {
                return $.extend(true, {}, seri_pie, item)
            })
        })
    },
    //生产统计
    statisticChart() {
        let chart = echarts.init($("#statisticChart")[0]);
        this.charts.statisticChart = chart;
        chart.setOption(opt_line);
        chart.setOption({
            xAxis: {
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '数量/次',
            },
            series: [{
                name: '邮件营销',
                data: [120, 132, 101, 134, 90, 230, 210]
            }, {
                name: '联盟广告',
                data: [220, 182, 191, 234, 290, 330, 310]
            }, {
                name: '视频广告',
                data: [550, 432, 501, 454, 390, 530, 410]
            }, {
                name: '直接访问',
                data: [420, 432, 401, 434, 490, 530, 320]
            }, {
                name: '搜索引擎',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }].map(item => {
                return $.extend(true, {}, seri_area, {
                    symbol: 'circle',
                }, item)
            })
        });
    },
};
Index.init();