﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class I18NType
    {
        public int I18NTypeID { get; set; }
        public int LanguageID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public virtual Language Language { get; set; }
    }
}
