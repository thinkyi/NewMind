var languageCode = parent.g_languageCode;
var i18nTypeID = 0;
parent.g_isSetSize = true;

jQuery(document).ready(function () {

    jQuery("#i18nGrid").jqGrid({
        url: '',
        datatype: 'json',
        sortname: 'I18NID',
        caption: '语言设置明细',
        colNames: ['序号', '排序', '编码', '名称', '备注'],
        colModel: [
   		            { name: 'I18NID', index: 'I18NID', editable: true, hidden: true },
   		            { name: 'OrderID', index: 'OrderID', editable: true, width: 60, editoptions: { size: 30 } },
   		            { name: 'Code', index: 'Code', editable: true, width: 100, editoptions: { size: 30, readonly: true } },
                    { name: 'Name', index: 'Name', editable: true, width: 150, editoptions: { size: 30 } },
                    { name: 'Remark', index: 'Remark', editable: true, width: 100, editoptions: { size: 30 } }
        ],
        height: parent.g_layoutCenterHeight - 111,
        altRows: true,
        altclass: 'altclass',
        rowNum: 50,
        rowList: [50, 100, 200],
        pager: '#i18nPager',
        viewrecords: true,
        editurl: 'I18NEdit',
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        }
    });
    $("#gbox_i18nGrid").addClass("ui-widget-content-remove-border1");
    jQuery("#i18nGrid").jqGrid(
        'navGrid'
        , '#i18nPager'
        , { view: true, search: false, view: false, add: false, del: false }
        , {} //prmEdit
        , {} //prmAdd
        , {} //prmDel
        , {} //prmSearch
        , {} //prmView
    );

    jQuery("#i18nTypeGrid").jqGrid({
        url: 'I18NTypeGrid?lCode=' + languageCode,
        datatype: 'json',
        sortname: 'I18NTypeID',
        caption: '语言设置类别',
        colNames: ['序号', '语言', '编码', '名称'],
        colModel: [
   		            { name: 'I18NTypeID', index: 'I18NTypeID', hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', hidden: true },
   		            { name: 'Code', index: 'Code', editable: true, width: 100 },
                    { name: 'Name', index: 'Name', editable: true, width: 150 }
        ],
        height: parent.g_layoutCenterHeight - 111,
        rowNum: 500,
        pager: '#i18nTypePager',
        pgbuttons: false,
        pginput: false,
        pgtext: false,
        viewrecords: true,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            i18nTypeID = $(this).jqGrid('getCell', rowid, 'I18NTypeID');
            jQuery("#i18nGrid").jqGrid('setGridParam', { url: 'I18NGrid?i18nTypeID=' + i18nTypeID, search: "false", datatype: "json" }).trigger("reloadGrid", [{ page: 1 }]);
        }
    });
    $("#gbox_i18nTypeGrid").addClass("ui-widget-content-remove-border1");
    jQuery("#i18nTypeGrid").jqGrid(
        'navGrid'
        , '#i18nTypePager'
        , { view: true, search: false, view: false, add: false, edit: false, del: false }
        , {} //prmEdit
        , {} //prmAdd
        , {} //prmDel
        , {} //prmSearch
        , {} //prmView
    );
});


function SetSize(h, w) {
    //set height
    $("#i18nTypeGrid").setGridHeight(h - 111);
    //set height
    $("#i18nGrid").setGridHeight(h - 111);
}
