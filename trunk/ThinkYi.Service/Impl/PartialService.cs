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
    public class PartialService : IPartialService
    {
        [Dependency]
        public ILanguageRepository LanguageRepository { get; set; }
        [Dependency]
        public IMenuRepository MenuRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public IQueryable<Menu> GetMenus(string code)
        {
            IQueryable<Menu> menus = MenuRepository.Entities.Where(m => m.Language.Code.Equals(code));
            return menus;
        }
    }
}
