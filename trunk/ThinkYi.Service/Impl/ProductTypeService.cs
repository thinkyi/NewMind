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
    public class ProductTypeService : IProductTypeService
    {
        [Dependency]
        public IProductTypeRepository ProductTypeRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public ProductType GetProductType(int id)
        {
            ProductType pt = ProductTypeRepository.GetByID(id);
            return pt;
        }

        public IQueryable<ProductType> GetProductTypes(string lCode)
        {
            IQueryable<ProductType> productTypes = ProductTypeRepository.Entities.Where(p => p.Language.Code.Equals(lCode));
            return productTypes;
        }

        public void ProductTypeAdd(ProductType pt)
        {
            ProductTypeRepository.Insert(pt);
            UnitOfWork.Commit();
        }

        public void ProductTypeEdit(ProductType pt)
        {
            ProductTypeRepository.Update(pt);
            UnitOfWork.Commit();
        }

        public void ProductTypeDel(int id)
        {
            ProductType pt = ProductTypeRepository.GetByID(id);
            ProductTypeRepository.Delete(pt);
            ProductTypeRepository.Delete(p => p.ParentTypeID == id);
            UnitOfWork.Commit();
        }
    }
}
