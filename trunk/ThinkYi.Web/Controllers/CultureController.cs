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
    public class CultureController : Controller
    {
        [Dependency]
        public ICultureService CultureService { get; set; }
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IPostService PostService { get; set; }

        public ActionResult Index(string language, int c2, int c3)
        {
            int pageSize = c2;
            int pageIndex = c3;
            pageIndex = pageIndex == 0 ? 1 : pageIndex;
            CultureIndex ci = new CultureIndex();
            ci.Size = pageSize;
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.I18NType.Code.Equals("pager") || i.Code.Equals("culture") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data1 = i18ns.Where(i => !i.I18NType.Code.Equals("pager")).OrderBy(i => i.Code).ToList();
            ViewBag.Title = data1[0].Name + " - " + data1[2].Name;
            ViewBag.LongCaption = data1[1].Name + " > " + data1[0].Name;
            ViewBag.ShortCaption = data1[0].Name;
            ViewBag.Remark = data1[0].Remark;

            var data2 = i18ns.Where(i => i.I18NType.Code.Equals("pager")).ToList();
            foreach (var item in data2)
            {
                string pText = item.Name;
                switch (item.Code)
                {
                    case "firstpage":
                        ci.FirstText = pText;
                        break;
                    case "prepage":
                        ci.PreText = pText;
                        break;
                    case "nextpage":
                        ci.NextText = pText;
                        break;
                    case "lastpage":
                        ci.LastText = pText;
                        break;
                }
            }
            ci.Post = PostService.GetPosts().Where(p => p.Language.Code.Equals(language) && p.Code.Equals("culture")).FirstOrDefault();
            IQueryable<Culture> qi = CultureService.GetCultures().Where(c => c.Language.Code.Equals(language)).OrderByDescending(c => c.CultureID);
            int total = qi.Count();
            ci.Curr = pageIndex;
            if (total > pageSize)
            {
                int totalPage = total % pageSize == 0 ? total / pageSize : total / pageSize + 1;
                if (totalPage > pageIndex)
                {
                    ci.Next = true;
                }
                else
                {
                    ci.Next = false;
                }

                if (pageIndex > 1)
                {
                    ci.Pre = true;
                }
                else
                {
                    ci.Pre = false;
                }
            }
            ci.Total = total;
            ci.Cultures = qi.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return View(ci);
        }

        public ActionResult Detail(int id)
        {
            CultureDetail cd = new CultureDetail();
            cd.Culture = CultureService.GetCultures().Where(c => c.CultureID == id).First();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.LanguageID == cd.Culture.LanguageID && (i.Code.Equals("culture") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            cd.Post = PostService.GetPosts().Where(c => c.Language.LanguageID == cd.Culture.LanguageID && c.Code.Equals("culture")).FirstOrDefault();
            return View(cd);
        }
    }
}