using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class ProductType
    {
        public int ProductTypeID { get; set; }
        public int LanguageID { get; set; }
        public int ParentTypeID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }

        public virtual Language Language { get; set; }
    }
}
