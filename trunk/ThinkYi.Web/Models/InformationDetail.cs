﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Web.Models
{
    public class InformationDetail
    {
        public Post Post { get; set; }
        public Information Information { get; set; }
    }
}