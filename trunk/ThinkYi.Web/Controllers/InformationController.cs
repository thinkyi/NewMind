using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;

namespace ThinkYi.Web.Controllers
{
    public class InfoController : Controller
    {
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IInformationService InformationService { get; set; }
    }

    public class AboutController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("about") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("about")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }

    public class PriceController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("price") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("price")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }

    public class FacilitiesController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("facilities") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("facilities")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }

    public class DisplayController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("display") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("display")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }

    public class InformationController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("information") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("information")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }

    public class RecuitController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("recuit") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("recuit")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }

    public class ContactController : InfoController
    {
        public ActionResult Index(string language)
        {
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("contact") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("contact")).FirstOrDefault();
            return View("~/Views/Info/Index.cshtml", info);
        }
    }
}