using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThinkYi.Domain;

namespace ThinkYi.Web.Controllers
{
    public class PartialController : Controller
    {
        //
        // GET: /Partial/
        public ActionResult Header(string language)
        {

            return PartialView();
        }
    }
}