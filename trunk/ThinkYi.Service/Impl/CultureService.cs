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
    public class CultureService : ICultureService
    {
        [Dependency]
        public ICultureRepository CultureRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public Culture GetCulture(int id)
        {
            Culture culture = CultureRepository.GetByID(id);
            return culture;
        }

        public IQueryable<Culture> GetCultures()
        {
            IQueryable<Culture> cultures = CultureRepository.Entities;
            return cultures;
        }

        public void AddCulture(Culture culture)
        {
            CultureRepository.Insert(culture);
            UnitOfWork.Commit();
        }

        public void EditCulture(Culture culture)
        {
            CultureRepository.Update(culture);
            UnitOfWork.Commit();
        }

        public void DelCulture(int id)
        {
            Culture i = CultureRepository.GetByID(id);
            CultureRepository.Delete(i);
            UnitOfWork.Commit();
        }
    }
}
