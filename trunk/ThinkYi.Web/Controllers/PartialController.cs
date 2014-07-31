using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Web.Models;

namespace ThinkYi.Web.Controllers
{
    public class PartialController : Controller
    {
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IPostService PostService { get; set; }

        public ActionResult _Header(string language)
        {
            var menus = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && i.I18NType.Code.Equals("menu") && !i.IsHidden).OrderBy(i => i.OrderID).ToList();
            return PartialView(menus);
        }

        public ActionResult _Footer(string language)
        {
            PartialFooter pf = new PartialFooter();
            var menus = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && i.I18NType.Code.Equals("menu") && !i.IsHidden).OrderBy(i => i.OrderID).ToList();
            pf.Menus = menus;
            pf.Footer = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("footer")).FirstOrDefault().Text;
            return PartialView(pf);
        }

        public ActionResult _LeftMenu(string language)
        {
            List<I18N> i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("about") || i.Code.Equals("brief") || i.Code.Equals("culture") || i.Code.Equals("recuit"))).OrderBy(i => i.Code).ToList();
            return PartialView(i18ns);
        }

    }
}