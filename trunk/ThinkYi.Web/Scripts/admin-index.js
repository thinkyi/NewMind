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
