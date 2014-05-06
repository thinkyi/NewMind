//#region jqGrid options.prmNames

var prmNames = {
    page: "Page"                // 表示请求页码的参数名称  
    , rows: "Rows"              // 表示请求行数的参数名称  
    , sort: "Sidx"              // 表示用于排序的列名的参数名称  
    , order: "Sord"             // 表示采用的排序方式的参数名称  
    , search: "IsSearch"        // 表示是否是搜索请求的参数名称  
    , nd: "ND"                  // 表示已经发送请求的次数的参数名称  
    , id: "ID"                  // 表示当在编辑数据模块中发送数据时，使用的id的名称  
    , oper: "Oper"              // operation参数名称（我暂时还没用到）  
    , editoper: "Edit"          // 当在edit模式中提交数据时，操作的名称  
    , addoper: "Add"            // 当在add模式中提交数据时，操作的名称  
    , deloper: "Del"            // 当在delete模式中提交数据时，操作的名称  
    , subgridid: "ID"           // 当点击以载入数据到子表时，传递的数据名称  
    //,npage: null
    , totalrows: "TotalRows"    // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal  
}

//#endregion

jQuery(document).ready(function () {

    //#region create page layout

    pageLayout = $('body').layout({
        scrollToBookmarkOnLoad: false, // handled by custom code so can 'unhide' section first
        defaults: {},
        north: {
            size: 85
			, spacing_open: 0
			, closable: false
			, resizable: false
        },
        west: {
            size: 210
            , closable: true
			, resizable: true
        },
        /*
        Callback Parameters:
        pane name - Always one of: "north", "south", "east" or "west"
        pane element - The pane-element the callback was for, inside a jQuery wrapper
        pane state - The 'state branch' for this pane, eg: state.north
        pane options - The 'option branch' for this pane, eg: options.north
        layout name - If a 'name' was specified when creating the layout, else returns an empty string.
        */
        onresize: function (n, e, s) {
            if (n == "center") {
            }
        }
    });

    //#endregion

    //#region jquery ui
    var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };
    $("#accordion").accordion({
        icons: icons
    });

    $(".ui-accordion-header").addClass("ui-accordion-remove-border");
    $(".ui-accordion-content").addClass("ui-accordion-remove-border");

    $("#accordion li div").bind("click", function () {
        $("#accordion li div").removeClass("selected");
        $(this).addClass("selected");
    });
    //#endregion
});
