using System;
using System.Collections.Generic;

namespace ThinkYi.Domain
{
    public class JqGridParam
    {
        public string lCode { get; set; }
        public string sidx { get; set; }
        public string sord { get; set; }
        public int page { get; set; }
        public int rows { get; set; }
        public bool search { get; set; }
        public string sField { get; set; }
        public string sValue { get; set; }
        public string sOper { get; set; }
    }
}