using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThinkYi.Domain
{
    public class Product
    {
        public int ProductID { get; set; }
        public int ProductTypeID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string SmallPic { get; set; }
        public string BigPic { get; set; }
        public bool IsRecommend { get; set; }
        public bool IsShow { get; set; }
        public string CustomURL { get; set; }

        public virtual ProductType ProductType { get; set; }
    }
}
