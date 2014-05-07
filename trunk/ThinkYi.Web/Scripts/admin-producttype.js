var languageCode = parent.g_languageCode;
var productTypeID = 0;
parent.g_jqGridCount = 2;

jQuery(document).ready(function () {
    jQuery("#pt1Grid").jqGrid({
        url: 'ProductTypeGrid?lCode=' + languageCode + "&ptid=" + productTypeID,
        datatype: 'json',
        sortname: 'ProductTypeID',
        colNames: ['序号', '语言', '父类型', '编码', '文本', '备注'],
        colModel: [
   		            { name: 'ProductTypeID', index: 'I18NID', width: 20, hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', width: 30, hidden: true },
   		            { name: 'ParentTypeID', index: 'OrderID', width: 30, hidden: true },
   		            { name: 'Code', index: 'Code', editable: true, width: 50 },
                    { name: 'Text', index: 'Text', editable: true, width: 160 },
                    { name: 'Remark', index: 'Remark', editable: true, hidden: true }
        ],
        height: parent.g_jqGridHeight - 86,
        rowNum: 500,
        pager: '#pt1Pager',
        pgbuttons: false,
        pginput: false,
        pgtext: false,
        viewrecords: true
    });
    $("#gbox_pt1Grid").addClass("ui-widget-content-remove-border1");
    jQuery("#pt1Grid").jqGrid(
        'navGrid'
        , '#pt1Pager'
        , { view: true, search: false, view: false }
        , {} //prmEdit
        , {} //prmAdd
        , {} //prmDel
        , {} //prmSearch
        , {} //prmView
    );

    jQuery("#pt2Grid").jqGrid({
        url: 'ProductTypeGrid?lCode=' + languageCode + "&ptid=" + 1,
        datatype: 'json',
        sortname: 'ProductTypeID',
        colNames: ['序号', '语言', '父类型', '编码', '文本', '备注'],
        colModel: [
   		            { name: 'ProductTypeID', index: 'I18NID', width: 20, hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', width: 30, hidden: true },
   		            { name: 'ParentTypeID', index: 'OrderID', width: 30, hidden: true },
   		            { name: 'Code', index: 'Code', editable: true, width: 50 },
                    { name: 'Text', index: 'Text', editable: true, width: 160 },
                    { name: 'Remark', index: 'Remark', editable: true, hidden: true }
        ],
        height: parent.g_jqGridHeight - 86,
        rowNum: 500,
        pager: '#pt2Pager',
        pgbuttons: false,
        pginput: false,
        pgtext: false,
        viewrecords: true
    });
    $("#gbox_pt2Grid").addClass("ui-widget-content-remove-border1");
    jQuery("#pt2Grid").jqGrid(
        'navGrid'
        , '#pt2Pager'
        , { view: true, search: false, view: false }
        , {} //prmEdit
        , {} //prmAdd
        , {} //prmDel
        , {} //prmSearch
        , {} //prmView
    );
});


function setJqgridSize(h, w) {
    $("#pt1Grid").setGridHeight(h - 86);
}
