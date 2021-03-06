﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;

namespace ThinkYi.Web.Controllers
{
    public class PostController : Controller
    {
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IPostService PostService { get; set; }
    }

    public class AboutController : PostController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("about") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            Post info = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("about")).FirstOrDefault();
            return View("~/Views/Post/Index.cshtml", info);
        }
    }

    public class PriceController : PostController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("price") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[1].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[0].Name + " > " + data[1].Name;
            ViewBag.ShortCaption = data[1].Name;
            ViewBag.Remark = data[1].Remark;
            Post info = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("price")).FirstOrDefault();
            return View("~/Views/Post/Index.cshtml", info);
        }
    }

    public class FacilitiesController : PostController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("facilities") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            Post info = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("facilities")).FirstOrDefault();
            return View("~/Views/Post/Index.cshtml", info);
        }
    }

    public class RecuitController : PostController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("recuit") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[1].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[0].Name + " > " + data[1].Name;
            ViewBag.ShortCaption = data[1].Name;
            ViewBag.Remark = data[1].Remark;
            Post info = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("recuit")).FirstOrDefault();
            return View("~/Views/Post/Index.cshtml", info);
        }
    }

    public class ContactController : PostController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("contact") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            Post info = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("contact")).FirstOrDefault();
            return View("~/Views/Post/Index.cshtml", info);
        }
    }

    public class PaymentController : PostController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("payment") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[1].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[0].Name + " > " + data[1].Name;
            ViewBag.ShortCaption = data[1].Name;
            ViewBag.Remark = data[1].Remark;
            Post info = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("payment")).FirstOrDefault();
            return View("~/Views/Post/Index.cshtml", info);
        }
    }
}