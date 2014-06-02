using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class InformationIndex : PagerBasic
    {
        public Post Post { get; set; }
        public List<Information> Informations { get; set; }
    }
}