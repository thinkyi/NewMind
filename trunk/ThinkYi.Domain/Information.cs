using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class Information
    {
        public int InformationID { get; set; }
        public int LanguageID { get; set; }
        public string Code { get; set; }
        public string Text { get; set; }
        public string BannerPic { get; set; }

        public virtual Language Language { get; set; }
    }
}
