using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using ThinkYi.Domain;
using ThinkYi.Service;

namespace ThinkYi.Web.Controllers
{
    public class InformationController : Controller
    {
        [Dependency]
        public IInformationService InformationService { get; set; }
    }

    public class AboutController : InformationController
    {
        public ActionResult Index(string language)
        {
            Information info = InformationService.GetInformations().Where(i => i.Language.Code.Equals(language) && i.Code.Equals("about")).FirstOrDefault();
            return View("~/Views/Information/Index.cshtml", info);
        }
    }
}