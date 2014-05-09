using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThinkYi.Domain;
using ThinkYi.Service;

namespace ThinkYi.Web.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService productService;
        private readonly IProductTypeService productTypeService;

        public ProductController(IProductService productService, IProductTypeService productTypeService)
        {
            this.productService = productService;
            this.productTypeService = productTypeService;
        }

        public ActionResult _TypePartial(string lCode)
        {
            var productTypes = productTypeService.GetProductTypes(lCode).ToList();
            return PartialView(productTypes);
        }

    }
}