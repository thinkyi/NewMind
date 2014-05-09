using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThinkYi.Domain;
using ThinkYi.Service;
using Microsoft.Practices.Unity;

namespace ThinkYi.Web.Controllers
{
    public class PartialController : Controller
    {
        [Dependency]
        public II18NService I18NService { get; set; }

        public ActionResult _Header(string lCode)
        {
            var menus = I18NService.GetI18Ns(lCode).Where(i => i.I18NType.Code.Equals("menu")).ToList();
            return PartialView(menus);
        }

        public ActionResult _Footer(string lCode)
        {
            var menus = I18NService.GetI18Ns(lCode).Where(i => i.I18NType.Code.Equals("menu")).ToList();
            return PartialView(menus);
        }
    }
}