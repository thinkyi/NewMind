using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Web.Models;

namespace ThinkYi.Web.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService productService;
        private readonly IProductTypeService productTypeService;
        private readonly II18NService i18NService;

        public ProductController(IProductService productService, IProductTypeService productTypeService, II18NService i18NService)
        {
            this.productService = productService;
            this.productTypeService = productTypeService;
            this.i18NService = i18NService;
        }

        public ActionResult _TypePartial(string lCode)
        {
            PartialPType ppt = new PartialPType();
            string title = i18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(lCode) && i.Code.Equals("ptype")).FirstOrDefault().Name;
            ppt.ProductTypes = productTypeService.GetProductTypes(lCode).ToList();
            ppt.title = title;
            return PartialView(ppt);
        }

    }
}