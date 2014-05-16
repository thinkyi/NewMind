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