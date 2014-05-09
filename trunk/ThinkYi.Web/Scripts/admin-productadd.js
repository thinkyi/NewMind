var languageCode = parent.g_languageCode;
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
        ProductAdd();
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

    if (languageCode == "cn")
        $(".spanLanguage").text("繁体");
    else if (languageCode == "big5")
        $(".spanLanguage").text("简体");
    else
        $(".spanLanguage").first().parent().parent().hide();

    BindTypeSelect($("#PType1"), $("#PType2"));
});

function ProductAdd() {
    var pe = {
        ProductTypeID: $("#PType2").val(),
        Code: $("#Code").val(),
        Name: $("#Name").val(),
        Code: $("#Code").val(),
        Text: editor.getContent(),
        BigPic:$("#BigPicPreview").attr("src"),
        SmallPic: $("#SmallPicPreview").attr("src"),
        IsRecommend: $("#IsRecommend").prop("checked"),
        IsShow: $("#IsShow").prop("checked"),
        lCode: languageCode,
        isClone: $("#IsClone").prop("checked")
    }

    $.ajax({
        url: 'ProductAdd',
        type: 'post',
        data: pe,
        success: function (data) {
            if (data == "s") {
                alert("添加成功");
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
