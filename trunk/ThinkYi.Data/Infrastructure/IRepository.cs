using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Linq.Expressions;

namespace ThinkYi.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> Entities { get; }

        void Insert(T entity);
        void Insert(Expression<Func<T, bool>> where);
        void Update(T entity);
        void Delete(T entity);
        void Delete(Expression<Func<T, bool>> where);
        T GetByID(int id);
    }
}
