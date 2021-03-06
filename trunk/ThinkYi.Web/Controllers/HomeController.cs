﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Web.Models;
using ThinkYi.Tools;

namespace ThinkYi.Web.Controllers
{
    public class HomeController : Controller
    {
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public ISlideService SlideService { get; set; }
        [Dependency]
        public IProductService ProductService { get; set; }

        Common common = new Common();

        public ActionResult Index(string language)
        {
            HomeIndex hi = new HomeIndex();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && !i.I18NType.Code.Equals("menu")).ToList();
            hi.PageI18N = common.GetPageI18N(i18ns.Where(i => i.I18NType.Code.Equals("title") || i.I18NType.Code.Equals("other")).ToList());
            hi.Cooperations = i18ns.Where(i => i.I18NType.Code.Equals("cooperation")).OrderBy(i => i.OrderID).ToList();

            hi.Slides = SlideService.GetSlides().Where(s => !string.IsNullOrEmpty(s.Image) && !string.IsNullOrEmpty(s.Title) && !string.IsNullOrEmpty(s.Url)).ToList();
            hi.Displays = ProductService.GetProducts().Where(p => p.ProductType.Language.Code.Equals(language) && p.IsShow).Take(20).ToList();

            return View(hi);
        }
    }
}