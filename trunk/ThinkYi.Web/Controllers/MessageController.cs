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
    public class MessageController : Controller
    {
        [Dependency]
        public IMessageService MessageService { get; set; }
        [Dependency]
        public II18NService I18NService { get; set; }
        [Dependency]
        public IPostService PostService { get; set; }

        public ActionResult Index(string language, int c2, int c3)
        {
            int pageSize = c2;
            int pageIndex = c3;
            pageIndex = pageIndex == 0 ? 1 : pageIndex;
            MessageIndex mi = new MessageIndex();
            mi.Size = pageSize;
            var i18ns = I18NService.GetI18Ns().Where(i => i.I18NType.Language.Code.Equals(language) && (i.I18NType.Code.Equals("pager"))).ToList();
            //var data1 = i18ns.Where(i => !i.I18NType.Code.Equals("pager")).OrderBy(i => i.Code).ToList();
            //ViewBag.Title = data1[0].Name + " - " + data1[2].Name;
            //ViewBag.LongCaption = data1[1].Name + " > " + data1[0].Name;
            //ViewBag.ShortCaption = data1[0].Name;
            //ViewBag.Remark = data1[0].Remark;

            var data = i18ns.ToList();
            foreach (var item in data)
            {
                string pText = item.Name;
                switch (item.Code)
                {
                    case "firstpage":
                        mi.FirstText = pText;
                        break;
                    case "prepage":
                        mi.PreText = pText;
                        break;
                    case "nextpage":
                        mi.NextText = pText;
                        break;
                    case "lastpage":
                        mi.LastText = pText;
                        break;
                }
            }
            //mi.Post = PostService.GetPosts().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("information")).FirstOrDefault();
            IQueryable<Message> qi = MessageService.GetMessages().Where(m => !string.IsNullOrEmpty(m.Reply.Trim())).OrderByDescending(m => m.CreateDate);
            int total = qi.Count();
            mi.Curr = pageIndex;
            if (total > pageSize)
            {
                int totalPage = total % pageSize == 0 ? total / pageSize : total / pageSize + 1;
                if (totalPage > pageIndex)
                {
                    mi.Next = true;
                }
                else
                {
                    mi.Next = false;
                }

                if (pageIndex > 1)
                {
                    mi.Pre = true;
                }
                else
                {
                    mi.Pre = false;
                }
            }
            mi.Total = total;
            mi.Messages = qi.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return View(mi);
        }

        public string Add(Message msg)
        {
            string result = "s";
            msg.CreateDate = DateTime.Now;
            msg.IP = Request.UserHostAddress;
            MessageService.AddMessage(msg);

            return result;
        }
    }
}