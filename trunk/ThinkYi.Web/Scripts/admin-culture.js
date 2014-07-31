var languageCode = parent.g_languageCode;
var cultureID = 0;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    jQuery("#cultureGrid").jqGrid({
        url: 'CultureGrid?lCode=' + languageCode,
        datatype: 'json',
        sortname: 'CultureID',
        sortorder: 'desc',
        colNames: ['序号', '语言', '编码', '概述', '小图'],
        colModel: [
   		            { name: 'CultureID', index: 'CultureID', hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', hidden: true },
   		            { name: 'Code', index: 'Code' },
   		            { name: 'Describe', index: 'Describe' },
                    { name: 'Pic', index: 'Pic', formatter: ImageIcoFormatter }
        ],
        height: parent.g_layoutCenterHeight - 86,
        autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [50, 100, 200],
        pager: '#culturePager',
        viewrecords: true,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            cultureID = $(this).jqGrid('getCell', rowid, 'CultureID');
        }
    });
    $("#gbox_cultureGrid").addClass("ui-widget-content-remove-border");
    jQuery("#cultureGrid").jqGrid(
        'navGrid'
        , '#culturePager'
        , { addfunc: AddFunc, editfunc: EditFunc } //prmView
        , {} //prmEdit
        , {} //prmAdd
        , {
            delData: {
                cid: function () {
                    var sel_id = $('#cultureGrid').jqGrid('getGridParam', 'selrow');
                    var value = $('#cultureGrid').jqGrid('getCell', sel_id, 'CultureID');
                    return value;
                }
            },
            url: 'CultureDel'
        } //prmDel
        , {} //prmSearch
        , {} //prmView
    );

});

function AddFunc() {
    parent.SetNav("添加企业文化");
    parent.SetNavSelected("CultureAdd");
    window.location.href = "Nav?viewName=CultureAdd";
}

function EditFunc() {
    parent.SetNav("编辑企业文化");
    window.location.href = "CultureEdit?cultureID=" + cultureID;
}

function SetSize(h, w) {
    $("#informationGrid").setGridHeight(h - 86);
    $("#informationGrid").setGridWidth(w);
}
