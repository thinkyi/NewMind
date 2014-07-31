using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class CultureDetail
    {
        public Post Post { get; set; }
        public Culture Culture { get; set; }
    }
}