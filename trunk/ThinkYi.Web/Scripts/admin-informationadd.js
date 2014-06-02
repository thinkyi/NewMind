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
        InformationAdd();
    });

    if (languageCode == "cn")
        $(".spanLanguage").text("繁体");
    else if (languageCode == "big5")
        $(".spanLanguage").text("简体");
    else
        $(".spanLanguage").first().parent().parent().hide();
});

function InformationAdd() {
    var ie = {
        Code: $("#Code").val(),
        Name: $("#Name").val(),
        Text: editor.getContent(),
        Date: $("#Date").val(),
        lCode: languageCode,
        isClone: $("#IsClone").prop("checked")
    }

    $.ajax({
        url: 'InformationAdd',
        type: 'post',
        data: ie,
        success: function (data) {
            if (data == "s") {
                alert("添加成功");
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
