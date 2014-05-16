$(document).ready(function () {
    $("ul.pick li").click(function () {
        var pid = $(this).attr("pid");
        window.location.href = "Display/Detail/" + pid;
    });
});
