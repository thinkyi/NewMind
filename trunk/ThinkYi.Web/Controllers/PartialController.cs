using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThinkYi.Domain;
using ThinkYi.Service;

namespace ThinkYi.Web.Controllers
{
    public class PartialController : Controller
    {
        private readonly IPartialService partialService;

        public PartialController(IPartialService partialService)
        {
            this.partialService = partialService;
        }

        public ActionResult _Header(string code)
        {
            var menus = partialService.GetMenus(code).ToList();
            return PartialView(menus);
        }

        public ActionResult _Footer(string code)
        {
            var menus = partialService.GetMenus(code).ToList();
            return PartialView(menus);
        }
    }
}