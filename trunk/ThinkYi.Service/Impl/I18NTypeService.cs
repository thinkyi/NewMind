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
    public class I18NTypeService : II18NTypeService
    {
        [Dependency]
        public I18NTypeRepository I18NTypeRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }
    }
}
