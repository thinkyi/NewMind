using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ThinkYi.Domain;
using ThinkYi.Data.Infrastructure;

namespace ThinkYi.Data.Repositories
{
    public class MessageRepository : RepositoryBase<Message>, IMessageRepository
    {
        public MessageRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }

    public interface IMessageRepository : IRepository<Message>
    {
    }
}
