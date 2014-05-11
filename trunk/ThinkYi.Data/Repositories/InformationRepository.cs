using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class InformationRepository : RepositoryBase<Information>, IInformationRepository
    {
        public InformationRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface IInformationRepository : IRepository<Information>
    {
    }
}
