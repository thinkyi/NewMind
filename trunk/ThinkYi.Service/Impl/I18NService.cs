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
    public class I18NService : II18NService
    {
        [Dependency]
        public II18NRepository I18NRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        /// <summary>
        /// Get i18n list
        /// </summary>
        /// <param name="lCode">language code</param>
        /// <returns></returns>
        public IQueryable<I18N> GetI18Ns()
        {
            return I18NRepository.Entities;
        }
    }
}
