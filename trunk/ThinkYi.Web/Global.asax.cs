using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Practices.Unity;
using Microsoft.Practices.ServiceLocation;
using ThinkYi.Data.Infrastructure;
using ThinkYi.Data.Repositories;
using ThinkYi.Web.IoC;
using ThinkYi.Service;
using ThinkYi.Service.Impl;

namespace ThinkYi.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            IUnityContainer container = GetUnityContainer();
            var serviceLocator = new UnityServiceLocator(container);
            ServiceLocator.SetLocatorProvider(() => serviceLocator);
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }

        private IUnityContainer GetUnityContainer()
        {
            //Create UnityContainer          
            IUnityContainer container = new UnityContainer()
                //.RegisterType<IControllerActivator, CustomControllerActivator>()
                .RegisterType<IDatabaseFactory, DatabaseFactory>(new HttpContextLifetimeManager<IDatabaseFactory>())
                .RegisterType<IUnitOfWork, UnitOfWork>(new HttpContextLifetimeManager<IUnitOfWork>())
                .RegisterType<ILanguageRepository, LanguageRepository>(new HttpContextLifetimeManager<ILanguageRepository>())
                .RegisterType<ILanguageService, LanguageService>(new HttpContextLifetimeManager<ILanguageService>())
                .RegisterType<II18NRepository, I18NRepository>(new HttpContextLifetimeManager<II18NRepository>())
                .RegisterType<II18NService, I18NService>(new HttpContextLifetimeManager<II18NService>())
                .RegisterType<II18NTypeRepository, I18NTypeRepository>(new HttpContextLifetimeManager<II18NTypeRepository>())
                .RegisterType<II18NTypeService, I18NTypeService>(new HttpContextLifetimeManager<II18NTypeService>())
                .RegisterType<IProductTypeRepository, ProductTypeRepository>(new HttpContextLifetimeManager<IProductTypeRepository>())
                .RegisterType<IProductTypeService, ProductTypeService>(new HttpContextLifetimeManager<IProductTypeService>())
                .RegisterType<IProductRepository, ProductRepository>(new HttpContextLifetimeManager<IProductRepository>())
                .RegisterType<IProductService, ProductService>(new HttpContextLifetimeManager<IProductService>());
            return container;
        }
    }
}