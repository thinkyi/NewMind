using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class CultureRepository : RepositoryBase<Culture>, ICultureRepository
    {
        public CultureRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface ICultureRepository : IRepository<Culture>
    {
    }
}
