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
        public IProducTypeRepository ProducTypeRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public IQueryable<ProductType> GetProductTypes(string code)
        {
            IQueryable<ProductType> productTypes = ProducTypeRepository.Entities.Where(p => p.Language.Code.Equals(code));
            return productTypes;
        }
    }
}
