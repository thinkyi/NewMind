$(document).ready(function () {
    $("#gotoPre").attr("disabled", "disabled");
    $("#gotoNext").attr("disabled", "disabled");
    $("#gotoPre").addClass("disabled");
    $("#gotoNext").addClass("disabled");
    var preID = $("#preID").val();
    var nextID = $("#nextID").val();
    if (parseInt(preID)) {
        $("#gotoPre").removeAttr("disabled", "disabled");
        $("#gotoPre").removeClass("disabled");
    }
    if (parseInt(nextID)) {
        $("#gotoNext").removeAttr("disabled", "disabled");
        $("#gotoNext").removeClass("disabled");
    }
});
