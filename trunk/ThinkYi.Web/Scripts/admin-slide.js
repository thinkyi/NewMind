var languageCode = parent.g_languageCode;
var upPicEditor;
var btnID = 0;
parent.g_isSetSize = false;

jQuery(document).ready(function () {
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        SlideUpdate();
    });
    SlideInit();

    upPicEditor = new UE.ui.Editor();
    upPicEditor.render('upPicEditor');
    upPicEditor.ready(function () {
        upPicEditor.setDisabled();
        upPicEditor.hide(); //隐藏UE框体
        upPicEditor.addListener('beforeInsertImage', function (t, arg) {
            //alert(arg[0].src); //arg就是上传图片的返回值，是个数组，如果上传多张图片，请遍历该值。
            $("#Preview_" + btnID).attr("src", arg[0].src);
        });
    })

    $(".btnUpPic").bind("click", function () {
        btnID = $(this).attr("id");
        ShowUEImageDialog(upPicEditor);
    })
});

function SlideInit() {
    $.ajax({
        url: 'GetSlides',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var id = i + 1;
                var title = data[i].Title;
                var url = data[i].Url;
                var image = data[i].Image;
                if (image) {
                    $("#Preview_" + id).attr("src", image);
                }
                $("#Title_" + id).val(title);
                $("#Url_" + id).val(url);
            }
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}

function SlideUpdate() {
    var slides = [];
    for (var i = 1; i <= 5; i++) {
        var slideID = i;
        var title = $('#Title_' + i).val();
        var image = $('#Preview_' + i).attr('src');
        var url = $('#Url_' + i).val();
        var entity = { SlideID: slideID, Title: title, Image: image, Url: url };
        slides.push({ SlideID: slideID, Title: title, Image: image, Url: url });
    }
    $.ajax({
        url: 'SlideUpdate?n=' + Math.random(),
        type: 'post',
        data: { jsonData: JSON.stringify(slides) },
        success: function (data) {

        },
        error: function (msg) {
            alert("保存失败");
        }
    });
}
