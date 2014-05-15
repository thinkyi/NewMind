using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class ProductIndex
    {
        public Information Information { get; set; }
        public List<Product> Products { get; set; }
    }
}