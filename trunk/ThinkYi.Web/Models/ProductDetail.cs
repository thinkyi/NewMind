using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class ProductDetail
    {
        public Post Post { get; set; }
        public Product Product { get; set; }
        public Product NextProduct { get; set; }
        public Product PreProduct { get; set; }
        public string PreText { get; set; }
        public string NextText { get; set; }
    }
}