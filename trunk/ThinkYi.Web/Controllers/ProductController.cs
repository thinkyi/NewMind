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

        public ActionResult _TypePartial(string lCode, int c1)
        {
            int categoryID = c1;
            ViewContext vc = new ViewContext();
            PartialPType ppt = new PartialPType();
            string title = null;
            switch (categoryID)
            {
                case 2:
                    title = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(lCode) && i.Code.Equals("atype")).FirstOrDefault().Name;
                    break;
                case 3:
                    title = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(lCode) && i.Code.Equals("ltype")).FirstOrDefault().Name;
                    break;
                default:
                    title = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(lCode) && i.Code.Equals("ptype")).FirstOrDefault().Name;
                    break;
            }
            ppt.ProductTypes = ProductTypeService.GetProductTypes(lCode).Where(p => p.CategoryID == categoryID).ToList();
            ppt.title = title;
            return PartialView(ppt);
        }

        public ActionResult Index(string language, int c1, int c2, int c3)
        {
            int categoryID = c1;
            int productTypeID = c2;
            int pageIndex = c3;
            string longCaption = null;
            pageIndex = pageIndex == 0 ? 1 : pageIndex;

            string code = "display";
            string all = "allproduct";
            switch (categoryID)
            {
                case 2:
                    code = "advert";
                    all = "alladvert";
                    break;
                case 3:
                    code = "leaflet";
                    all = "allleaflet";
                    break;
                default:
                    code = "display";
                    all = "allproduct";
                    break;
            }


            ProductIndex pi = new ProductIndex();
            pi.CategoryID = categoryID;

            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.I18NType.Code.Equals("pager") || i.Code.Equals(all) || i.Code.Equals(code) || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.Where(i => !i.I18NType.Code.Equals("pager")).OrderBy(i => i.Code).ToList();
            int l0 = 0, l1 = 1;
            if (categoryID == 2)
            {
                l0 = 1;
                l1 = 0;
            }
            ViewBag.Title = data[l1].Name + " - " + data[3].Name;
            longCaption = data[2].Name;
            ViewBag.ShortCaption = data[l1].Name;
            ViewBag.Remark = data[l1].Remark;
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

            pi.Post = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals(code)).FirstOrDefault();
            IQueryable<Product> qp = ProductService.GetProducts().Where(p => p.ProductType.CategoryID == categoryID && p.ProductType.Language.Code.Equals(language)).OrderByDescending(p => p.ProductID);
            int total = qp.Count();
            if (productTypeID != 0)
            {
                qp = qp.Where(q => q.ProductTypeID == productTypeID || q.ProductType.ParentTypeID == productTypeID);
                total = qp.Count();
            }
            pi.Curr = pageIndex;
            if (total > 16)
            {
                int totalPage = total % 16 == 0 ? total / 16 : total / 16 + 1;
                if (totalPage > pageIndex)
                {
                    pi.Next = true;
                }
                else
                {
                    pi.Next = false;
                }

                if (pageIndex > 1)
                {
                    pi.Pre = true;
                }
                else
                {
                    pi.Pre = false;
                }
            }
            pi.Total = total;
            pi.Products = qp.Skip((pageIndex - 1) * 16).Take(16).ToList();
            if (productTypeID > 0)
            {
                ProductType pt = ProductTypeService.GetProductTypes(language).Where(p => p.ProductTypeID == productTypeID && p.ParentTypeID == 0).FirstOrDefault();
                if (pt == null)
                {
                    ProductType pt1 = ProductTypeService.GetProductType(productTypeID);
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
                longCaption = longCaption + " > " + data[l0].Name;
            }
            ViewBag.LongCaption = longCaption;
            return View("~/Views/Product/Index.cshtml", pi);
        }

        public ActionResult Detail(int c1, int id)
        {
            int categoryID = c1;
            string code = "display";
            switch (categoryID)
            {
                case 2:
                    code = "advert";
                    break;
                case 3:
                    code = "leaflet";
                    break;
                default:
                    code = "display";
                    break;
            }

            ProductDetail pd = new ProductDetail();
            pd.Product = ProductService.GetProducts().Include("ProductType").Where(p => p.ProductID == id).First();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.LanguageID == pd.Product.ProductType.LanguageID && (i.Code.Equals(code) || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            pd.Post = PostService.GetPosts().Where(i => i.Language.LanguageID == pd.Product.ProductType.LanguageID && i.Code.Equals(code)).FirstOrDefault();
            return View("~/Views/Product/Detail.cshtml", pd);
        }
    }

    public class DisplayController : ProductController
    {

    }

    public class AdvertController : ProductController
    {

    }

    public class LeafletController : ProductController
    {

    }
}