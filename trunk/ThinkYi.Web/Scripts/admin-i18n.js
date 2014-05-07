var languageCode = parent.g_languageCode;
parent.g_jqGridCount = 1;

jQuery(document).ready(function () {
    jQuery("#i18nGrid").jqGrid({
        url: 'I18NGrid?lCode=' + languageCode,
        datatype: 'json',
        sortname: 'OrderID',
        colNames: ['序号', '语言', '排序', '类型', '编码', '文本', '备注'],
        colModel: [
   		            { name: 'I18NID', index: 'I18NID', width: 20, hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', width: 30 },
   		            { name: 'OrderID', index: 'OrderID', width: 30 },
   		            { name: 'Type', index: 'Type', width: 30 },
   		            { name: 'Code', index: 'Code', editable: true, width: 50 },
                    { name: 'Text', index: 'Text', editable: true, width: 60 },
                    { name: 'Remark', index: 'Remark', editable: true }
        ],
        height: parent.g_jqGridHeight - 86,
        autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [10, 20, 50, 100, 500],
        pager: '#i18nPager',
        viewrecords: true

    });
    $("#gbox_i18nGrid").addClass("ui-widget-content-remove-border");
    jQuery("#i18nGrid").jqGrid(
        'navGrid'
        , '#i18nPager'
        , { view: true } //prmView
        , {} //prmEdit
        , {} //prmAdd
        , {} //prmDel
        , {} //prmSearch
        , {} //prmView
    );

});


function setJqgridSize(h, w) {
    //set height
    $("#i18nGrid").setGridHeight(h - 86);
    //set width
    $("#i18nGrid").setGridWidth(w);
}
