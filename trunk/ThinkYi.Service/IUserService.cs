using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IUserService
    {
        User GetUser(int id);
        IQueryable<User> GetUsers();
        void EditUser(User user);
    }
}
