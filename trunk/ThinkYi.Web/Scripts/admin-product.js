var languageCode = parent.g_languageCode;
var categoryID = parent.g_categoryID;
var productID = 0;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    jQuery("#productGrid").jqGrid({
        url: 'ProductGrid?lCode=' + languageCode + "&categoryID=" + categoryID,
        datatype: 'json',
        sortname: 'ProductID',
        sortorder: 'desc',
        colNames: ['序号', '类别', '大类', '小类', '语言', '编码', '名称', '大图', '小图', '首页推荐', '首页显示'],
        colModel: [
   		            { name: 'ProductID', index: 'ProductID', hidden: true },
                    { name: 'ProductTypeID', index: 'ProductTypeID', hidden: true },
                    { name: 'BType', index: 'BType', width: 80 },
                    { name: 'SType', index: 'SType', width: 80 },
   		            { name: 'LanguageID', index: 'LanguageID', hidden: true },
   		            { name: 'Code', index: 'Code', width: 50 },
   		            { name: 'Name', index: 'Name' },
                    { name: 'BigPic', index: 'BigPic', align: 'center', width: 60, formatter: ImageIcoFormatter },
                    { name: 'SmallPic', index: 'SmallPic', align: 'center', width: 60, formatter: ImageIcoFormatter },
                    { name: 'IsRecommend', index: 'IsRecommend', align: 'center', width: 60, formatter: YNFormatter },
                    { name: 'IsShow', index: 'IsShow', align: 'center', width: 60, formatter: YNFormatter }
        ],
        height: parent.g_layoutCenterHeight - 86,
        autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [50, 100, 200],
        pager: '#productPager',
        viewrecords: true,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            productID = $(this).jqGrid('getCell', rowid, 'ProductID');
        }
    });
    $("#gbox_productGrid").addClass("ui-widget-content-remove-border");
    jQuery("#productGrid").jqGrid(
        'navGrid'
        , '#productPager'
        , { addfunc: AddFunc, editfunc: EditFunc } //prmView
        , {} //prmEdit
        , {} //prmAdd
        , {
            delData: {
                pid: function () {
                    var sel_id = $('#productGrid').jqGrid('getGridParam', 'selrow');
                    var value = $('#productGrid').jqGrid('getCell', sel_id, 'ProductID');
                    return value;
                }
            },
            url: 'ProductDel'
        } //prmDel
        , {} //prmSearch
        , {} //prmView
    );

});

function AddFunc() {
    switch (parseInt(categoryID)) {
        case 2:
            parent.SetNav("添加新广告印刷");
            break;
        case 3:
            parent.SetNav("添加新传单派发");
            break;
        default:
            parent.SetNav("添加新产品");
            break;

    }
    parent.SetNavSelected("ProductAdd", categoryID);
    window.location.href = "Nav?viewName=ProductAdd";
}

function EditFunc() {
    switch (parseInt(categoryID)) {
        case 2:
            parent.SetNav("编辑广告印刷");
            break;
        case 3:
            parent.SetNav("编辑传单派发");
            break;
        default:
            parent.SetNav("编辑产品");
            break;
    }
    window.location.href = "ProductEdit?productID=" + productID;
}

function SetSize(h, w) {
    $("#productGrid").setGridHeight(h - 86);
    $("#productGrid").setGridWidth(w);
}
