using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Microsoft.Practices.Unity;
using VB = Microsoft.VisualBasic;
using ThinkYi.Domain;
using ThinkYi.Service;
using ThinkYi.Tools.jqGrid;

namespace ThinkYi.Web.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        [Dependency]
        public ILanguageService LanguageService { get; set; }
        [Dependency]
        public II18NTypeService I18NTypeService { get; set; }
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IProductTypeService ProductTypeService { get; set; }
        [Dependency]
        public IProductService ProductService { get; set; }
        [Dependency]
        public IInformationService InformationService { get; set; }
        [Dependency]
        public IPostService PostService { get; set; }
        [Dependency]
        public IUserService UserService { get; set; }
        [Dependency]
        public IMessageService MessageService { get; set; }

        public ActionResult Index()
        {
            var data = LanguageService.GetLanguages().OrderByDescending(l => l.LanguageID).ToList();
            string userName = User.Identity.Name;
            User user = UserService.GetUsers().Where(u => u.UserName.Equals(userName)).FirstOrDefault();
            ViewBag.DisplayName = user.DisplayName;
            return View(data);
        }

        public ActionResult Nav(string viewName)
        {
            return View(viewName);
        }

        public ActionResult ProductEdit(int productID)
        {
            Product product = ProductService.GetProduct(productID);
            return View(product);
        }

        public ActionResult Post(string lCode, string code)
        {
            Post info = null;
            if (!string.IsNullOrEmpty(lCode))
                info = PostService.GetPosts().Where(i => i.Language.Code.Equals(lCode) && i.Code.Equals(code)).FirstOrDefault();
            JsonResult json = new JsonResult();
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            json.Data = info;
            return json;
        }

        [HttpPost]
        [ValidateInput(false)]
        public string BannerEdit(int id, string bannerPic, bool isClone)
        {
            string result = "s";
            try
            {
                Post post = PostService.GetPost(id);
                post.BannerPic = bannerPic;
                PostService.EditPost(post);

                if (isClone)
                {
                    List<Post> posts = PostService.GetPosts().Where(i => i.Code.Equals(post.Code) && i.LanguageID != post.LanguageID).ToList();
                    foreach (Post p in posts)
                    {
                        p.BannerPic = bannerPic;
                        PostService.EditPost(p);
                    }
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [HttpPost]
        [ValidateInput(false)]
        public string TitlePicEdit(int id, string TitlePic, bool isClone)
        {
            string result = "s";
            try
            {
                Post post = PostService.GetPost(id);
                post.TitlePic = TitlePic;
                PostService.EditPost(post);

                if (isClone)
                {
                    List<Post> posts = PostService.GetPosts().Where(i => i.Code.Equals(post.Code) && i.LanguageID != post.LanguageID).ToList();
                    foreach (Post p in posts)
                    {
                        p.TitlePic = TitlePic;
                        PostService.EditPost(p);
                    }
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [HttpPost]
        [ValidateInput(false)]
        public string PostEdit(int id, string text)
        {
            string result = "s";
            try
            {
                Post post = PostService.GetPost(id);
                post.Text = text;
                PostService.EditPost(post);
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [HttpPost]
        [ValidateInput(false)]
        public string ProductAdd(Product product, string lCode, bool isClone)
        {
            string result = "s";
            try
            {
                List<Language> languages = LanguageService.GetLanguages().ToList();
                if (product.BigPic.Contains("/Content/images/admin/temp.png"))
                {
                    product.BigPic = null;
                }
                if (product.SmallPic.Contains("/Content/images/admin/temp.png"))
                {
                    product.SmallPic = null;
                }
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
                                product.Name = VB.Strings.StrConv(product.Name, VB.VbStrConv.TraditionalChinese, 0);
                                product.Text = VB.Strings.StrConv(product.Text, VB.VbStrConv.TraditionalChinese, 0);
                                break;
                            case "big5":
                                product.Name = VB.Strings.StrConv(product.Name, VB.VbStrConv.SimplifiedChinese, 0);
                                product.Text = VB.Strings.StrConv(product.Text, VB.VbStrConv.SimplifiedChinese, 0);
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

        [HttpPost]
        [ValidateInput(false)]
        public string ProductEdit(Product product)
        {
            string result = "s";
            try
            {
                Product op = ProductService.GetProduct(product.ProductID);
                op.Code = product.Code;
                op.ProductTypeID = product.ProductTypeID;
                op.Name = product.Name;
                op.Text = product.Text;
                if (product.BigPic.Contains("/Content/images/admin/temp.png"))
                {
                    product.BigPic = null;
                }
                if (product.SmallPic.Contains("/Content/images/admin/temp.png"))
                {
                    product.SmallPic = null;
                }
                op.BigPic = product.BigPic;
                op.SmallPic = product.SmallPic;
                op.IsRecommend = product.IsRecommend;
                op.IsShow = product.IsShow;
                ProductService.EditProduct(op);
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        public ActionResult I18NTypeGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var data = I18NTypeService.GetI18NTypes().Where(i => i.Language.Code.Equals(jgp.lCode));
            var jsonData = data.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        public ActionResult I18NGrid(JqGridParam jgp, int i18nTypeID)
        {
            string sidx = jgp.sidx;
            var data = I18NService.GetI18Ns().Where(i => i.I18NType.I18NTypeID == i18nTypeID);
            var jsonData = data.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        [HttpPost]
        public void I18NEdit(I18N i18n)
        {
            var data = I18NService.GetI18Ns().Where(i => i.I18NID == i18n.I18NID).FirstOrDefault();
            data.OrderID = i18n.OrderID;
            data.Code = i18n.Code;
            data.Name = i18n.Name;
            data.Remark = i18n.Remark;
            I18NService.EditI18N(data);
        }

        public ActionResult ProductTypeGrid(JqGridParam jgp, int categoryID, int ptid)
        {
            string sidx = jgp.sidx;
            var data = ProductTypeService.GetProductTypes(jgp.lCode).Where(p => p.CategoryID == categoryID && p.ParentTypeID == ptid);
            var jsonData = data.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        [HttpPost]
        public void ProductTypeEdit(ProductType pt)
        {
            var data = ProductTypeService.GetProductType(pt.ProductTypeID);
            data.Code = pt.Code;
            data.Name = pt.Name;
            data.Remark = pt.Remark;
            ProductTypeService.ProductTypeEdit(data);
        }

        [HttpPost]
        public void ProductTypeAdd(ProductType pt, string lCode)
        {
            int lid = LanguageService.GetLanguages().Where(l => l.Code.Equals(lCode)).FirstOrDefault().LanguageID;
            pt.LanguageID = lid;
            ProductTypeService.ProductTypeAdd(pt);
        }

        [HttpPost]
        public void ProductTypeDel(int ptid)
        {
            ProductTypeService.ProductTypeDel(ptid);
        }

        [HttpPost]
        public int PTSubmitVerify(int ptid)
        {
            int n = 0;
            int result = 0;
            ProductType pt = ProductTypeService.GetProductType(ptid);
            if (pt.ParentTypeID > 0)
            {
                n = ProductService.GetProducts().Count(p => p.ProductTypeID == ptid);
                if (n > 0)
                {
                    result = 2;
                }
            }
            else
            {
                n = ProductTypeService.GetProductTypes(pt.Language.Code).Count(p => p.ParentTypeID == ptid);
                if (n > 0)
                {
                    result = 1;
                }
            }

            return result;
        }

        public JsonResult GetProductTypes(string lCode, int categoryID)
        {
            var data = ProductTypeService.GetProductTypes(lCode).Where(p => p.CategoryID == categoryID).ToList();
            JsonResult json = new JsonResult();
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            json.Data = data;
            return json;
        }

        public ActionResult ProductGrid(JqGridParam jgp, int categoryID)
        {
            string sidx = jgp.sidx;
            var ptData = ProductTypeService.GetProductTypes(jgp.lCode).Where(p => p.CategoryID == categoryID && p.ParentTypeID == 0);
            var pData = ProductService.GetProducts().Where(p => p.ProductType.CategoryID == categoryID && p.ProductType.Language.Code.Equals(jgp.lCode));
            var lq = from d1 in pData
                     join d2 in ptData on d1.ProductType.ParentTypeID equals d2.ProductTypeID
                     select new
                     {
                         ProductID = d1.ProductID,
                         ProductTypeID = d1.ProductTypeID,
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

        [HttpPost]
        public void ProductDel(int pid)
        {
            ProductService.DelProduct(pid);
        }

        public ActionResult InformationGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var data = InformationService.GetInformations().Where(i => i.Language.Code.Equals(jgp.lCode));
            var lq = from d in data
                     select new
                     {
                         InformationID = d.InformationID,
                         Code = d.Code,
                         Name = d.Name,
                         Date = d.Date
                     };

            var jsonData = lq.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }

        [HttpPost]
        [ValidateInput(false)]
        public string InformationAdd(Information information, string lCode, bool isClone)
        {
            string result = "s";
            try
            {
                List<Language> languages = LanguageService.GetLanguages().ToList();
                information.LanguageID = languages.Where(l => l.Code.Equals(lCode)).First().LanguageID;
                InformationService.AddInformation(information);

                if (isClone && !lCode.Equals("en"))
                {
                    switch (lCode)
                    {
                        case "cn":
                            information.LanguageID = languages.Where(l => l.Code.Equals("big5")).First().LanguageID;
                            information.Name = VB.Strings.StrConv(information.Name, VB.VbStrConv.TraditionalChinese, 0);
                            information.Text = VB.Strings.StrConv(information.Text, VB.VbStrConv.TraditionalChinese, 0);
                            break;
                        case "big5":
                            information.LanguageID = languages.Where(l => l.Code.Equals("cn")).First().LanguageID;
                            information.Name = VB.Strings.StrConv(information.Name, VB.VbStrConv.SimplifiedChinese, 0);
                            information.Text = VB.Strings.StrConv(information.Text, VB.VbStrConv.SimplifiedChinese, 0);
                            break;
                    }
                    InformationService.AddInformation(information);
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        public ActionResult InformationEdit(int informationID)
        {
            Information info = InformationService.GetInformation(informationID);
            return View(info);
        }

        [HttpPost]
        [ValidateInput(false)]
        public string InformationEdit(Information info)
        {
            string result = "s";
            try
            {
                Information oinfo = InformationService.GetInformation(info.InformationID);
                oinfo.LanguageID = info.LanguageID;
                oinfo.Code = info.Code;
                oinfo.Name = info.Name;
                oinfo.Date = info.Date;
                oinfo.Text = info.Text;

                InformationService.EditInformation(oinfo);
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [HttpPost]
        public void InformationDel(int iid)
        {
            InformationService.DelInformation(iid);
        }

        public ActionResult MessageGrid(JqGridParam jgp)
        {
            string sidx = jgp.sidx;
            var data = MessageService.GetMessages();
            var jsonData = data.GetJson(jgp, JsonRequestBehavior.AllowGet, null);
            return jsonData;
        }
    }
}