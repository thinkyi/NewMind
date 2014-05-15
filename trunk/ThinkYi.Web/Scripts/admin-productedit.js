﻿var languageCode = parent.g_languageCode;
parent.g_isSetSize = false;
var editor;
var upPicEditor;
var picType = "BigPic";

jQuery(document).ready(function () {
    editor = UE.getEditor('Text');
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        ProductEdit();
    });

    upPicEditor = new UE.ui.Editor();
    upPicEditor.render('upPicEditor');
    upPicEditor.ready(function () {
        upPicEditor.setDisabled();
        upPicEditor.hide(); //隐藏UE框体
        upPicEditor.addListener('beforeInsertImage', function (t, arg) {
            //alert(arg[0].src); //arg就是上传图片的返回值，是个数组，如果上传多张图片，请遍历该值。
            if (picType == "BigPic")
                $("#BigPicPreview").attr("src", arg[0].src);
            else
                $("#SmallPicPreview").attr("src", arg[0].src);
        });
    })

    $(".btnUpPic").bind("click", function () {
        picType = $(this).attr("id");
        ShowUEImageDialog(upPicEditor);
    })

    BindTypeSelect($("#PType1"), $("#PType2"), $("#ProductTypeID").val());
});

function ProductEdit() {
    if (!$("#PType2").val())
    {
        alert("产品小类不能为空");
        return;
    }
    var pe = {
        ProductID: $("#ProductID").val(),
        ProductTypeID: $("#PType2").val(),
        Code: $("#Code").val(),
        Name: $("#Name").val(),
        Text: editor.getContent(),
        BigPic: $("#BigPicPreview").attr("src"),
        SmallPic: $("#SmallPicPreview").attr("src"),
        IsRecommend: $("#IsRecommend").prop("checked"),
        IsShow: $("#IsShow").prop("checked"),
        lCode: languageCode
    }

    $.ajax({
        url: 'ProductEdit',
        type: 'post',
        data: pe,
        success: function (data) {
            if (data == "s") {
                alert("编辑成功");
                parent.SetNav("产品列表");
                parent.SetNavSelected("Product");
                window.location.href = "Nav?viewName=Product";
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
