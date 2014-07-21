var languageCode = parent.g_languageCode;
var informationID = 0;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    jQuery("#informationGrid").jqGrid({
        url: 'InformationGrid?lCode=' + languageCode,
        datatype: 'json',
        sortname: 'InformationID',
        sortorder: 'desc',
        colNames: ['序号', '语言', '编码', '名称', '发布日期'],
        colModel: [
   		            { name: 'InformationID', index: 'InformationID', hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', hidden: true },
   		            { name: 'Code', index: 'Code' },
   		            { name: 'Name', index: 'Name' },
                    { name: 'Date', index: 'Date' }
        ],
        height: parent.g_layoutCenterHeight - 86,
        autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [50, 100, 200],
        pager: '#informationPager',
        viewrecords: true,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            informationID = $(this).jqGrid('getCell', rowid, 'InformationID');
        }
    });
    $("#gbox_informationGrid").addClass("ui-widget-content-remove-border");
    jQuery("#informationGrid").jqGrid(
        'navGrid'
        , '#informationPager'
        , { addfunc: AddFunc, editfunc: EditFunc } //prmView
        , {} //prmEdit
        , {} //prmAdd
        , {
            delData: {
                iid: function () {
                    var sel_id = $('#informationGrid').jqGrid('getGridParam', 'selrow');
                    var value = $('#informationGrid').jqGrid('getCell', sel_id, 'InformationID');
                    return value;
                }
            },
            url: 'InformationDel'
        } //prmDel
        , {} //prmSearch
        , {} //prmView
    );

});

function AddFunc() {
    parent.SetNav("添加行业知识");
    parent.SetNavSelected("InformationAdd");
    window.location.href = "Nav?viewName=InformationAdd";
}

function EditFunc() {
    parent.SetNav("编辑行业知识");
    window.location.href = "InformationEdit?informationID=" + informationID;
}

function SetSize(h, w) {
    $("#informationGrid").setGridHeight(h - 86);
    $("#informationGrid").setGridWidth(w);
}
