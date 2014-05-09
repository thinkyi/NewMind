using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class I18NTypeRepository : RepositoryBase<I18NType>, II18NTypeRepository
    {
        public I18NTypeRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface II18NTypeRepository : IRepository<I18NType>
    {
    }
}
