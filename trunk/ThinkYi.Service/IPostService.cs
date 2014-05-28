using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IPostService
    {
        Post GetPost(int id);
        IQueryable<Post> GetPosts();
        void EditPost(Post post);
    }
}
