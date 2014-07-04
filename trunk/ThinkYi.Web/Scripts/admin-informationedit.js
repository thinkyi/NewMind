var languageCode = parent.g_languageCode;
parent.g_isSetSize = false;
var editor;

jQuery(document).ready(function () {
    editor = UE.getEditor('Text');
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        InformationEdit();
    });
});

function InformationEdit() {
    var ie = {
        InformationID: $("#InformationID").val(),
        LanguageID: $("#LanguageID").val(),
        Code: $("#Code").val(),
        Name: $("#Name").val(),
        Text: editor.getContent(),
        Date: $("#Date").val()
    }

    $.ajax({
        url: 'InformationEdit',
        type: 'post',
        data: ie,
        success: function (data) {
            if (data == "s") {
                alert("编辑成功");
                parent.SetNav("行业知识列表");
                parent.SetNavSelected("Information");
                window.location.href = "Nav?viewName=Information";
            }
            else {
                alert(data);
            }
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}
