using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
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
        public IPostService PostService { get; set; }

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
        public ActionResult Index(string language, int ProductTypeID, int PageIndex)
        {
            PageIndex = PageIndex == 0 ? 1 : PageIndex;
            ProductIndex pi = new ProductIndex();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.I18NType.Code.Equals("pager") || i.Code.Equals("allproduct") || i.Code.Equals("display") || i.Code.Equals("wstitle"))).ToList();
            var data1 = i18ns.Where(i => !i.I18NType.Code.Equals("pager")).OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data1.Skip(1).ToArray());
            ViewBag.Caption1 = data1[1];
            ViewBag.Caption2 = " - " + data1[0];
            var data2 = i18ns.Where(i => i.I18NType.Code.Equals("pager")).ToList();
            foreach (var item in data2)
            {
                string pText = item.Name;
                switch (item.Code)
                {
                    case "firstpage":
                        pi.FirstText = pText;
                        break;
                    case "prepage":
                        pi.PreText = pText;
                        break;
                    case "nextpage":
                        pi.NextText = pText;
                        break;
                    case "lastpage":
                        pi.LastText = pText;
                        break;
                }
            }
            pi.Post = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("display")).FirstOrDefault();
            IQueryable<Product> qp = ProductService.GetProducts().Where(p => p.ProductType.Language.Code.Equals(language)).OrderByDescending(p => p.ProductID);
            int total = qp.Count();
            if (ProductTypeID != 0)
            {
                qp = qp.Where(q => q.ProductTypeID == ProductTypeID || q.ProductType.ParentTypeID == ProductTypeID);
                total = qp.Count();
            }
            pi.Curr = PageIndex;
            if (total > 12)
            {
                int totalPage = total % 12 == 0 ? total / 12 : total / 12 + 1;
                if (totalPage > PageIndex)
                {
                    pi.Next = true;
                }
                else
                {
                    pi.Next = false;
                }

                if (PageIndex > 1)
                {
                    pi.Pre = true;
                }
                else
                {
                    pi.Pre = false;
                }
            }
            pi.Total = total;
            pi.Products = qp.Skip((PageIndex - 1) * 12).Take(12).ToList();
            if (ProductTypeID > 0)
            {
                ProductType pt = ProductTypeService.GetProductTypes(language).Where(p => p.ProductTypeID == ProductTypeID && p.ParentTypeID == 0).FirstOrDefault();
                if (pt == null)
                {
                    ProductType pt1 = ProductTypeService.GetProductType(ProductTypeID);
                    ViewBag.Caption2 = " - " + ProductTypeService.GetProductType(pt1.ParentTypeID).Name;
                    ViewBag.Caption3 = " - " + pt1.Name;

                }
                else
                {
                    ViewBag.Caption2 = " - " + pt.Name;
                }

            }
            return View("~/Views/Product/Index.cshtml", pi);
        }

        public ActionResult Detail(int id)
        {
            ProductDetail pd = new ProductDetail();
            pd.Product = ProductService.GetProducts().Include("ProductType").Where(p => p.ProductID == id).First();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.LanguageID == pd.Product.ProductType.LanguageID && (i.Code.Equals("display") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).Select(i => i.Name).ToList();
            ViewBag.Title = string.Join(" - ", data.ToArray());
            ViewBag.Caption = data[0];
            pd.Post = PostService.GetPosts().Where(i => i.Language.LanguageID == pd.Product.ProductType.LanguageID && i.Code.Equals("display")).FirstOrDefault();
            return View("~/Views/Product/Detail.cshtml", pd);
        }
    }
}