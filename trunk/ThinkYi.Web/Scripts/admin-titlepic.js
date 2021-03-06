﻿var languageCode = parent.g_languageCode;
parent.g_isSetSize = false;
var upPicEditor;

jQuery(document).ready(function () {
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        TitlePicEdit();
    });

    TitlePicInit(parent.g_navCode);

    upPicEditor = new UE.ui.Editor();
    upPicEditor.render('upPicEditor');
    upPicEditor.ready(function () {
        upPicEditor.setDisabled();
        upPicEditor.hide(); //隐藏UE框体
        upPicEditor.addListener('beforeInsertImage', function (t, arg) {
            //alert(arg[0].src); //arg就是上传图片的返回值，是个数组，如果上传多张图片，请遍历该值。
            $("#TitlePic").attr("src", arg[0].src);
        });
    })

    $(".btnUpPic").bind("click", function () {
        ShowUEImageDialog(upPicEditor);
    })
});

function TitlePicInit(code) {
    $.ajax({
        url: 'Post?n=' + Math.random() + '&lCode=' + languageCode + '&code=' + code,
        success: function (data) {
            $("#PostID").val(data.PostID);
            if (data.TitlePic)
                $("#TitlePic").attr("src", data.TitlePic);
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}


function TitlePicEdit() {
    var info = {
        id: $("#PostID").val(),
        titlePic: $("#TitlePic").attr("src"),
        isClone: $("#IsClone").prop("checked")
    }
    $.ajax({
        url: 'TitlePicEdit',
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
