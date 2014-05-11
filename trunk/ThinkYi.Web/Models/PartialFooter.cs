using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class PartialFooter
    {
        public List<I18N> Menus { get; set; }
        public string Footer { get; set; }
    }
}