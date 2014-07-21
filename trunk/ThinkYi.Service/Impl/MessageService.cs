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
    public class MessageService : IMessageService
    {
        [Dependency]
        public IMessageRepository MessageRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public Message GetMessage(int id)
        {
            Message msg = MessageRepository.GetByID(id);
            return msg;
        }

        public IQueryable<Message> GetMessages()
        {
            IQueryable<Message> msgs = MessageRepository.Entities;
            return msgs;
        }

        public void AddMessage(Message msg)
        {
            MessageRepository.Insert(msg);
            UnitOfWork.Commit();
        }

        public void EditMessage(Message msg)
        {
            MessageRepository.Update(msg);
            UnitOfWork.Commit();
        }

        public void DelMessage(int id)
        {
            Message msg = MessageRepository.GetByID(id);
            MessageRepository.Delete(msg);
            UnitOfWork.Commit();
        }
    }
}
