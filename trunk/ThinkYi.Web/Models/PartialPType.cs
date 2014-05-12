using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class PartialPType
    {
        public List<ProductType> ProductTypes { get; set; }
        public string title { get; set; }
    }
}