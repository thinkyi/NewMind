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
    public class UserService : IUserService
    {
        [Dependency]
        public IUserRepository UserRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public User GetUser(int id)
        {
            User user = UserRepository.GetByID(id);
            return user;
        }

        public IQueryable<User> GetUsers()
        {
            var users = UserRepository.Entities;
            return users;
        }

        public void EditUser(User user)
        {
            UserRepository.Update(user);
            UnitOfWork.Commit();
        }
    }
}
