$(document).ready(function () {
    var size = $("#Size").val();
    var total = $("#Total").val();
    var next = $("#Next").val();
    var pre = $("#Pre").val();
    if (parseInt(total) > parseInt(size)) {
        $(".pagebox").show();
    }
    else {
        $(".pagebox").hide();
    }
    $("#gotoFirst").attr("disabled", "disabled");
    $("#gotoPre").attr("disabled", "disabled");
    $("#gotoNext").attr("disabled", "disabled");
    $("#gotoLast").attr("disabled", "disabled");
    $("#gotoFirst").addClass("disabled");
    $("#gotoPre").addClass("disabled");
    $("#gotoNext").addClass("disabled");
    $("#gotoLast").addClass("disabled");
    if (next) {
        $("#gotoNext").removeAttr("disabled", "disabled");
        $("#gotoLast").removeAttr("disabled", "disabled");
        $("#gotoNext").removeClass("disabled");
        $("#gotoLast").removeClass("disabled");
    }
    if (pre) {
        $("#gotoFirst").removeAttr("disabled", "disabled");
        $("#gotoPre").removeAttr("disabled", "disabled");
        $("#gotoFirst").removeClass("disabled");
        $("#gotoPre").removeClass("disabled");
    }
});
