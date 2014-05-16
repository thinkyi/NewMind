using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using System.Web.Security;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Web.Models;

namespace ThinkYi.Web.Controllers
{
    public class AccountController : Controller
    {
        [Dependency]
        public IUserService UserService { get; set; }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string LogOn(User user)
        {
            string result = "s";
            string userName = user.UserName;
            string password = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(user.Password, "md5").ToString();

            var admin = UserService.GetUsers().Where(u => u.UserName.Equals(userName)).FirstOrDefault();

            if (admin != null)
            {
                if (admin.Password.Equals(password))
                {
                    FormsAuthentication.SetAuthCookie(admin.UserName, false);
                }
                else
                {
                    result = "密码错误。";
                }
            }
            else
            {
                result = "用户名不存在。";
            }

            return result;
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Account");
        }

        [HttpPost]
        public string UserEdit(string oldPwd, string newPwd)
        {
            string result = "s";
            newPwd = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(newPwd, "md5").ToString();
            oldPwd = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(oldPwd, "md5").ToString();
            var admin = UserService.GetUsers().Where(u => u.UserName.Equals(User.Identity.Name) && u.Password.Equals(oldPwd)).FirstOrDefault();
            if (admin == null)
            {
                result = "旧密码不正确";
            }
            else
            {
                admin.Password = newPwd;
                UserService.EditUser(admin);
            }
            return result;
        }
    }
}