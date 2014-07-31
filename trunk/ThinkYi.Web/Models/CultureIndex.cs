using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class CultureIndex : PagerBasic
    {
        public Post Post { get; set; }
        public List<Culture> Cultures { get; set; }
    }
}