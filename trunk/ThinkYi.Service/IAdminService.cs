using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IAdminService
    {
        IQueryable<Language> GetLanguages();
        IQueryable<I18N> GetI18Ns(string lCode);
    }
}
