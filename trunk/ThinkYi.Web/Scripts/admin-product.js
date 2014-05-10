var languageCode = parent.g_languageCode;
parent.g_isSetSize = true;

jQuery(document).ready(function () {
    jQuery("#productGrid").jqGrid({
        url: 'ProductGrid?lCode=' + languageCode,
        datatype: 'json',
        sortname: 'ProductID',
        colNames: ['序号', '类别', '大类', '小类', '语言', '编码', '名称', '小图', '大图', '首页推荐', '首页显示'],
        colModel: [
   		            { name: 'ProductID', index: 'ProductID', hidden: true },
                    { name: 'ProductTypeID', index: 'ProductTypeID', hidden: true },
                    { name: 'BType', index: 'BType', width: 80 },
                    { name: 'SType', index: 'SType', width: 80 },
   		            { name: 'LanguageID', index: 'LanguageID', hidden: true },
   		            { name: 'Code', index: 'Code', width: 50 },
   		            { name: 'Name', index: 'Name' },
                    { name: 'SmallPic', index: 'SmallPic', align: 'center', width: 60, formatter: ImageIcoFormatter },
                    { name: 'BigPic', index: 'BigPic', align: 'center', width: 60, formatter: ImageIcoFormatter },
                    { name: 'IsRecommend', index: 'IsRecommend', align: 'center', width: 60, formatter: YNFormatter },
                    { name: 'IsShow', index: 'IsShow', align: 'center', width: 60, formatter: YNFormatter }
        ],
        height: parent.g_layoutCenterHeight - 86,
        autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [50, 100, 200],
        pager: '#productPager',
        viewrecords: true

    });
    $("#gbox_productGrid").addClass("ui-widget-content-remove-border");
    jQuery("#productGrid").jqGrid(
        'navGrid'
        , '#productPager'
        , { addfunc: AddFunc } //prmView
    );

});

function AddFunc() {
    parent.SetNav("添加产品");
    parent.SetNavSelected("ProductAdd");
    window.location.href = "ProductAdd";
}

function SetSize(h, w) {
    $("#productGrid").setGridHeight(h - 86);
    $("#productGrid").setGridWidth(w);
}
