var emptyGuid = "00000000-0000-0000-0000-000000000000";
var SheetID, CellID, RangeID, RowID, ColumnID;
//UpdatePrivateFormat
var upfType = "Cell", upfID = emptyGuid;
//oType=$("#OperateType");object type
var oType;
//layout
var pageLayout;
//zTree
var zTree;
//the select treeNode
var zTreeNode;
//rMenu
var rMenu;
//jqGridRowID,jqGridWidth,jqGridHeight
var jqGridRowID = 0, jqGridWidth = 500, jqGridHeight = 300;

//#region zTree setting

var setting = {
    async: {
        enable: true,
        url: "Manage/GetExcelTree",
        autoParam: ["SheetID=pid"]
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "SheetID",
            pIdKey: "BookID",
            rootPId: emptyGuid
        },
        key: {
            name: "Name"
        }
    },
    callback: {
        onRightClick: OnRightClick,
        onClick: onNodeClick,
        onAsyncSuccess: onAsyncSuccess
    }
};

//#endregion

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
            size: 78
			, spacing_open: 0
			, closable: false
			, resizable: false
        },
        west: {
            size: 250
            , closable: true
			, resizable: true
            , initClosed: true
        },
        east: {
            size: 305
            , closable: true
			, resizable: false
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
                jqGridHeight = s.innerHeight - 83;
                jqGridWidth = s.innerWidth;
                setJqgridSize(jqGridWidth, jqGridHeight);
            }
        }
    });
    pageLayout.open("west");
    jqGridWidth = pageLayout.state.center.innerWidth;
    jqGridHeight = pageLayout.state.center.innerHeight - 83;

    //#endregion

    //#region colpick

    $(".color").colpick({
        layout: 'rgbhex',
        onBeforeShow: function (el) {
            var rgb = $(this).val();
            if (rgb) {
                $(this).colpickSetColor({ r: rgb.substr(0, 3), g: rgb.substr(3, 3), b: rgb.substr(6, 3) });
            }
        },
        onSubmit: function (hsb, hex, rgb, el) {
            $(el).css('border-color', '#' + hex);
            $(el).val(pad(rgb.r, 3).toString() + pad(rgb.g, 3).toString() + pad(rgb.b, 3).toString());
            $(el).colpickHide();
            $("#btnSave").button("option", "disabled", false);
        }
    });
    //#endregion

    //#region jquery ui

    $("#menu").menu();
    $("#tabs-center").tabs({
        activate: function (event, ui) {
            upfType = $(ui.newTab).text();
            LoadJqGrid(upfType);
            setJqgridSize(jqGridWidth, jqGridHeight);
        }
    });
    $("#tabs-east").tabs();
    $("#tabs-west").tabs();

    $("#tabs-center > ul").addClass("ui-widget-header-custom");
    $("#tabs-east > ul").addClass("ui-widget-header-custom");
    $("#tabs-west > ul").addClass("ui-widget-header-custom");

    $("#btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        },
        disabled: true
    })
    .click(function () {
        UpdatePrivateFormat(upfID, upfType);
    });

    $("#TypeID").bind("change", function () {
        if ($(this).val() == 0) {
            $("#Connection").closest("div").show();
        }
        else {
            $("#Connection").closest("div").hide();
        }
    });

    $("#private-format input").bind("change", function () {
        $("#btnSave").button("option", "disabled", false);
    });
    $("#private-format select").bind("change", function () {
        $("#btnSave").button("option", "disabled", false);
    });

    var name = $("#Name"),
        typeID = $("#TypeID"),
        connection = $("#Connection"),
        rfc = $("#RFCFunction"),
        cmdText = $("#CommandText"),
        parm = $("#Parameters"),
        fcXML = $("#FormatConditionXML"),
        printArea = $("#PrintArea"),
        isGroup = $("#IsGroup"),
        orderID = $("#OrderID"),
        allFields = $([]).add(name).add(typeID).add(connection).add(rfc).add(cmdText).add(parm).add(fcXML).add(printArea).add(isGroup).add(orderID),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
        .show()
        .text(t)
        .addClass("ui-state-highlight");
        //setTimeout(function () {
        //    tips.removeClass("ui-state-highlight", 1500);
        //}, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }
    $("#dialog-form").dialog({
        autoOpen: false,
        width: 236,
        modal: true,
        resizable: false,
        position: [3, 115],
        buttons: {
            Submit: function () {
                var bValid = true;
                allFields.removeClass("ui-state-error");
                if (oType.val().indexOf("del") == -1) {
                    bValid = bValid && checkLength(name, "Name", 1, 100);
                }
                //bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.");
                //bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com");
                //bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

                if (!zTreeNode) {
                    val0 = emptyGuid;
                    val1 = emptyGuid;
                }
                else {
                    var val0 = zTreeNode.BookID;
                    var val1 = zTreeNode.SheetID;
                    //sheet add操作是在父节点右键，所以父节点ID(BookID)应取当前操作节点的ID(即SheetID)
                    if (oType.val().indexOf("sheet-add") > -1) {
                        val0 = val1;
                    }
                }
                var val2 = oType.val();
                var val3 = $.trim(name.val());
                var val4 = typeID.val();
                var val5 = $.trim(connection.val());
                var val6 = $.trim(rfc.val());
                var val7 = $.trim(cmdText.val());
                var val8 = $.trim(parm.val());
                var val9 = $.trim(fcXML.val());
                var val10 = $.trim(printArea.val());
                var val11 = isGroup.val();
                var val12 = $.trim(orderID.val());

                var excelTreeEntity = {
                    PID: val0,
                    CID: val1,
                    OperateType: val2,
                    Name: val3,
                    TypeID: val4,
                    Connection: val5,
                    RFCFunction: val6,
                    CommandText: val7,
                    Parameters: val8,
                    FormatConditionXML: val9,
                    PrintArea: val10,
                    IsGroup: val11,
                    OrderID: val12
                };

                if (bValid) {
                    var myDialog = $(this);
                    $.ajax({
                        url: 'Manage/UpdateExcelTree',
                        type: "post",
                        data: excelTreeEntity,
                        success: function (data) {
                            if (data) {
                                updateTips(data);
                            }
                            else {
                                var node = null;
                                var oTypeValue = oType.val();
                                if (oTypeValue.indexOf("sheet") > -1) {
                                    if (oTypeValue == "sheet-add") {
                                        node = zTreeNode;
                                    }
                                    else {
                                        node = zTreeNode.getParentNode();
                                    }
                                }
                                zTree.reAsyncChildNodes(node, "refresh");
                                myDialog.dialog("close");
                            }

                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#dialog-form-template").dialog({
        autoOpen: false,
        width: 600,
        modal: true,
        resizable: false,
        //position: [3, 115],
        buttons: {
            Submit: function () {
                var sheetID = zTreeNode.SheetID;
                var rowStartNumber = $("#RowStartNumber").val();
                var rowEndNumber = $("#RowEndNumber").val();
                var columnStartCode = $("#ColumnStartCode").val();
                var columnEndCode = $("#ColumnEndCode").val();
                ajaxFileUpload(sheetID, rowStartNumber, rowEndNumber, columnStartCode, columnEndCode);
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });

    //#endregion

    //#region zTree

    $("#menu li").bind("click", function () {
        tips.hide();
        rMenu.css({ "visibility": "hidden" });
        $("#dialog-form").dialog("open");
        if ($(".ui-dialog-titlebar").length > 0) {
            $("#dialog-form").css("min-height", "30px");
            $(".ui-dialog-titlebar").addClass("ui-dialog-titlebar-custom");
            $(".ui-dialog-buttonpane").addClass("ui-dialog-buttonpane-custom");
            $(".ui-dialog-buttonpane .ui-dialog-buttonset .ui-button-text").addClass("button-icon-left-custom");
            $(".ui-dialog-buttonpane .ui-dialog-buttonset .ui-button-text").first().append('<span class="ui-icon ui-icon-disk"></span>');
            $(".ui-dialog-buttonpane .ui-dialog-buttonset .ui-button-text").last().append('<span class="ui-icon ui-icon-close"></span>');
        }
        var liID = $(this).attr("id");
        oType = $("#OperateType");
        $("#dialog-form > div").each(function () {
            $(this).hide();
            if ($(this).attr("map").indexOf(liID) > -1) {
                $(this).show();
            }
        });
        switch (liID) {
            case "add-book":
                oType.val("book-add");
                $("#dialog-form").dialog("option", "title", "Add book");
                break;
            case "modify-book":
                oType.val("book-edit");
                $("#Name").val(zTreeNode.Name);
                $("#TypeID").val(zTreeNode.TypeID);
                $("#Connection").val(zTreeNode.Connection);
                $("#OrderID").val(zTreeNode.OrderID);
                if (zTreeNode.TypeID == 0) {
                    $("#Connection").closest("div").show();
                }
                else {
                    $("#Connection").closest("div").hide();
                }
                $("#dialog-form").dialog("option", "title", "Book modify");
                break;
            case "remove-book":
                oType.val("book-del");
                updateTips("Delete selected Book[" + zTreeNode.Name + "]?");
                break;
            case "add-sheet":
                oType.val("sheet-add");
                if (zTreeNode.TypeID == 1) {
                    $("#CommandText").closest("div").hide();
                }
                else {
                    $("#RFCFunction").closest("div").hide();
                }
                $("#dialog-form").dialog("option", "title", "Add sheet");
                break;
            case "modify-sheet":
                oType.val("sheet-edit");
                if (zTreeNode.getParentNode().TypeID == 1) {
                    $("#CommandText").closest("div").hide();
                }
                else {
                    $("#RFCFunction").closest("div").hide();
                }
                $("#Name").val(zTreeNode.Name);
                $("#RFCFunction").val(zTreeNode.RFCFunction);
                $("#CommandText").val(zTreeNode.CommandText);
                $("#Parameters").val(zTreeNode.Parameters);
                $("#FormatConditionXML").val(zTreeNode.FormatConditionXML);
                $("#PrintArea").val(zTreeNode.PrintArea);
                $("#IsGroup").val(zTreeNode.IsGroup);
                $("#OrderID").val(zTreeNode.OrderID);
                $("#dialog-form").dialog("option", "title", "Sheet modify");
                break;
            case "template-sheet":
                $("#dialog-form").dialog("close");
                $("#dialog-form-template").dialog("open");
                $("#SheetName").val(zTreeNode.Name);
                break;
            case "remove-sheet":
                oType.val("sheet-del");
                updateTips("Delete selected Sheet[" + zTreeNode.Name + "]?");
                break;
        }
    });

    zTree = $.fn.zTree.init($("#excel-tree"), setting);

    //#endregion

    //#region jqGrid CellGrid

    jQuery("#cellgrid").jqGrid({
        url: '', //Manage/CellGrid
        datatype: 'json',
        hidegrid: true,
        hiddengrid: true,
        prmNames: prmNames,
        datatype: 'local',
        colNames: ['CellID', 'SheetID', 'BorderID', 'AlignmentID', 'FontID', 'Code', 'Value', 'Type', 'Field', 'NumberFormat', 'Background', 'Formula'],
        colModel: [
   		            { name: 'CellID', index: 'CellID', hidden: true, editable: false },
   		            { name: 'SheetID', index: 'SheetID', hidden: true },
   		            { name: 'BorderID', index: 'BorderID', hidden: true },
   		            { name: 'AlignmentID', index: 'AlignmentID', hidden: true },
   		            { name: 'FontID', index: 'FontID', hidden: true },
   		            { name: 'Code', index: 'Code', editable: true, editrules: { required: true } },
		            { name: 'Value', index: 'Value', editable: true, editoptions: { size: 45 } },
   		            { name: 'TypeID', index: 'TypeID', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: ':;10:HEAD;100:LIST' }, stype: 'select', searchoptions: { value: ':;10:HEAD;100:LIST' } },
                    { name: 'Field', index: 'Field', editable: true },
                    { name: 'NumberFormat', index: 'NumberFormat', editable: true, editoptions: { size: 45 } },
                    { name: 'Background', index: 'Background', editable: true },
                    { name: 'Formula', index: 'Formula', editable: true, editoptions: { size: 45 } }
                    //{ name: 'DelMode', index: 'DelMode', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: '0:;1:Shift cells left;2:Shift cells up' } }
        ],
        //autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [10, 20, 50, 100, 500],
        pager: '#cellpager',
        sortname: 'Code',
        viewrecords: true,
        sortorder: "desc",
        //caption: "Navigator Example",
        editurl: 'Manage/CellEdit',
        width: jqGridWidth,
        height: jqGridHeight,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            jqGridRowID = rowid;
            CellID = $(this).jqGrid('getCell', jqGridRowID, 'CellID');
            upfID = CellID;
            upfType = "Cell";
            $("#btnSave").button("option", "disabled", true);
            var p1 = $(this).jqGrid('getCell', jqGridRowID, 'AlignmentID');
            var p2 = $(this).jqGrid('getCell', jqGridRowID, 'FontID');
            var p3 = $(this).jqGrid('getCell', jqGridRowID, 'BorderID');
            LoadPrivateFormat(p1, p2, p3);
        }
    });

    var cellDelMsg = '';
    cellDelMsg += '<table id="TblGrid_cellgrid" class="EditTable" border="0" cellSpacing="0" cellPadding="0">';
    cellDelMsg += ' <tbody>';
    cellDelMsg += '     <tr id="tr_CellDelMode" class="FormData" rowpos="1">';
    cellDelMsg += '         <td class="CaptionTD">Delete Mode</td>';
    cellDelMsg += '         <td class="DataTD">';
    cellDelMsg += '             <select id="CellDelMode" name="CellDelMode" class="form-element ui-widget-content ui-corner-all">';
    cellDelMsg += '                 <option value="0"></option>';
    cellDelMsg += '                 <option value="1">Shift cells left</option>';
    cellDelMsg += '                 <option value="2">Shift cells up</option>';
    cellDelMsg += '             </select>';
    cellDelMsg += '         </td>';
    cellDelMsg += '     </tr>';
    cellDelMsg += ' </tbody>';
    cellDelMsg += '</table>';

    jQuery("#cellgrid").jqGrid(
                'navGrid'
                , '#cellpager'
                , { view: true }
                , { width: 400, resize: false, editData: { CellID: function () { return CellID; } }, beforeSubmit: CellBeforeSubmit, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm } //prmEdit
                , { width: 400, resize: false, editData: { SheetID: function () { return SheetID; } }, beforeSubmit: CellBeforeSubmit, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm, url: 'Manage/CellAdd' } //prmAdd
                , { width: 290, delData: { cellID: function () { return CellID; }, delMode: function () { return $('#CellDelMode').val() } }, url: 'Manage/CellDel', msg: cellDelMsg } //prmDel
                , { sopt: ['eq', 'cn'], sField: 'SearchField', sValue: 'SearchString', sOper: 'SearchOper', showQuery: true } //prmSearch
                , {} //prmView
            );

    //#endregion

    //#region jqGrid rangegrid

    jQuery("#rangegrid").jqGrid({
        url: '', //Manage/CellGrid
        datatype: 'json',
        hidegrid: true,
        hiddengrid: true,
        prmNames: prmNames,
        datatype: 'local',
        colNames: ['RangeID', 'SheetID', 'BorderID', 'AlignmentID', 'FontID', 'CellStart', 'CellEnd', 'IsMerge', 'Background'],
        colModel: [
   		            { name: 'RangeID', index: 'RangeID', hidden: true, editable: false },
   		            { name: 'SheetID', index: 'SheetID', hidden: true },
   		            { name: 'BorderID', index: 'BorderID', hidden: true },
   		            { name: 'AlignmentID', index: 'AlignmentID', hidden: true },
   		            { name: 'FontID', index: 'FontID', hidden: true },
   		            { name: 'CellStart', index: 'CellStart', editable: true, editrules: { required: true } },
		            { name: 'CellEnd', index: 'CellEnd', editable: true, editrules: { required: true } },
		            { name: 'IsMerge', index: 'IsMerge', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: 'False:False;True:True' }, stype: 'select', searchoptions: { value: 'False:False;True:True' } },
   		            { name: 'Background', index: 'Background', editable: true }
        ],
        //autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [10, 20, 50, 100, 500],
        pager: '#rangepager',
        sortname: 'CellStart',
        viewrecords: true,
        sortorder: "desc",
        //caption: "Navigator Example",
        editurl: 'Manage/RangeEdit',
        width: jqGridWidth,
        height: jqGridHeight,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            jqGridRowID = rowid;
            RangeID = $(this).jqGrid('getCell', jqGridRowID, 'RangeID');
            upfID = RangeID;
            upfType = "Range";
            $("#btnSave").button("option", "disabled", true);
            var p1 = $(this).jqGrid('getCell', jqGridRowID, 'AlignmentID');
            var p2 = $(this).jqGrid('getCell', jqGridRowID, 'FontID');
            var p3 = $(this).jqGrid('getCell', jqGridRowID, 'BorderID');
            LoadPrivateFormat(p1, p2, p3);
        }
    });

    jQuery("#rangegrid").jqGrid(
                'navGrid'
                , '#rangepager'
                , { view: true }
                , { width: 400, resize: false, editData: { RangeID: function () { return RangeID; } }, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm } //prmEdit
                , { width: 400, resize: false, editData: { SheetID: function () { return SheetID; } }, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm, url: 'Manage/RangeAdd' } //prmAdd
                , { delData: { RangeID: function () { return RangeID; } }, url: 'Manage/RangeDel' } //prmDel
                , { sopt: ['eq', 'cn'], sField: 'SearchField', sValue: 'SearchString', sOper: 'SearchOper', showQuery: true } //prmSearch
                , {} //prmView
            );

    //#endregion

    //#region jqGrid rowgrid

    jQuery("#rowgrid").jqGrid({
        url: '', //Manage/RowGrid
        datatype: 'json',
        hidegrid: true,
        hiddengrid: true,
        prmNames: prmNames,
        datatype: 'local',
        colNames: ['RowID', 'SheetID', 'BorderID', 'AlignmentID', 'FontID', 'Number', 'Height', 'IsMerge', 'IsHidden', 'Background'],
        colModel: [
   		            { name: 'RowID', index: 'RowID', hidden: true, editable: false },
   		            { name: 'SheetID', index: 'SheetID', hidden: true },
   		            { name: 'BorderID', index: 'BorderID', hidden: true },
   		            { name: 'AlignmentID', index: 'AlignmentID', hidden: true },
   		            { name: 'FontID', index: 'FontID', hidden: true },
   		            { name: 'Number', index: 'Number', editable: true, editrules: { required: true } },
		            { name: 'Height', index: 'Height', editable: true, editrules: { required: true } },
		            { name: 'IsMerge', index: 'IsMerge', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: 'False:False;True:True' }, stype: 'select', searchoptions: { value: 'False:False;True:True' } },
                    { name: 'IsHidden', index: 'IsHidden', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: 'False:False;True:True' }, stype: 'select', searchoptions: { value: 'False:False;True:True' } },
   		            { name: 'Background', index: 'Background', editable: true }
        ],
        //autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [10, 20, 50, 100, 500],
        pager: '#rowpager',
        sortname: 'Number',
        viewrecords: true,
        sortorder: "desc",
        //caption: "Navigator Example",
        editurl: 'Manage/RowEdit',
        width: jqGridWidth,
        height: jqGridHeight,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            jqGridRowID = rowid;
            RowID = $(this).jqGrid('getCell', jqGridRowID, 'RowID');
            upfID = RowID;
            upfType = "Row";
            $("#btnSave").button("option", "disabled", true);
            var p1 = $(this).jqGrid('getCell', jqGridRowID, 'AlignmentID');
            var p2 = $(this).jqGrid('getCell', jqGridRowID, 'FontID');
            var p3 = $(this).jqGrid('getCell', jqGridRowID, 'BorderID');
            LoadPrivateFormat(p1, p2, p3);
        }
    });

    jQuery("#rowgrid").jqGrid(
                'navGrid'
                , '#rowpager'
                , { view: true }
                , { width: 400, resize: false, editData: { RowID: function () { return RowID; } }, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm } //prmEdit
                , { width: 400, resize: false, editData: { SheetID: function () { return SheetID; } }, beforeSubmit: RowBeforeSubmit, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm, url: 'Manage/RowAdd' } //prmAdd
                , { delData: { RowID: function () { return RowID; } }, url: 'Manage/RowDel' } //prmDel
                , { sopt: ['eq', 'cn'], sField: 'SearchField', sValue: 'SearchString', sOper: 'SearchOper', showQuery: true } //prmSearch
                , {} //prmView
            );

    //#endregion

    //#region jqGrid columngrid

    jQuery("#columngrid").jqGrid({
        url: '', //Manage/ColumnGrid
        datatype: 'json',
        hidegrid: true,
        hiddengrid: true,
        prmNames: prmNames,
        datatype: 'local',
        colNames: ['ColumnID', 'SheetID', 'BorderID', 'AlignmentID', 'FontID', 'Code', 'Width', 'IsMerge', 'IsHidden', 'Background'],
        colModel: [
   		            { name: 'ColumnID', index: 'ColumnID', hidden: true, editable: false },
   		            { name: 'SheetID', index: 'SheetID', hidden: true },
   		            { name: 'BorderID', index: 'BorderID', hidden: true },
   		            { name: 'AlignmentID', index: 'AlignmentID', hidden: true },
   		            { name: 'FontID', index: 'FontID', hidden: true },
   		            { name: 'Code', index: 'Code', editable: true, editrules: { required: true } },
		            { name: 'Width', index: 'Width', editable: true, editrules: { required: true } },
		            { name: 'IsMerge', index: 'IsMerge', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: 'False:False;True:True' }, stype: 'select', searchoptions: { value: 'False:False;True:True' } },
                    { name: 'IsHidden', index: 'IsHidden', formatter: 'select', editable: true, edittype: 'select', editoptions: { value: 'False:False;True:True' }, stype: 'select', searchoptions: { value: 'False:False;True:True' } },
   		            { name: 'Background', index: 'Background', editable: true }
        ],
        //autowidth: true,
        rownumbers: true,
        rowNum: 50,
        rowList: [10, 20, 50, 100, 500],
        pager: '#columnpager',
        sortname: 'Code',
        viewrecords: true,
        sortorder: "desc",
        //caption: "Navigator Example",
        editurl: 'Manage/ColumnEdit',
        width: jqGridWidth,
        height: jqGridHeight,
        gridComplete: function () {
            $(this).jqGrid("setSelection", 0);
        },
        onSelectRow: function (rowid, status, e) {
            jqGridRowID = rowid;
            ColumnID = $(this).jqGrid('getCell', jqGridRowID, 'ColumnID');
            upfID = ColumnID;
            upfType = "Column";
            $("#btnSave").button("option", "disabled", true);
            var p1 = $(this).jqGrid('getCell', jqGridRowID, 'AlignmentID');
            var p2 = $(this).jqGrid('getCell', jqGridRowID, 'FontID');
            var p3 = $(this).jqGrid('getCell', jqGridRowID, 'BorderID');
            LoadPrivateFormat(p1, p2, p3);
        }
    });

    jQuery("#columngrid").jqGrid(
                'navGrid'
                , '#columnpager'
                , { view: true }
                , { width: 400, resize: false, editData: { ColumnID: function () { return ColumnID; } }, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm } //prmEdit
                , { width: 400, resize: false, editData: { SheetID: function () { return SheetID; } }, beforeSubmit: ColumnBeforeSubmit, onInitializeForm: onInitializeForm, beforeShowForm: beforeShowForm, url: 'Manage/ColumnAdd' } //prmAdd
                , { delData: { ColumnID: function () { return ColumnID; } }, url: 'Manage/ColumnDel' } //prmDel
                , { sopt: ['eq', 'cn'], sField: 'SearchField', sValue: 'SearchString', sOper: 'SearchOper', showQuery: true } //prmSearch
                , {} //prmView
            );

    //#endregion
});

//#region jqGrid function

function CellBeforeSubmit(postdata, formid) {
    var result = [true, ""];
    var type = postdata.cellgrid_id == "_empty" ? "0" : "1";
    $.ajax({
        url: 'Manage/CellSubmitVerify',
        async: false,
        type: 'post',
        data: { sheetID: SheetID, cellCode: postdata.Code, type: type, cellID: CellID },
        success: function (data) {
            var success = data.status == "e" ? false : true;
            var message = data.msg;
            result = [success, message];
        },
        error: function (msg) {
            result = [false, "err: data error"];
        }
    });
    return result;
}

function RowBeforeSubmit(postdata, formid) {
    var result = [true, ""];
    $.ajax({
        url: 'Manage/RowSubmitVerify',
        async: false,
        type: 'post',
        data: { sheetID: SheetID, rowNumber: postdata.Number },
        success: function (data) {
            var success = data.status == "e" ? false : true;
            var message = data.msg;
            result = [success, message];
        },
        error: function (msg) {
            result = [false, "err: data error"];
        }
    });
    return result;
}

function ColumnBeforeSubmit(postdata, formid) {
    var result = [true, ""];
    $.ajax({
        url: 'Manage/ColumnSubmitVerify',
        async: false,
        type: 'post',
        data: { sheetID: SheetID, columnCode: postdata.Code },
        success: function (data) {
            var success = data.status == "e" ? false : true;
            var message = data.msg;
            result = [success, message];
        },
        error: function (msg) {
            result = [false, "err: data error"];
        }
    });
    return result;
}

function onInitializeForm(formID) {
    var colorInput = $(formID).find("#Background");
    $(colorInput).css({ "width": "72px", "border-right": " 12px solid #a6c9e2" });
    $(colorInput).colpick({
        layout: 'rgbhex',
        onBeforeShow: function (el) {
            var rgb = $(this).val();
            if (rgb) {
                $(this).colpickSetColor({ r: rgb.substr(0, 3), g: rgb.substr(3, 3), b: rgb.substr(6, 3) });
            }
        },
        onSubmit: function (hsb, hex, rgb, el) {
            $(el).css('border-color', '#' + hex);
            $(el).val(pad(rgb.r, 3).toString() + pad(rgb.g, 3).toString() + pad(rgb.b, 3).toString());
            $(el).colpickHide();
            $("#btnSave").button("option", "disabled", false);
        }
    });
}

function beforeShowForm(formID) {
    switch ($(formID).attr("id")) {
        case "FrmGrid_cellgrid":
            var cellCodeInput = $(formID).find("#Code");
            $(cellCodeInput).prop("readonly", $(cellCodeInput).val() ? true : false);
            break;
        case "FrmGrid_rowgrid":
            var rowNumberInput = $(formID).find("#Number");
            $(rowNumberInput).prop("readonly", $(rowNumberInput).val() ? true : false);
            break;
        case "FrmGrid_columngrid":
            var columnCodeInput = $(formID).find("#Code");
            $(columnCodeInput).prop("readonly", $(columnCodeInput).val() ? true : false);
            break;
    }
    var colorInput = $(formID).find("#Background");
    var rgb = $(colorInput).val();
    if (rgb) {
        $(colorInput).css("border-color", "rgb(" + rgb.substr(0, 3) + "," + rgb.substr(3, 3) + "," + rgb.substr(6, 3) + ")");
    }
    else {
        $(colorInput).css({ "width": "72px", "border-color": "#a6c9e2" });
    }
}

function setJqgridSize(w, h) {
    //set height
    $("#cellgrid").setGridHeight(h - 20);
    $("#cellgrid").setGridHeight(h);
    $("#rangegrid").setGridHeight(h - 20);
    $("#rangegrid").setGridHeight(h);
    $("#rowgrid").setGridHeight(h - 20);
    $("#rowgrid").setGridHeight(h);
    $("#columngrid").setGridHeight(h - 20);
    $("#columngrid").setGridHeight(h);
    //set width
    $("#cellgrid").setGridWidth(w - 20); //先设置减去20主要为了消除Chrome浏览器滚动条，下同
    $("#cellgrid").setGridWidth(w);
    $("#rangegrid").setGridWidth(w - 20);
    $("#rangegrid").setGridWidth(w);
    $("#rowgrid").setGridWidth(w - 20);
    $("#rowgrid").setGridWidth(w);
    $("#columngrid").setGridWidth(w - 20);
    $("#columngrid").setGridWidth(w);
}

//#endregion

//#region zTree Right button function

//手动加载
function LoadExcelTree() {
    $.ajax({
        url: 'Manage/GetExcelTree',
        success: function (data) {
            //create zTree
            zTree = $.fn.zTree.init($("#excel-tree"), setting, data);
            zTree.expandAll(true);
            var nodes = zTree.getNodes();
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].children) {
                    var childrenNode = nodes[i].children;
                    zTree.selectNode(childrenNode[0]);
                    onNodeClick(null, null, childrenNode[0]);
                    break;
                }
            }
            rMenu = $("#rmenu");
        },
        error: function (msg) {
            alert(" load excel tree err！");
        }
    });
}

function onAsyncSuccess(event, treeId, treeNode, msg) {
    zTree.expandAll(true);
    var nodes = zTree.getNodes();
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].children) {
            var childrenNode = nodes[i].children;
            zTree.selectNode(childrenNode[0]);
            onNodeClick(null, null, childrenNode[0]);
            break;
        }
    }
    rMenu = $("#rmenu");
}

function OnRightClick(event, treeId, treeNode) {
    zTreeNode = treeNode;
    if (!zTreeNode) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (zTreeNode && treeNode.BookID == emptyGuid) {
        zTree.selectNode(zTreeNode);
        showRMenu("rootNode", event.clientX, event.clientY);
    } else {
        zTree.selectNode(zTreeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}

function showRMenu(type, x, y) {
    $("#rmenu ul li").hide();
    $("#rmenu ul").show();
    if (type == "root") {
        $("#add-book").show();
    } else if (type == "rootNode") {
        $("#add-sheet").show();
        $("#modify-book").show();
        $("#remove-book").show();
    } else {
        $("#modify-sheet").show();
        $("#template-sheet").show();
        $("#remove-sheet").show();
    }
    rMenu.css({ "top": y + "px", "left": x + "px", "visibility": "visible" });
    $("body").bind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
    if (!(event.target.id == "rmenu" || $(event.target).parents("#rmenu").length > 0)) {
        rMenu.css({ "visibility": "hidden" });
    }
}
function onNodeClick(event, treeId, treeNode) {
    SheetID = treeNode.SheetID;
    if (treeNode.BookID != emptyGuid) {
        //jQuery("#cellgrid").jqGrid('setGridParam', { url: "Manage/CellGrid?sheetID=" + SheetID, datatype: "json" }).trigger("reloadGrid");
        LoadJqGrid(upfType);
    }
}

//#endregion

//#region Private Format

function PrivateFormatReset() {
    $("#private-format input").val("");
    $("#private-format select").val("");
}

function LoadPrivateFormat(alignmentID, fontID, borderID) {
    PrivateFormatReset();
    $.ajax({
        url: 'Manage/GetPrivateFormat',
        type: "post",
        data: { alignmentID: alignmentID, fontID: fontID, borderID: borderID },
        success: function (data) {
            if (data) {
                var alignment = data.Alignment;
                var font = data.Font;
                var border = data.Border;
                if (alignment) {
                    $("#AlignmentID").val(alignment.AlignmentID);
                    if (alignment.Horizontal) $("#Horizontal").val(alignment.Horizontal);
                    if (alignment.Vertical) $("#Vertical").val(alignment.Vertical);
                    if (alignment.TextControl) $("#TextControl").val(alignment.TextControl.toLocaleLowerCase());
                    if (alignment.TextDirection) $("#TextDirection").val(alignment.TextDirection);
                }
                if (font) {
                    $("#FontID").val(font.FontID);
                    if (font.Name) $("#FontName").val(font.Name);
                    if (font.Style) $("#FontStyle").val(font.Style);
                    if (font.Size) $("#FontSize").val(font.Size);
                    if (font.Underline) $("#FontUnderline").val(font.Underline);
                    if (font.Color) $("#FontColor").val(font.Color);
                    if (font.Effects) {
                        var arr = font.Effects.split(',');
                        $("#FontStrikethrough").prop("checked", arr[0] == "true" ? true : false);
                        $("#FontSuperscript").prop("checked", arr[1] == "true" ? true : false);
                        $("#FontSubscript").prop("checked", arr[2] == "true" ? true : false);
                    }
                }
                if (border) {
                    $("#BorderID").val(border.BorderID);
                    if (border.Widths) {
                        var arr1 = border.Widths.split(',');
                        var arr2 = border.Styles.split(',');
                        $("#BETStyle").val(arr1[0] + "," + arr2[0]);
                        $("#BERStyle").val(arr1[1] + "," + arr2[1]);
                        $("#BEBStyle").val(arr1[2] + "," + arr2[2]);
                        $("#BELStyle").val(arr1[3] + "," + arr2[3]);
                        $("#BIHStyle").val(arr1[4] + "," + arr2[4]);
                        $("#BIVStyle").val(arr1[5] + "," + arr2[5]);
                        $("#BDUStyle").val(arr1[6] + "," + arr2[6]);
                        $("#BDDStyle").val(arr1[7] + "," + arr2[7]);
                    }
                    if (border.Colors) {
                        var arr = border.Colors.split(',');
                        $("#BETColor").val(arr[0]);
                        $("#BERColor").val(arr[1]);
                        $("#BEBColor").val(arr[2]);
                        $("#BELColor").val(arr[3]);
                        $("#BIHColor").val(arr[4]);
                        $("#BIVColor").val(arr[5]);
                        $("#BDUColor").val(arr[6]);
                        $("#BDDColor").val(arr[7]);
                    }
                }
            }
            $(".color").each(function () {
                var rgb = $(this).val();
                if (rgb) {
                    $(this).css("border-color", "rgb(" + rgb.substr(0, 3) + "," + rgb.substr(3, 3) + "," + rgb.substr(6, 3) + ")");
                }
                else {
                    $(this).css("border-color", "#a6c9e2");
                }
            });
        },
        error: function (msg) {
            alert("private format load error.");
        }
    });
}

function UpdatePrivateFormat(guid, type) {
    var alignmentOperateFlag = 0;//对齐方式操作标记(0：不做操作；1：添加；2：更新；3：删除)
    var alignmentID = $("#AlignmentID").val() ? $("#AlignmentID").val() : emptyGuid;
    var horizontal = $("#Horizontal").val();
    var vertical = $("#Vertical").val();
    var textControl = $("#TextControl").val();
    var textDirection = $("#TextDirection").val();
    var alignment =
    {
        AlignmentID: alignmentID,
        Horizontal: horizontal,
        Vertical: vertical,
        TextControl: textControl,
        TextDirection: textDirection
    };
    if (!horizontal && !vertical && !textControl && !textDirection) {
        if (alignmentID == emptyGuid) {
            alignmentOperateFlag = 0;
        }
        else {
            alignmentOperateFlag = 3;
        }
    }
    else {
        if (alignmentID == emptyGuid) {
            alignmentOperateFlag = 1;
        }
        else {
            alignmentOperateFlag = 2;
        }
    }

    var fontOperateFlag = 0;//字体样式操作标记(0：不做操作；1：添加；2：更新；3：删除)
    var fontID = $("#FontID").val() ? $("#FontID").val() : emptyGuid;
    var fontName = $("#FontName").val();
    var fontStyle = $("#FontStyle").val();
    var fontSize = $("#FontSize").val();
    var fontUnderline = $("#FontUnderline").val();
    var fontColor = $("#FontColor").val();
    var fontStrikethrough = $("#FontStrikethrough").prop("checked") ? "true," : "false,";
    var fontSuperscript = $("#FontSuperscript").prop("checked") ? "true," : "false,";
    var fontSubscript = $("#FontSubscript").prop("checked") ? "true" : "false";
    var effects = fontStrikethrough + fontSuperscript + fontSubscript;
    var font =
    {
        FontID: fontID,
        Name: $.trim(fontName),
        Style: fontStyle,
        Size: $.trim(fontSize),
        Underline: fontUnderline,
        Color: fontColor,
        Effects: effects
    };
    if (!fontName && !fontStyle && !fontSize && !fontUnderline && !fontColor && effects == "false,false,false") {
        if (fontID == emptyGuid) {
            fontOperateFlag = 0;
        }
        else {
            fontOperateFlag = 3;
        }
    }
    else {
        if (fontID == emptyGuid) {
            fontOperateFlag = 1;
        }
        else {
            fontOperateFlag = 2;
        }
    }

    var borderOperateFlag = 0;//边框样式操作标记(0：不做操作；1：添加；2：更新；3：删除)
    var borderID = $("#BorderID").val() ? $("#BorderID").val() : emptyGuid;
    var edgeTopStyle = $("#BETStyle").val() ? $("#BETStyle").val() : ",";
    var arrEdgeTop = (edgeTopStyle + "," + $("#BETColor").val()).split(',');
    var edgeRightStyle = $("#BERStyle").val() ? $("#BERStyle").val() : ",";
    var arrEdgeRight = (edgeRightStyle + "," + $("#BERColor").val()).split(',');
    var edgeBottomStyle = $("#BEBStyle").val() ? $("#BEBStyle").val() : ",";
    var arrEdgeBottom = (edgeBottomStyle + "," + $("#BEBColor").val()).split(',');
    var edgeLeftStyle = $("#BELStyle").val() ? $("#BELStyle").val() : ",";
    var arrEdgeLeft = (edgeLeftStyle + "," + $("#BELColor").val()).split(',');
    var insideHorizontalStyle = $("#BIHStyle").val() ? $("#BIHStyle").val() : ",";
    var arrInsideHorizontal = (insideHorizontalStyle + "," + $("#BIHColor").val()).split(',');
    var insideVerticalStyle = $("#BIVStyle").val() ? $("#BIVStyle").val() : ",";
    var arrInsideVertical = (insideVerticalStyle + "," + $("#BIVColor").val()).split(',');
    var diagonalUpStyle = $("#BDUStyle").val() ? $("#BDUStyle").val() : ",";
    var arrDiagonalUp = (diagonalUpStyle + "," + $("#BDUColor").val()).split(',');
    var diagonalDownStyle = $("#BDDStyle").val() ? $("#BDDStyle").val() : ",";
    var arrDiagonalDown = (diagonalDownStyle + "," + $("#BDDColor").val()).split(',');
    var borderWidths, borderStyles, borderColors;
    borderWidths = arrEdgeTop[0] + "," + arrEdgeRight[0] + "," + arrEdgeBottom[0] + "," + arrEdgeLeft[0] + "," + arrInsideHorizontal[0] + "," + arrInsideVertical[0] + "," + arrDiagonalUp[0] + "," + arrDiagonalDown[0];
    borderStyles = arrEdgeTop[1] + "," + arrEdgeRight[1] + "," + arrEdgeBottom[1] + "," + arrEdgeLeft[1] + "," + arrInsideHorizontal[1] + "," + arrInsideVertical[1] + "," + arrDiagonalUp[1] + "," + arrDiagonalDown[1];
    borderColors = arrEdgeTop[2] + "," + arrEdgeRight[2] + "," + arrEdgeBottom[2] + "," + arrEdgeLeft[2] + "," + arrInsideHorizontal[2] + "," + arrInsideVertical[2] + "," + arrDiagonalUp[2] + "," + arrDiagonalDown[2];
    var arrBorderwidths = borderWidths.split(',');
    var arrBorderstyles = borderStyles.split(',');
    var arrBordercolors = borderColors.split(',');
    for (var i = 0; i < 2; i++) {
        var arr = arrBorderwidths;
        if (i == 1) {
            arr = arrBordercolors;
        }
        for (var k = 0; k < 8; k++) {
            if (arr[k]) break;
            if (k == 7) {
                if (i == 0) {

                    borderWidths = "";
                    borderStyles = "";
                }
                else {
                    borderColors = "";
                }
            }
        }
    }
    var border =
    {
        BorderID: borderID,
        Widths: borderWidths,
        Styles: borderStyles,
        Colors: borderColors
    };
    if (!borderWidths && !borderStyles && !borderColors) {
        if (borderID == emptyGuid) {
            borderOperateFlag = 0;
        }
        else {
            borderOperateFlag = 3;
        }
    }
    else {
        if (borderID == emptyGuid) {
            borderOperateFlag = 1;
        }
        else {
            borderOperateFlag = 2;
        }
    }

    $.ajax({
        url: 'Manage/UpdatePrivateFormat',
        type: "post",
        data: JSON.stringify({ ID: guid, Type: type, AlignmentOperateFlag: alignmentOperateFlag, FontOperateFlag: fontOperateFlag, BorderOperateFlag: borderOperateFlag, Alignment: alignment, Font: font, Border: border }),
        success: function (data) {
            if (data.IsNeedUPT) {
                var jqGridID = type.toString().toLowerCase() + "grid";
                var a = data.AlignmentID ? data.AlignmentID : emptyGuid;
                var b = data.BorderID ? data.BorderID : emptyGuid;
                var f = data.FontID ? data.FontID : emptyGuid;
                $("#AlignmentID").val(a);
                $("#BorderID").val(b);
                $("#FontID").val(f);
                jQuery("#" + jqGridID).jqGrid("setCell", jqGridRowID, "AlignmentID", a);
                jQuery("#" + jqGridID).jqGrid("setCell", jqGridRowID, "FontID", f);
                jQuery("#" + jqGridID).jqGrid("setCell", jqGridRowID, "BorderID", b);
            }
            $("#btnSave").button("option", "disabled", true);
        },
        error: function (msg) {
            alert("private format update error.");
        }
    });
}

//复选框互斥
function MutexCheckBox(obj, checkBoxID) {
    if (obj.checked) {
        if ($("#" + checkBoxID).prop("checked")) {
            $("#" + checkBoxID).prop("checked", false);
        }
    }
}

//#endregion

//#region Load Jqgrid By type

function LoadJqGrid(type) {
    switch (type.toString().toLowerCase()) {
        case "cell":
            jQuery("#cellgrid").jqGrid('setGridParam', { url: "Manage/CellGrid?SheetID=" + SheetID, search: "false", datatype: "json" }).trigger("reloadGrid", [{ page: 1 }]);
            break;
        case "range":
            jQuery("#rangegrid").jqGrid('setGridParam', { url: "Manage/RangeGrid?SheetID=" + SheetID, search: "false", datatype: "json" }).trigger("reloadGrid", [{ page: 1 }]);
            break;
        case "row":
            jQuery("#rowgrid").jqGrid('setGridParam', { url: "Manage/RowGrid?SheetID=" + SheetID, search: "false", datatype: "json" }).trigger("reloadGrid", [{ page: 1 }]);
            break;
        default: //column
            jQuery("#columngrid").jqGrid('setGridParam', { url: "Manage/ColumnGrid?SheetID=" + SheetID, search: "false", datatype: "json" }).trigger("reloadGrid", [{ page: 1 }]);
            break;
    }
}

//#endregion

//#region 空位补零

function pad(num, n) {
    if ((num.toString()).length >= n) return num;
    return pad("0" + num, n);
}

//#endregion

//#region ajaxFileUpload

function ajaxFileUpload(sheetID, rowStartNumber, rowEndNumber, columnStartCode, columnEndCode) {
    $("#loading")
    .ajaxStart(function () {
        $(this).show();
    })
    .ajaxComplete(function () {
        $(this).hide();
    });
    $.ajaxFileUpload
    (
        {
            url: 'Manage/UpdateSheetTemplate',
            secureuri: false,
            fileElementId: 'SheetTemplate',
            dataType: 'json',
            data: { sheetID: sheetID, rowStartNumber: rowStartNumber, rowEndNumber: rowEndNumber, columnStartCode: columnStartCode, columnEndCode: columnEndCode },
            success: function (data, status) {
                if (typeof (data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    }
                    else {
                        alert("Updated template success.");
                        $("#dialog-form-template").dialog("close");
                    }
                }
            },
            error: function (data, status, e) {
                alert(e);
            }
        }
    )
    return false;
}

//#endregion