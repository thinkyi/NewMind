var languageCode = parent.g_languageCode;
var categoryID = parent.g_categoryID;
parent.g_isSetSize = false;
var editor;
var upPicEditor;
var picType = "BigPic";

jQuery(document).ready(function () {

    if (categoryID == 1) {
        $("#liRecommend").show();
        $(".liBigPic").show();
        $("#liShow").show();
        $("#liBigShow").show();
    }

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

    BindTypeSelect($("#PType1"), $("#PType2"), 0);
});

function ProductAdd() {
    if (!$("#PType2").val()) {
        alert("产品小类不能为空");
        return;
    }
    var pe = {
        ProductTypeID: $("#PType2").val(),
        Code: $("#Code").val(),
        Name: $("#Name").val(),
        Text: editor.getContent(),
        BigPic: $("#BigPicPreview").attr("src"),
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
                switch (parseInt(categoryID)) {
                    case 2:
                        parent.SetNav("广告印刷列表");
                        break;
                    case 3:
                        parent.SetNav("传单派发列表");
                        break;
                    default:
                        parent.SetNav("产品列表");
                        break;

                }
                parent.SetNavSelected("Product", categoryID);
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
