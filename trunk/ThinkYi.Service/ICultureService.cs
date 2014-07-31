using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface ICultureService
    {
        Culture GetCulture(int id);
        IQueryable<Culture> GetCultures();
        void AddCulture(Culture info);
        void EditCulture(Culture info);
        void DelCulture(int id);
    }
}
