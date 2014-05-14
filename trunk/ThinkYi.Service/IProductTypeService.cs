using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IProductTypeService
    {
        ProductType GetProductType(int id);
        IQueryable<ProductType> GetProductTypes(string lCode);
        void ProductTypeAdd(ProductType pt);
        void ProductTypeEdit(ProductType pt);
        void ProductTypeDel(int id);
    }
}
