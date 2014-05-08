using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Tools.jqGrid;

namespace ThinkYi.Web.Controllers
{
    public class AdminController : Controller
    {
        [Dependency]
        public IAdminService AdminService { get; set; }
        [Dependency]
        public IProductService ProductService { get; set; }

        public ActionResult Index()
        {
            var data = AdminService.GetLanguages().OrderByDescending(l => l.LanguageID).ToList();
            return View(data);
        }

        public ActionResult I18N()
        {
            return View();
        }

        public ActionResult ProductType()
        {
            return View();
        }

        public ActionResult Product()
        {
            return View();
        }

        public ActionResult ProductAdd()
        {
            return View();
        }

        public ActionResult I18NGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var data = AdminService.GetI18Ns(jgp.lCode);
            var jsonData = data.GetJson<I18N>(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        public ActionResult ProductTypeGrid(JqGridParam jgp, int ptid)
        {
            string sidx = jgp.sidx;
            var data = ProductService.GetProductTypes(jgp.lCode).Where(p => p.ParentTypeID == ptid);
            var jsonData = data.GetJson<ProductType>(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        public ActionResult ProductGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var ptData = ProductService.GetProductTypes(jgp.lCode).Where(p => p.ParentTypeID == 0);
            var pData = ProductService.GetProducts(jgp.lCode).Include("ProductType");
            var lq = from d1 in pData
                     join d2 in ptData on d1.ProductType.ParentTypeID equals d2.ProductTypeID
                     select new
                     {
                         ProductID = d1.ProductID,
                         ProductTypeID = d1.ProductTypeID,
                         LanguageID = d1.LanguageID,
                         Code = d1.Code,
                         Name = d1.Name,
                         SmallPic = d1.SmallPic,
                         BigPic = d1.BigPic,
                         IsRecommend = d1.IsRecommend,
                         IsShow = d1.IsShow,
                         BType = d2.Name,
                         SType = d1.ProductType.Name
                     };

            var jsonData = lq.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }
    }
}