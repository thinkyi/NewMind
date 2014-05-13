using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThinkYi.Domain;

namespace ThinkYi.Tools
{
    public class Common
    {
        public PageI18N GetPageI18N(List<I18N> i18ns)
        {
            PageI18N pi = new PageI18N();
            foreach (var i in i18ns)
            {
                string title = i.Name;
                switch (i.Code)
                {
                    case "wstitle":
                        pi.WebSiteTitle = title;
                        break;
                    case "precommend":
                        pi.PRecommend = title;
                        break;
                    case "pdisplay":
                        pi.PDisplay = title;
                        break;
                    case "cooperation":
                        pi.Cooperation = title;
                        break;
                    case "pmore":
                        pi.PMore = title;
                        break;
                }
            }
            return pi;
        }
    }
}