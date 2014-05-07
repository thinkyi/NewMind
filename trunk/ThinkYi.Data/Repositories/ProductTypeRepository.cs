using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class ProductTypeRepository : RepositoryBase<ProductType>, IProducTypeRepository
    {
        public ProductTypeRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface IProducTypeRepository : IRepository<ProductType>
    {
    }
}
