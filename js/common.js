/**
 * Created by liyangyang on 2019/07/01 kongshanchat@gmail.com.
 */
const settings = JSON.parse(localStorage.getItem('settings')) || {};
const Cfg = {
    designW: settings.designW || 1920, //设计图宽度
    designH: settings.designH || 1080, //设计图高度
    zoomMode: settings.zoomMode || (innerWidth < 768 ? 'cover' : 'contain'),
    notebookOptim: [undefined, true].includes(settings.notebookOptim),
    //getWeatherPeriod: settings.getWeatherPeriod || 5, //天气预报更新周期（分）
    chartRefreshPeriod: settings.chartRefreshPeriod || 8, // 图表刷新周期（秒）
    colors: settings.colors || 'default',
    colorData: { //配色方案，部分色彩参考 http://rmco.jp/coloringroom/haisyoku_rei/haisyoku_haru.html
        default: ['#FFFFFF', 'orange', 'greenyellow', 'limegreen',
            'mediumturquoise', 'mediumpurple'
        ],
        spring: ['#BEDC6E', '#FA8C8C', '#FAAAC8', '#FAC8C8',
            '#FFFFE6', '#6E6464'
        ],
        summer: ['#FFAE00', '#FF5200', '#007AFF', '#00BF05',
            '#DCFFFF', '#505064'
        ],
        autumn: ['#c1ad2f', /*'#A5912D',*/ '#782323', '#783723', '#A05027',
            '#FAE6DC', '#283C14'
        ],
        winter: ['#F5F5FA', '#96822D', '#6E5A19', '#BECDEB',
            '#E1E1F0', '#281E1E'
        ],
    }
};
let scale = 1;
let notebookOptim = true;
let colonShow = true;
let [pageH, pageW] = [$(window).height(), $(window).width()];

const Public = {
    hasVal(val) {
        if (val === null) {
            return '-';
        }
        return val;
    },
    // 页面顶部时间
    setHeaderTime() {
        setTimeout(function() {
            let t = new Date();
            const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            let myddy = t.getDay(); //获取存储当前日期
            let [year, mon, date, hour, min, sec, milliSec, week] = [
                t.getFullYear(),
                t.getMonth() + 1,
                t.getDate(),
                t.getHours(),
                t.getMinutes(),
                t.getSeconds(),
                t.getMilliseconds(),
                weekday[myddy]
            ];



            let timeHtml =
                `
                <img src="./images/date.png" class="dateIcon">
                <span class="date"> ${year}-${mon}-${date}</span>
                <span class="week"> ${week}</span>
                <span class="digital-num">
                    ${hour} 
                    <span class="colon" style="">${colonShow ? ' :' : ' '}</span>
                    ${(min + "").padStart(2, '0')}
                </span>`;
            colonShow = !colonShow;
            $("#headerTime").html(timeHtml);
            Public.setHeaderTime();
        }, 500)
    },
    //页面缩放
    pageResize() {
        [pageH, pageW] = [$(window).height(), $(window).width()];
        let isWider = pageW / pageH > Cfg.designW / Cfg.designH;
        let [scaleW, scaleH] = [pageW / Cfg.designW, pageH / Cfg.designH];
        let $container = $("#container");
        switch (Cfg.zoomMode) {
            case "contain":
                if (isWider) {
                    $container.css({
                        width: pageH * Cfg.designW / Cfg.designH,
                        height: '100%'
                    });
                } else {
                    $container.css({
                        height: pageW * Cfg.designH / Cfg.designW,
                        width: '100%'
                    });
                }
                scale = isWider ? scaleH : scaleW;
                break;
            case 'cover':
                $("html,body").css('overflow', 'initial');
                if (isWider) {
                    $container.css({
                        height: pageW * Cfg.designH / Cfg.designW,
                        width: '100%'
                    });
                } else {
                    $container.css({
                        width: pageH * Cfg.designW / Cfg.designH,
                        height: '100%'
                    });
                }
                scale = isWider ? scaleW : scaleH;
                break;
            case 'stretch':
                scale = isWider ? scaleH : scaleW;
                $container.css({
                    width: '100%'
                }, {
                    height: '100%'
                });
                break;
        }

        scale = 1;
        $("html").css("font-size", scale * 16 + "px").css("opacity", 1);
        notebookOptim = !(Cfg.notebookOptim === false || scale > .75);
        // console.log("~~~~~~~~~窗口高度：" + pageH + ",\n宽度:" + pageW + " \nbody字号：" + scale)
    },
    //图表缩放
    chartsResize(charts, param) {
        $(window).resize(() => {
            Object.keys(charts).forEach(id => {
                if (param && param.notResize.includes(id)) {
                    return
                }
                charts[id].resize();
            })
        });
    },
    /**
     *
     * @param charts
     * @param t 默认刷新时间（秒）
     * @param noRefresh 无需刷新的图表
     * @param someRefresh 指定要刷新的图表，有重复指定的图表时优先权高于noRefresh
     */
    chartsReDraw(charts, t = Cfg.chartRefreshPeriod, noRefresh, someRefresh) {
        let counter = setInterval(() => {
            Object.keys(charts).forEach(item => {
                if (noRefresh && noRefresh.includes(item) && !(someRefresh && someRefresh.includes(
                        item))) return;
                let chart = charts[item];
                //console.log(chart)
                let opt = chart.getOption();
                chart.clear();
                chart.setOption(opt);

            })
        }, (t || Cfg.chartRefreshPeriod) * 1000)

    },
    // 自定义方法
    initTools() {
        $.fn.extend({
            /**
             * 将文本转为数字并保留相应小数位数
             * @param n 小数位数
             * @param power 数据缩放到10的多少次方
             * @param str 后面可以跟上个字符串，比如‘%’
             */
            str2NumFixed: function(n, power, str = '') {
                $.each($(this), function() {
                    $(this).text(Public.hasVal(parseFloat($(this).text() + 'e' + power).toFixed(
                        n) + str));
                })
            }
        })
    },
    //滚动水波特效

};

//jsonP
function onBack(data) {}

Public.pageResize();
let init = () => {
    Public.initTools(); // 自定义方法
};

$(window).resize(() => {
    //Public.pageResize();
});

$(function() {
    Public.setHeaderTime();



    // 保存设置
    // $("body ").on('click', '#saveSetting', function () {
    //     let settings = {
    //         getWeatherPeriod: $("#getWeatherPeriod").val(),
    //         chartRefreshPeriod: $("#chartRefreshPeriod").val(),
    //         notebookOptim: $("#notebookOptim").is(":checked"),
    //         designW: $("#designW").val(),
    //         designH: $("#designH").val(),
    //         colors: $("body>aside input[type=radio][name=colors]:checked").next().text(),
    //         zoomMode: $("body>aside input[type=radio][name=zoomMode]:checked").next().text(),
    //     };
    //     localStorage.setItem('settings', JSON.stringify(settings));
    //     window.location.reload();
    // });

    // const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    // if (!(sessionData && sessionData.settingTip)) {
    //     alert('请把鼠标移动到屏幕左侧边靠下的位置，可以滑出设置面板。' +
    //         '\n如果浏览器已经解除最小字号限制，请在设置面板中取消“低分辨率优化”的勾选。');
    //     sessionStorage.setItem('sessionData', JSON.stringify({
    //         settingTip: true
    //     }))
    // }



});