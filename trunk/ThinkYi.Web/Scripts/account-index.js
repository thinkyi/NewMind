$(document).ready(function () {
    $("#btnSignin").button({
        icons: {
            primary: "ui-icon-person"
        }
    })
    .click(function () {
        Login();
    });

    $("body").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#btnSignin').click();
        }
    });
});


function Login() {
    var UserName = $("#UserName").val();
    var Password = $("#Password").val();
    var user = {
        UserName: UserName,
        Password: Password
    }
    if (!UserName) {
        alert("请输入用户名");
        return;
    }
    if (!Password) {
        alert("请输入密码");
        return;
    }
    $.ajax({
        url: '/Account/LogOn',
        type: 'post',
        data: user,
        success: function (data) {
            if (data == "s") {
                window.location.href = "/Admin";
            }
            else {
                alert(data);
                $("#Password").val("");
            }
        },
        error: function (msg) {
            alert("加载错误");
        }
    });
}