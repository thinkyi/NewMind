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
    public class InformationService : IInformationService
    {
        [Dependency]
        public IInformationRepository InformationRepository { get; set; }
        [Dependency]
        public IUnitOfWork UnitOfWork { get; set; }

        public Information GetInformation(int id)
        {
            Information information = InformationRepository.GetByID(id);
            return information;
        }

        public IQueryable<Information> GetInformations()
        {
            IQueryable<Information> informations = InformationRepository.Entities;
            return informations;
        }

        public void AddInformation(Information info)
        {
            InformationRepository.Insert(info);
            UnitOfWork.Commit();
        }

        public void EditInformation(Information info)
        {
            InformationRepository.Update(info);
            UnitOfWork.Commit();
        }

        public void DelInformation(int id)
        {
            Information i = InformationRepository.GetByID(id);
            InformationRepository.Delete(i);
            UnitOfWork.Commit();
        }
    }
}
