$(document).ready(function () {
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
