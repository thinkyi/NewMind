﻿using System;
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
        public IInformationService InformationService { get; set; }

        public ActionResult _Header(string lCode)
        {
            var menus = I18NService.GetI18Ns(lCode).Where(i => i.I18NType.Code.Equals("menu")).ToList();
            return PartialView(menus);
        }

        public ActionResult _Footer(string lCode)
        {
            PartialFooter pf = new PartialFooter();
            var menus = I18NService.GetI18Ns(lCode).Where(i => i.I18NType.Code.Equals("menu")).ToList();
            pf.Menus = menus;
            pf.Footer = InformationService.GetInformations(lCode).Where(i => i.Code.Equals("footer")).FirstOrDefault().Text;
            return PartialView(pf);
        }
    }
}