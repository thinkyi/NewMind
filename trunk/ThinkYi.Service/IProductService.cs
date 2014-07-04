using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IProductService
    {
        Product GetProduct(int id);
        IQueryable<Product> GetProducts();
        void AddProduct(Product p);
        void EditProduct(Product p);
        void DelProduct(int id);
    }
}
