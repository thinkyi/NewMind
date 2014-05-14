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
        public IProductRepository ProductRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public Product GetProduct(int id)
        {
            return ProductRepository.GetByID(id);
        }

        public IQueryable<Product> GetProducts()
        {
            IQueryable<Product> products = ProductRepository.Entities;
            return products;
        }

        public void AddProduct(Product p)
        {
            ProductRepository.Insert(p);
            UnitOfWork.Commit();
        }
    }
}
