function ShowUEImageDialog(editor) {
    var ueiDialog = editor.getDialog("insertimage");
    ueiDialog.render();
    ueiDialog.open();
}

function BindTypeSelect(pt1, pt2) {
    var ptID = 0;
    var json;
    $(pt1).change(function () {
        ptID = $(this).val();
        BindSmallType(pt2, ptID, json);
    });
    $.ajax({
        url: 'GetProductTypes?lCode=' + languageCode,
        success: function (data) {
            json = data;
            for (var i = 0; i < json.length; i++) {
                if (json[i].ParentTypeID == 0) {
                    if (i == 0) {
                        ptID = json[i].ProductTypeID;
                        BindSmallType(pt2, ptID, json);
                    }
                    $(pt1).append("<option value='" + json[i].ProductTypeID + "'>" + json[i].Name + "</option>");
                }
            }
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}

function BindSmallType(pt, ptid, json) {
    $(pt).empty();
    if (ptid > 0) {
        for (var i = 0; i < json.length; i++) {
            if (json[i].ParentTypeID == ptid) {
                $(pt).append("<option value='" + json[i].ProductTypeID + "'>" + json[i].Name + "</option>");
            }
        }
    }
}

function ImageIcoFormatter(cellvalue, options, rowdata) {
    if (cellvalue) {
        return '<a style="margin:0px; padding:0px;" class="example-image-link" href="' + cellvalue + '" data-lightbox="' + options.colModel.name + options.rowId + '"><img style="margin:0px auto;" src="../Content/images/admin/image_ico.png" alt="点击查看" /></a>';
    }
    else
        return cellvalue;
}

function YNFormatter(cellvalue, options, rowdata) {
    if (cellvalue == "True") {
        return '<span style="color:green;">是</span>';
    }
    else
        return '<span>否</span>';
}