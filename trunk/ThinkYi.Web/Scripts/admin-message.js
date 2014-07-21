var languageCode = parent.g_languageCode;
var messageID = 0;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    jQuery("#messageGrid").jqGrid({
        url: 'MessageGrid',
        datatype: 'json',
        sortname: 'CreateDate',
        sortorder: 'desc',
        colNames: ['序号', '客户名称', '联系方式', 'IP地址', '标题', '留言内容', '留言时间', '回复内容', '回复时间'],
        colModel: [
   		            { name: 'MessageID', index: 'MessageID', hidden: true },
   		            { name: 'Client', index: 'Client' },
   		            { name: 'Contact', index: 'Contact' },
   		            { name: 'IP', index: 'IP' },
                    { name: 'Title', index: 'Title' },
                    { name: 'Text', index: 'Text' },
                    { name: 'CreateDate', index: 'CreateDate' },
                    { name: 'Reply', index: 'Reply' },
                    { name: 'ReplyDate', index: 'ReplyDate' }
        ],
        height: parent.g_layoutCenterHeight - 86,
        autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [50, 100, 200],
        pager: '#messagePager',
        viewrecords: true,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            messageID = $(this).jqGrid('getCell', rowid, 'MessageID');
        }
    });
    $("#gbox_messageGrid").addClass("ui-widget-content-remove-border");
    jQuery("#messageGrid").jqGrid(
        'navGrid'
        , '#messagePager'
        , { view: true } //prmView
        , {} //prmEdit
        , {} //prmAdd
        , {
            delData: {
                mid: function () {
                    var sel_id = $('#messageGrid').jqGrid('getGridParam', 'selrow');
                    var value = $('#messageGrid').jqGrid('getCell', sel_id, 'MessageID');
                    return value;
                }
            },
            url: 'MessageDel'
        } //prmDel
        , {} //prmSearch
        , { width: 600 } //prmView
    );
});

function SetSize(h, w) {
    $("#informationGrid").setGridHeight(h - 86);
    $("#informationGrid").setGridWidth(w);
}
