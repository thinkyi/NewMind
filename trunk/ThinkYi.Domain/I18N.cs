using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class I18N
    {
        public int I18NID { get; set; }
        public int I18NTypeID { get; set; }
        public int LanguageID { get; set; }
        public int OrderID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }

        public virtual I18NType I18NType { get; set; }
        public virtual Language Language { get; set; }
    }
}
