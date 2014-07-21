var languageCode = parent.g_languageCode;
var categoryID = parent.g_categoryID;
var parentTypeID = 0;
var ptEditData1;
var ptEditData2;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    jQuery("#pt2Grid").jqGrid({
        url: '',    //'ProductTypeGrid?lCode=' + languageCode + "&ptid=" + 1,
        datatype: 'json',
        sortname: 'ProductTypeID',
        caption: '小类设置',
        colNames: ['序号', '语言', '父类型', '编码', '名称', '备注'],
        colModel: [
                    { name: 'ProductTypeID', index: 'I18NID', editable: true, width: 20, hidden: true },
                    { name: 'LanguageID', index: 'LanguageID', width: 30, hidden: true },
                    { name: 'ParentTypeID', index: 'OrderID', width: 30, hidden: true },
                    { name: 'Code', index: 'Code', editable: true, width: 100, editoptions: { size: 30 } },
                    { name: 'Name', index: 'Name', editable: true, width: 150, editoptions: { size: 30 } },
                    { name: 'Remark', index: 'Remark', editable: true, width: 100, editoptions: { size: 30 } }
        ],
        height: parent.g_layoutCenterHeight - 111,
        rowNum: 500,
        pager: '#pt2Pager',
        pgbuttons: false,
        pginput: false,
        pgtext: false,
        viewrecords: true,
        editurl: 'ProductTypeEdit',
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        }
    });
    $("#gbox_pt2Grid").addClass("ui-widget-content-remove-border1");
    jQuery("#pt2Grid").jqGrid(
        'navGrid'
        , '#pt2Pager'
        , { view: true, search: false, view: false }
        , {} //prmEdit
        , { editData: { ParentTypeID: function () { return parentTypeID; }, CategoryID: categoryID, lCode: languageCode }, url: 'ProductTypeAdd' } //prmAdd
        , {
            delData: {
                ptid: function () {
                    var sel_id = $('#pt2Grid').jqGrid('getGridParam', 'selrow');
                    var value = $('#pt2Grid').jqGrid('getCell', sel_id, 'ProductTypeID');
                    return value;
                }
            },
            beforeSubmit: PT2BeforeSubmit,
            url: 'ProductTypeDel'
        } //prmDel
        , {} //prmSearch
        , {} //prmView
    );

    jQuery("#pt1Grid").jqGrid({
        url: 'ProductTypeGrid?lCode=' + languageCode + "&categoryID=" + categoryID + "&ptid=" + parentTypeID,
        datatype: 'json',
        sortname: 'ProductTypeID',
        caption: '大类设置',
        colNames: ['序号', '语言', '父类型', '分类', '编码', '名称', '备注'],
        colModel: [
   		            { name: 'ProductTypeID', index: 'I18NID', editable: true, width: 20, hidden: true },
   		            { name: 'LanguageID', index: 'LanguageID', width: 30, hidden: true },
   		            { name: 'ParentTypeID', index: 'OrderID', width: 30, hidden: true },
                    { name: 'CategoryID', index: 'CategoryID', width: 30, hidden: true },
   		            { name: 'Code', index: 'Code', editable: true, width: 100 },
                    { name: 'Name', index: 'Name', editable: true, width: 150 },
                    { name: 'Remark', index: 'Remark', editable: true, width: 100 }
        ],
        height: parent.g_layoutCenterHeight - 111,
        rowNum: 500,
        pager: '#pt1Pager',
        pgbuttons: false,
        pginput: false,
        pgtext: false,
        viewrecords: true,
        editurl: 'ProductTypeEdit',
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            parentTypeID = $(this).jqGrid('getCell', rowid, 'ProductTypeID');
            jQuery("#pt2Grid").jqGrid('setGridParam', { url: 'ProductTypeGrid?lCode=' + languageCode + "&categoryID=" + categoryID + "&ptid=" + parentTypeID, search: "false", datatype: "json" }).trigger("reloadGrid", [{ page: 1 }]);
        }
    });
    $("#gbox_pt1Grid").addClass("ui-widget-content-remove-border1");
    jQuery("#pt1Grid").jqGrid(
        'navGrid'
        , '#pt1Pager'
        , { view: true, search: false, view: false }
        , {} //prmEdit
        , { editData: { ParentTypeID: 0, CategoryID: categoryID, lCode: languageCode }, url: 'ProductTypeAdd' } //prmAdd
        , {
            delData: {
                ptid: function () {
                    var sel_id = $('#pt1Grid').jqGrid('getGridParam', 'selrow');
                    var value = $('#pt1Grid').jqGrid('getCell', sel_id, 'ProductTypeID');
                    return value;
                }
            },
            beforeSubmit: PT1BeforeSubmit,
            url: 'ProductTypeDel'
        } //prmDel
        , {} //prmSearch
        , {} //prmView
    );
});


function SetSize(h, w) {
    $("#pt1Grid").setGridHeight(h - 111);
    $("#pt2Grid").setGridHeight(h - 111);
}

function PTBeforeSubmit(ptid) {
    $.ajax({
        url: 'PTSubmitVerify',
        async: false,
        type: 'post',
        data: { ptid: ptid },
        success: function (data) {
            var success = data == 0 ? true : false;
            var message = "验证成功";
            if (data == 1) {
                message = "请先删除大类下面的小类。";
            }
            else if (data = 2) {
                message = "请先删除小类下面的产品。";
            }
            result = [success, message];
        },
        error: function (msg) {
            result = [false, "err: system error"];
        }
    });
    return result;
}

function PT1BeforeSubmit(postdata, formid) {
    var sel_id = $('#pt1Grid').jqGrid('getGridParam', 'selrow');
    var value = $('#pt1Grid').jqGrid('getCell', sel_id, 'ProductTypeID');
    return PTBeforeSubmit(value);
}

function PT2BeforeSubmit(postdata, formid) {
    var sel_id = $('#pt2Grid').jqGrid('getGridParam', 'selrow');
    var value = $('#pt2Grid').jqGrid('getCell', sel_id, 'ProductTypeID');
    return PTBeforeSubmit(value);
}