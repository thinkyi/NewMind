using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class Menu
    {
        public int MenuID { get; set; }
        public int LanguageID { get; set; }
        public string Code { get; set; }
        public string Text { get; set; }

        public virtual Language Language { get; set; }
    }
}
