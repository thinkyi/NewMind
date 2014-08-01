var languageCode = parent.g_languageCode;
parent.g_isSetSize = false;
var editor;
var upPicEditor;

jQuery(document).ready(function () {
    editor = UE.getEditor('Text');
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        CultureAdd();
    });

    upPicEditor = new UE.ui.Editor();
    upPicEditor.render('upPicEditor');
    upPicEditor.ready(function () {
        upPicEditor.setDisabled();
        upPicEditor.hide(); //隐藏UE框体
        upPicEditor.addListener('beforeInsertImage', function (t, arg) {
            //alert(arg[0].src); //arg就是上传图片的返回值，是个数组，如果上传多张图片，请遍历该值。
            $("#PicPreview").attr("src", arg[0].src);
        });
    })

    $(".btnUpPic").bind("click", function () {
        ShowUEImageDialog(upPicEditor);
    })

    if (languageCode == "cn")
        $(".spanLanguage").text("繁体");
    else if (languageCode == "big5")
        $(".spanLanguage").text("简体");
    else
        $(".spanLanguage").first().parent().parent().hide();
});

function CultureAdd() {
    var ce = {
        Code: $("#Code").val(),
        Name: $("#Name").val(),
        Describe: $("#Describe").val(),
        Text: editor.getContent(),
        Pic: $("#PicPreview").attr("src"),
        lCode: languageCode,
        isClone: $("#IsClone").prop("checked")
    }

    $.ajax({
        url: 'CultureAdd',
        type: 'post',
        data: ce,
        success: function (data) {
            if (data == "s") {
                alert("添加成功");
                parent.SetNav("企业文化列表");
                parent.SetNavSelected("Culture");
                window.location.href = "Nav?viewName=Culture";
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
