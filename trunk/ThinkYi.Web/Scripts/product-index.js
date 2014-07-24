﻿$(document).ready(function () {
    var total = $("#Total").val();
    var next = $("#Next").val();
    var pre = $("#Pre").val();
    if (total > 16) {
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
    $("ul.pick li").click(function () {
        var pid = $(this).attr("pid");
        var lCode = $("#lCode").val();
        var categoryID = $("#categoryID").val();
        var controllerName = "Display";
        switch (parseInt(categoryID)) {
            case 2:
                controllerName = "Advert";
                break;
            case 3:
                controllerName = "Leaflet";
                break;
            default:
                controllerName = "Display";
                break;
        }
        window.location.href = "/" + lCode + "/" + controllerName + "/Detail/" + pid;
    });
});
