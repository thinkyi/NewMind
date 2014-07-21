using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ThinkYi.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("{*favicon}", new { favicon = @"(.*/)?favicon.ico(/.*)?" });

            routes.MapRoute(
                name: "Account",
                url: "Account/{action}/{id}",
                defaults: new { controller = "Account", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Admin",
                url: "Admin/{action}/{id}",
                defaults: new { controller = "Admin", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Product",
                url: "{language}/{controller}/Index/{CategoryID}/{ProductTypeID}/{PageIndex}",
                defaults: new { language = "cn", controller = "Display", action = "Index", CategoryID = 1, ProductTypeID = 0, PageIndex = 0 }
            );

            routes.MapRoute(
                name: "Product1",
                url: "{language}/{controller}/Detail/{CategoryID}/{id}",
                defaults: new { language = "cn", controller = "Display", action = "Detail", CategoryID = 1, id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Information",
                url: "{language}/Information/Index/{PageIndex}",
                defaults: new { language = "cn", controller = "Information", action = "Index", PageIndex = 0 }
            );

            routes.MapRoute(
                name: "Default",
                url: "{language}/{controller}/{action}/{id}",
                defaults: new { language = "cn", controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}