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
            string longCaption = null;
            PageIndex = PageIndex == 0 ? 1 : PageIndex;
            ProductIndex pi = new ProductIndex();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.I18NType.Code.Equals("pager") || i.Code.Equals("allproduct") || i.Code.Equals("display") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data1 = i18ns.Where(i => !i.I18NType.Code.Equals("pager")).OrderBy(i => i.Code).ToList();
            ViewBag.Title = data1[1].Name + " - " + data1[3].Name;
            longCaption = data1[2].Name ;
            ViewBag.ShortCaption = data1[1].Name;
            ViewBag.Remark = data1[1].Remark;
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
            if (total > 16)
            {
                int totalPage = total % 16 == 0 ? total / 16 : total / 16 + 1;
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
            pi.Products = qp.Skip((PageIndex - 1) * 16).Take(16).ToList();
            if (ProductTypeID > 0)
            {
                ProductType pt = ProductTypeService.GetProductTypes(language).Where(p => p.ProductTypeID == ProductTypeID && p.ParentTypeID == 0).FirstOrDefault();
                if (pt == null)
                {
                    ProductType pt1 = ProductTypeService.GetProductType(ProductTypeID);
                    longCaption = longCaption + " > " + ProductTypeService.GetProductType(pt1.ParentTypeID).Name;
                    longCaption = longCaption + " > " + pt1.Name;

                }
                else
                {
                    longCaption = longCaption + " > " + pt.Name;
                }

            }
            else
            {
                longCaption = longCaption + " > " + data1[0].Name;
            }
            ViewBag.LongCaption = longCaption;
            return View("~/Views/Product/Index.cshtml", pi);
        }

        public ActionResult Detail(int id)
        {
            ProductDetail pd = new ProductDetail();
            pd.Product = ProductService.GetProducts().Include("ProductType").Where(p => p.ProductID == id).First();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.LanguageID == pd.Product.ProductType.LanguageID && (i.Code.Equals("display") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            pd.Post = PostService.GetPosts().Where(i => i.Language.LanguageID == pd.Product.ProductType.LanguageID && i.Code.Equals("display")).FirstOrDefault();
            return View("~/Views/Product/Detail.cshtml", pd);
        }
    }
}