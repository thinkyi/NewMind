
//滚动
(function ($) {

    $.fn.kxbdMarquee = function (options) {
        var opts = $.extend({}, $.fn.kxbdMarquee.defaults, options);

        return this.each(function () {
            var $marquee = $(this);//滚动元素容器
            var _scrollObj = $marquee.get(0);//滚动元素容器DOM
            var scrollW = $marquee.width();//滚动元素容器的宽度
            var scrollH = $marquee.height();//滚动元素容器的高度
            var $element = $marquee.children(); //滚动元素
            var $kids = $element.children();//滚动子元素
            var scrollSize = 0;//滚动元素尺寸
            var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1 : 0;//滚动类型，1左右，0上下

            //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
            $element.css(_type ? 'width' : 'height', 10000);
            //获取滚动元素的尺寸
            if (opts.isEqual) {
                scrollSize = $kids[_type ? 'outerWidth' : 'outerHeight']() * $kids.length;
            } else {
                $kids.each(function () {
                    scrollSize += $(this)[_type ? 'outerWidth' : 'outerHeight']();
                });
            }
            //滚动元素总尺寸小于容器尺寸，不滚动
            if (scrollSize < (_type ? scrollW : scrollH)) { scrollSize = scrollW * 2; }
            //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
            $element.append($kids.clone()).css(_type ? 'width' : 'height', scrollSize * 2);

            var numMoved = 0;
            function scrollFunc() {
                var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft' : 'scrollTop';
                if (opts.loop > 0) {
                    numMoved += opts.scrollAmount;
                    if (numMoved > scrollSize * opts.loop) {
                        _scrollObj[_dir] = 0;
                        return clearInterval(moveId);
                    }
                }
                if (opts.direction == 'left' || opts.direction == 'up') {
                    var newPos = _scrollObj[_dir] + opts.scrollAmount;
                    if (newPos >= scrollSize) {
                        newPos -= scrollSize;
                    }
                    _scrollObj[_dir] = newPos;
                } else {
                    var newPos = _scrollObj[_dir] - opts.scrollAmount;
                    if (newPos <= 0) {
                        newPos += scrollSize;
                    }
                    _scrollObj[_dir] = newPos;
                }
            };
            //滚动开始
            var moveId = setInterval(scrollFunc, opts.scrollDelay);
            //鼠标划过停止滚动
            $marquee.hover(
                function () {
                    clearInterval(moveId);
                },
                function () {
                    clearInterval(moveId);
                    moveId = setInterval(scrollFunc, opts.scrollDelay);
                }
            );

            //控制加速运动
            if (opts.controlBtn) {
                $.each(opts.controlBtn, function (i, val) {
                    $(val).bind(opts.eventA, function () {
                        opts.direction = i;
                        opts.oldAmount = opts.scrollAmount;
                        opts.scrollAmount = opts.newAmount;
                    }).bind(opts.eventB, function () {
                        opts.scrollAmount = opts.oldAmount;
                    });
                });
            }
        });
    };
    $.fn.kxbdMarquee.defaults = {
        isEqual: true,//所有滚动的元素长宽是否相等,true,false
        loop: 0,//循环滚动次数，0时无限
        direction: 'left',//滚动方向，'left','right','up','down'
        scrollAmount: 1,//步长
        scrollDelay: 40,//时长
        newAmount: 3,//加速滚动的步长
        eventA: 'mousedown',//鼠标事件，加速
        eventB: 'mouseup'//鼠标事件，原速
    };

    $.fn.kxbdMarquee.setDefaults = function (settings) {
        $.extend($.fn.kxbdMarquee.defaults, settings);
    };

})(jQuery);

var curr = 0, next = 0, count = 0;
$(document).ready(function () {

    //设置切换按钮透明度
    $('.slideBtn li').css({ 'opacity': '0.6' })

    // 记录图片的数量
    count = $('.slideBtn li').size();
    curr = count - 1;
    t = setInterval('imgPlay()', 3500);

    // 鼠标移动到图片上停止播放，移开后恢复播放
    $('.slideImg a').hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval('imgPlay()', 3500);
    });

    //鼠标移动到导航上播放到相应的图片
    $('.slideBtn li').hover(function () {
        clearInterval(t);
        var index = $(this).attr("index");
        if (curr != index) {
            play(index);
            curr = index;
        };
        return false;
    }, function () {
        t = setInterval('imgPlay()', 3500);
    });

    $("ul.pick li").click(function () {
        var pid = $(this).attr("pid");
        window.location.href = "cn/Display/Detail/" + pid;
    });

    $('.marquee').kxbdMarquee({
        direction: 'left',
        eventA: 'mouseenter',
        eventB: 'mouseleave'
    });
});

// 播放图片的函数
var imgPlay = function () {
    next = parseInt(curr) + 1;
    // 若当前图片播放到最后一张，这设置下一张要播放的图片为第一张图片的下标
    if (curr == count - 1) next = 0;
    play(next);

    curr++;
    // 在当前图片的下标加1后，若值大于最后一张图片的下标，则设置下一轮其实播放的图片下标为第一张图片的下标，而next永远比curr大1
    if (curr > count - 1) { curr = 0; next = curr + 1; }
};

// 控制播放效果的函数
var play = function (next) {
    $('.slideImg a').eq(curr).hide();
    $('.slideImg a').eq(next).show();
    $('.slideBtn li').removeClass('on');
    $('.slideBtn li[index="' + next + '"]').addClass('on');
    $('.slideImg a').eq(next).css({ 'opacity': '0.5' }).animate({ 'opacity': '1' }, 1000);
};