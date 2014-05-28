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
    public class PostService : IPostService
    {
        [Dependency]
        public IPostRepository PostRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public Post GetPost(int id)
        {
            Post post = PostRepository.GetByID(id);
            return post;
        }

        public IQueryable<Post> GetPosts()
        {
            IQueryable<Post> posts = PostRepository.Entities;
            return posts;
        }

        public void EditPost(Post post)
        {
            PostRepository.Update(post);
            UnitOfWork.Commit();
        }
    }
}
