using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface IProductRepository : IRepository<Product>
    {
    }
}
