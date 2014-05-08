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
                    { name: 'BType', index: 'BType' },
                    { name: 'SType', index: 'SType' },
   		            { name: 'LanguageID', index: 'LanguageID', hidden: true },
   		            { name: 'Code', index: 'Code' },
   		            { name: 'Name', index: 'Name' },
                    { name: 'SmallPic', index: 'SmallPic' },
                    { name: 'BigPic', index: 'BigPic' },
                    { name: 'IsRecommend', index: 'IsRecommend' },
                    { name: 'IsShow', index: 'IsShow' }
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
    alert("a");
}

function SetSize(h, w) {
    
}
