using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Microsoft.Practices.Unity;
using System.Data.Entity;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;
using ThinkYi.Data.Repositories;

namespace ThinkYi.Service.Impl
{
    public class ProductService : IProductService
    {
        [Dependency]
        public ILanguageRepository LanguageRepository { get; set; }
        [Dependency]
        public IProductTypeRepository ProducTypeRepository { get; set; }
        [Dependency]
        public IProductRepository ProducRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public IQueryable<ProductType> GetProductTypes(string lCode)
        {
            IQueryable<ProductType> productTypes = ProducTypeRepository.Entities.Where(p => p.Language.Code.Equals(lCode));
            return productTypes;
        }
        public IQueryable<Product> GetProducts(string lCode)
        {
            IQueryable<Product> products = ProducRepository.Entities.Where(p => p.Language.Code.Equals(lCode));
            return products;
        }
    }
}
