$(document).ready(function () {

    $("#btnSubmit").bind("click", function () {
        var client = $("#Client").val();
        var contact = $("#Contact").val();
        var text = $("#Text").val();
        if (!$.trim(client)) {
            alert("请输入客户名称。");
            $("#Client").focus();
            return;
        }
        else if (!$.trim(text)) {
            alert("请输入留言内容。");
            $("#Text").focus();
            return;
        }
        $.ajax({
            url: '/cn/Message/Add',
            type: "post",
            data: { Client: client, Contact: contact, Text: text },
            success: function (data) {
                if (date = "s") {
                    alert("留言成功，请等待管理员审核");
                    $("#Client").val("");
                    $("#Contact").val("");
                    $("#Text").val("");
                }
            },
            error: function (msg) {
                alert("err!");
            }
        });
    });
});
