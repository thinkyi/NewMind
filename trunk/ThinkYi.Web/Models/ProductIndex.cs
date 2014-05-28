using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class ProductIndex
    {
        public Post Post { get; set; }
        public List<Product> Products { get; set; }
        public int Total { get; set; }
        public bool Next { get; set; }
        public bool Pre { get; set; }
        public int Curr { get; set; }
        public string FirstText { get; set; }
        public string PreText { get; set; }
        public string NextText { get; set; }
        public string LastText { get; set; }
    }
}