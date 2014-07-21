var g_languageCode = "cn";
var g_navCode;
var g_categoryID = 1;
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
        g_navCode = $(this).attr("code");
        g_categoryID = $(this).attr("category");
        $("#mainFrame").attr("src", "Admin/Nav?viewName=" + $(this).attr("view"));

        SetNav($(this).find(".nav").text());
    });

    $("#resetDialog").dialog({
        autoOpen: false,
        width: 300,
        caption: "abc",
        modal: true,
        resizable: false,
        buttons: {
            确定: function () {
                UserEdit();
            },
            取消: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });
    //#endregion

    SetLanguage();
    $(".language a").bind("click", function () {
        $(".language a").removeClass("active");
        $(this).addClass("active");
        g_languageCode = $(this).attr("name");
        mainFrame.location.reload();
    });

    $("#reset").click(function () {
        $("#resetDialog").dialog("open");
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

function SetNavSelected(viewName, categoryID) {
    $("#accordion li div").removeClass("selected");
    $("#accordion li div[view='" + viewName + "'][category=" + categoryID + "]").addClass("selected");
}

function UserEdit() {
    var oldPwd = $("#OldPwd").val();
    var newPwd = $("#NewPwd").val();
    var opwd = {
        oldPwd: oldPwd,
        newPwd: newPwd
    }
    if (!oldPwd) {
        alert("请输入旧密码");
        return;
    }
    if (!newPwd) {
        alert("请输入新密码");
        return;
    }
    $.ajax({
        url: '/Account/UserEdit',
        type: 'post',
        data: opwd,
        success: function (data) {
            if (data == "s") {
                $("#OldPwd").val("");
                $("#NewPwd").val("");
                alert("密码修改成功");
                $("#resetDialog").dialog("close");
            }
            else {
                alert(data);
                $("#OldPwd").val("");
                $("#NewPwd").val("");
            }
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}