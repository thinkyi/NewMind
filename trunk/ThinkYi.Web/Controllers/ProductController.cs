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
    public class ProductController : Controller
    {
        [Dependency]
        public IProductService ProductService { get; set; }
        [Dependency]
        public IProductTypeService ProductTypeService { get; set; }
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IInformationService InformationService { get; set; }

        public ActionResult _TypePartial(string lCode)
        {
            PartialPType ppt = new PartialPType();
            string title = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(lCode) && i.Code.Equals("ptype")).FirstOrDefault().Name;
            ppt.ProductTypes = ProductTypeService.GetProductTypes(lCode).ToList();
            ppt.title = title;
            return PartialView(ppt);
        }
    }

    public class DisplayController : ProductController
    {
        public ActionResult Index(string language)
        {
            ProductIndex pi = new ProductIndex();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.Code.Equals("display") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            pi.Information = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("display")).FirstOrDefault();
            return View("~/Views/Product/Index.cshtml", pi);
        }
    }
}