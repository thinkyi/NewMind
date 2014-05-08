var languageCode = parent.g_languageCode;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    var editor = UE.getEditor('editor');
    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
    })
    .click(function () {
        UE.getEditor('editor').setHeight(300);
    });
});

function SetSize(h, w) {
}