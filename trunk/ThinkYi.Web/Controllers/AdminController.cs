using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
    }
}