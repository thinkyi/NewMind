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
    public class InformationController : Controller
    {
        [Dependency]
        public IInformationService InformationService { get; set; }
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IPostService PostService { get; set; }

        public ActionResult Index(string language, int PageIndex)
        {
            PageIndex = PageIndex == 0 ? 1 : PageIndex;
            InformationIndex ii = new InformationIndex();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.I18NType.Code.Equals("pager") || i.Code.Equals("information") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
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
                        ii.FirstText = pText;
                        break;
                    case "prepage":
                        ii.PreText = pText;
                        break;
                    case "nextpage":
                        ii.NextText = pText;
                        break;
                    case "lastpage":
                        ii.LastText = pText;
                        break;
                }
            }
            ii.Post = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("information")).FirstOrDefault();
            IQueryable<Information> qi = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language)).OrderByDescending(i => i.Date);
            int total = qi.Count();
            ii.Curr = PageIndex;
            if (total > 14)
            {
                int totalPage = total % 14 == 0 ? total / 14 : total / 14 + 1;
                if (totalPage > PageIndex)
                {
                    ii.Next = true;
                }
                else
                {
                    ii.Next = false;
                }

                if (PageIndex > 1)
                {
                    ii.Pre = true;
                }
                else
                {
                    ii.Pre = false;
                }
            }
            ii.Total = total;
            ii.Informations = qi.Skip((PageIndex - 1) * 14).Take(14).ToList();
            return View(ii);
        }

        public ActionResult Detail(int id)
        {
            InformationDetail idetail = new InformationDetail();
            idetail.Information = InformationService.GetInformations().Where(i => i.InformationID == id).First();
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.LanguageID == idetail.Information.LanguageID && (i.Code.Equals("information") || i.Code.Equals("ntprefix") || i.Code.Equals("wstitle"))).ToList();
            var data = i18ns.OrderBy(i => i.Code).ToList();
            ViewBag.Title = data[0].Name + " - " + data[2].Name;
            ViewBag.LongCaption = data[1].Name + " > " + data[0].Name;
            ViewBag.ShortCaption = data[0].Name;
            ViewBag.Remark = data[0].Remark;
            idetail.Post = PostService.GetPosts().Where(i => i.Language.LanguageID == idetail.Information.LanguageID && i.Code.Equals("information")).FirstOrDefault();
            return View(idetail);
        }
    }
}