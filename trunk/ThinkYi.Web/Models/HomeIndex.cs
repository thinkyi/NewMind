using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class HomeIndex
    {
        public PageI18N PageI18N { get; set; }
        public List<I18N> Cooperations { get; set; }
        public List<Product> Recommends { get; set; }
        public List<Product> Displays { get; set; }
    }
}