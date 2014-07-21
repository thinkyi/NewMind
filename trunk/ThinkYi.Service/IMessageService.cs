using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IMessageService
    {
        Message GetMessage(int id);
        IQueryable<Message> GetMessages();
        void AddMessage(Message msg);
        void EditMessage(Message msg);
        void DelMessage(int id);
    }
}
