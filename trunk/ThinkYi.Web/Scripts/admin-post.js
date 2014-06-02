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
        PostEdit();
    });
    PostInit(parent.g_navCode);
});

function PostInit(code) {
    $.ajax({
        url: 'Post?n=' + Math.random() + '&lCode=' + languageCode + '&code=' + code,
        success: function (data) {
            $("#PostID").val(data.PostID);
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

function PostEdit() {
    var post = {
        id: $("#PostID").val(),
        text: editor.getContent()
    }
    $.ajax({
        url: 'PostEdit',
        type: 'post',
        data: post,
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
