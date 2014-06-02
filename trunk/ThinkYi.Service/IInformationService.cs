using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThinkYi.Domain;

namespace ThinkYi.Service
{
    public interface IInformationService
    {
        Information GetInformation(int id);
        IQueryable<Information> GetInformations();
        void AddInformation(Information info);
        void EditInformation(Information info);
    }
}
