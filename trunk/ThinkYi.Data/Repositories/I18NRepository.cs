using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class I18NRepository : RepositoryBase<I18N>, II18NRepository
    {
        public I18NRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface II18NRepository : IRepository<I18N>
    {
    }
}
