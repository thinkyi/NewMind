var g_languageCode = "cn";
//jqGridRowID,jqGridWidth,jqGridHeight
var g_isSetSize = false, g_layoutCenterHeight = 300, g_layoutCenterWidth = 500;
var pageLayout;

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
            $("#accordion").accordion("refresh");
            if (n == "center") {
                g_layoutCenterHeight = s.innerHeight;
                g_layoutCenterWidth = s.innerWidth;
                if (g_isSetSize) {
                    mainFrame.SetSize(g_layoutCenterHeight, g_layoutCenterWidth);
                }
            }
        }
    });
    g_layoutCenterHeight = pageLayout.state.center.innerHeight;
    g_layoutCenterWidth = pageLayout.state.center.innerWidth;
    //#endregion

    //#region jquery ui
    var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };
    $("#accordion").accordion({
        heightStyle: "fill",
        icons: icons
    });

    $(".ui-accordion-header").addClass("ui-accordion-remove-border");
    $(".ui-accordion-content").addClass("ui-accordion-remove-border");

    $("#accordion li div").bind("click", function () {
        $("#accordion li div").removeClass("selected");
        $(this).addClass("selected");
        $("#mainFrame").attr("src", "Admin/" + $(this).attr("title"));

        SetNav($(this).find(".nav").text());
    });
    //#endregion

    SetLanguage();
    $(".language a").bind("click", function () {
        $(".language a").removeClass("active");
        $(this).addClass("active");
        g_languageCode = $(this).attr("name");
        mainFrame.location.reload();
    });
});

function SetLanguage() {
    $(".language a").each(function () {
        if ($(this).attr("name") == g_languageCode) {
            $(this).addClass("active");
        }
    });
}

function SetNav(text) {
    $(".ribbon").text(text);
}

function SetNavSelected(dtitle) {
    $("#accordion li div").removeClass("selected");
    $("#accordion li div[title='" + dtitle + "']").addClass("selected");
}