using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface II18NService
    {
        IQueryable<I18N> GetI18Ns();
    }
}
