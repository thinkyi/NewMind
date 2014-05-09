﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Tools.jqGrid;
using Microsoft.VisualBasic;

namespace ThinkYi.Web.Controllers
{
    public class AdminController : Controller
    {
        [Dependency]
        public ILanguageService LanguageService { get; set; }
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IProductTypeService ProductTypeService { get; set; }
        [Dependency]
        public IProductService ProductService { get; set; }

        public ActionResult Index()
        {
            var data = LanguageService.GetLanguages().OrderByDescending(l => l.LanguageID).ToList();
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

        [HttpPost]
        [ValidateInput(false)]
        public string ProductAdd(Product product, string lCode, bool isClone)
        {
            string result = "s";
            try
            {
                List<Language> languages = LanguageService.GetLanguages().ToList();
                int lid = languages.Where(l => l.Code.Equals(lCode)).FirstOrDefault().LanguageID;
                if (product.BigPic.Contains("/Content/images/admin/temp.png"))
                {
                    product.BigPic = null;
                }
                if (product.SmallPic.Contains("/Content/images/admin/temp.png"))
                {
                    product.SmallPic = null;
                }
                product.LanguageID = lid;
                ProductService.AddProduct(product);

                if (isClone && !lCode.Equals("en"))
                {
                    var ptid = 0;
                    var data1 = ProductTypeService.GetProductTypes(lCode);
                    var data2 = ProductTypeService.GetProductTypes(lCode.Equals("cn") ? "big5" : "cn");
                    var q = from d1 in data1
                            join d2 in data2 on d1.Code equals d2.Code
                            where d1.ProductTypeID == product.ProductTypeID
                            select d2.ProductTypeID;
                    if (q.Count() == 0)
                    {
                        result = "添加" + (lCode.Equals("cn") ? "繁体" : "简体") + "版本失败（产品类型找不到相同的编码）";
                    }
                    else
                    {
                        ptid = q.ToList().FirstOrDefault();
                        product.ProductTypeID = ptid;
                        switch (lCode)
                        {
                            case "cn":
                                product.LanguageID = languages.Where(l => l.Code.Equals("big5")).FirstOrDefault().LanguageID;
                                product.Name = Strings.StrConv(product.Name, VbStrConv.TraditionalChinese, 0);
                                product.Text = Strings.StrConv(product.Text, VbStrConv.TraditionalChinese, 0);
                                break;
                            case "big5":
                                product.LanguageID = languages.Where(l => l.Code.Equals("cn")).FirstOrDefault().LanguageID;
                                product.Name = Strings.StrConv(product.Name, VbStrConv.SimplifiedChinese, 0);
                                product.Text = Strings.StrConv(product.Text, VbStrConv.SimplifiedChinese, 0);
                                break;
                        }
                        ProductService.AddProduct(product);
                    }
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        public ActionResult I18NGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var data = I18NService.GetI18Ns(jgp.lCode);
            var jsonData = data.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        public ActionResult ProductTypeGrid(JqGridParam jgp, int ptid)
        {
            string sidx = jgp.sidx;
            var data = ProductTypeService.GetProductTypes(jgp.lCode).Where(p => p.ParentTypeID == ptid);
            var jsonData = data.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        public JsonResult GetProductTypes(string lCode)
        {
            var data = ProductTypeService.GetProductTypes(lCode).ToList();
            JsonResult json = new JsonResult();
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            json.Data = data;
            return json;
        }

        public ActionResult ProductGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var ptData = ProductTypeService.GetProductTypes(jgp.lCode).Where(p => p.ParentTypeID == 0);
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