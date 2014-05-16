using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class ProductDetail
    {
        public Information Information { get; set; }
        public Product Product { get; set; }
    }
}