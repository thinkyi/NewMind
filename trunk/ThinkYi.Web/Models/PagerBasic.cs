using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThinkYi.Web.Models
{
    public class PagerBasic
    {
        public int Total { get; set; }
        public int Size { get; set; }
        public bool Next { get; set; }
        public bool Pre { get; set; }
        public int Curr { get; set; }
        public string FirstText { get; set; }
        public string PreText { get; set; }
        public string NextText { get; set; }
        public string LastText { get; set; }
    }
}