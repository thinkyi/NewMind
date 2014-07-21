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

        public ActionResult Index(string language, int PageIndex)
        {
            List<Message> msgs = MessageService.GetMessages().ToList();
            return View(msgs);
        }

        public ActionResult Add(string text)
        {
            Message msg = new Message();
            msg.Text = text;
            msg.CreateDate = DateTime.Now;
            msg.IP = Request.UserHostAddress;
            MessageService.AddMessage(msg);

            List<Message> msgs = MessageService.GetMessages().ToList();
            return View("Index", msgs);
        }
    }
}