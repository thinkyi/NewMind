using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class ProductIndex : PagerBasic
    {
        public int CategoryID { get; set; }
        public Post Post { get; set; }
        public List<Product> Products { get; set; }
    }
}