var languageCode = parent.g_languageCode;
var editor;
parent.g_isSetSize = false;

jQuery(document).ready(function () {
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        InfoAdd();
    });
    InfoInit(parent.g_navCode);
});

function InfoInit(code) {
    $.ajax({
        url: 'Information?n=' + Math.random() + '&lCode=' + languageCode + '&code=' + code,
        success: function (data) {
            $("#InformationID").val(data.InformationID);
            $("#Code").val(data.Code);
            editor = UE.getEditor('Text');
            editor.addListener("ready", function () {
                //editor准备好之后才可以使用
                editor.setContent(data.Text);
            });
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}

function InfoAdd() {
    var info = {
        id: $("#InformationID").val(),
        text: editor.getContent()
    }
    $.ajax({
        url: 'InfoAdd',
        type: 'post',
        data: info,
        success: function (data) {
            if (data == "s") {
                alert("更新成功");
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
